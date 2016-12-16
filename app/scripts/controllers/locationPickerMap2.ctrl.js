'use strict';

/* global esri */
angular.module('yourStlCourts').controller('LocationPickerMapCtrl2', function ($scope, $http, $uibModalInstance, municipalities, leafletData) {
  var ctrl = this;
  ctrl.mousedOverMunicipality = "";

  ctrl.center = {
    lat:38.62775,
    lng:-90.381801,
    zoom: 10
  };

  angular.extend($scope, {
    defaults: {
      scrollWheelZoom: false
    }
  });


  var tileOptions = {
    maxZoom: 20,  // max zoom to preserve detail on
    tolerance: 5, // simplification tolerance (higher means simpler)
    extent: 4096, // tile extent (both width and height)
    buffer: 64,   // tile buffer on each side
    debug: 0,      // logging level (0 to disable, 1 or 2)

    indexMaxZoom: 0,        // max zoom in the initial tile index
    indexMaxPoints: 100000, // max number of points per tile in the index
  };

  var data = countyMunicipalityBoundaryData;
  var tileIndex = geojsonvt(data, tileOptions);

  var pad = 0;
  leafletData.getMap("municipalityMap").then(function(map){
    var tileLayer = L.canvasTilesInteractive()
      .params({ debug: false, padding: 5 })
      .drawing(drawingOnCanvas)
      .highlighting(highlightMunicipalitiesOnCanvas)
      .selecting(selectMunicipalityOnCanvas);
    tileLayer.addTo(map);
  });

  function findContainingMunicipality(params, selectMunicipalities) {
    var mousedOverMunicipality = null;
    var offsetLeft = params.canvas._leaflet_pos.x;
    var offsetTop = params.canvas._leaflet_pos.y;
    var mouseX = params.mousePoint.x - offsetLeft;
    var mouseY = params.mousePoint.y - offsetTop;
    var rightX = params.canvas.width + offsetLeft;
    var rightY = params.canvas.height + offsetTop;
    params.tilePoint.z = params.zoom;

    var ctx = params.canvas.getContext('2d');

    var tile = tileIndex.getTile(params.tilePoint.z, params.tilePoint.x, params.tilePoint.y);
    if (!tile) {
      return mousedOverMunicipality;
    }

    var features = tile.features;
    for (var i = 0; i < features.length; i++) {
      var feature = features[i],
        type = feature.type;

      ctx.beginPath();

      for (var j = 0; j < feature.geometry.length; j++) {
        var geom = feature.geometry[j];

        for (var k = 0; k < geom.length; k++) {
          var p = geom[k];
          var extent = 4096;

          var x = p[0] / extent * 256;
          var y = p[1] / extent * 256;

          if (k) ctx.lineTo(x + pad, y + pad);
          else ctx.moveTo(x + pad, y + pad);
        }
      }

      if (type === 3 || type === 1) {
        if ((params.mousePoint != null) && isInside(params.mousePoint.x,params.mousePoint.y,offsetLeft,offsetTop,rightX,rightY)) {
          if (ctx.isPointInPath(params.mousePoint.x - offsetLeft, params.mousePoint.y - offsetTop)) {
            if (selectMunicipalities) {
              if (ctrl.selectedMunicipalitiesObj.idInArray(feature.id)) {
                ctrl.selectedMunicipalitiesObj.removeMunicipalityObj(feature.id);
              } else {
                //console.log("adding: "+feature.tags.municipality);
                ctrl.selectedMunicipalitiesObj.addMunicipalityObj(muniObj(feature.id, feature.tags.municipality));
                /*console.log("Contents:");
                for(var i in ctrl.selectedMunicipalitiesObj.municipalityObjs){
                  console.log(ctrl.selectedMunicipalitiesObj.municipalityObjs[i].name);
                }*/
              }
            }else {
              mousedOverMunicipality = muniObj(feature.id,feature.tags.municipality);
              //mousedOverMunicipality = feature.id;//feature.tags.municipality;
            }
            break;
          }
        }
      }
    }
    return mousedOverMunicipality;
  }

  function selectMunicipalityOnCanvas(params){
    findContainingMunicipality(params,true);
  }

  function highlightMunicipalitiesOnCanvas(params){
    //loop through everything to find municipality contained in break when found
    if (params.firstTile == true)
      ctrl.mousedOverMunicipality = null;

    var mousedOverMunicipality = findContainingMunicipality(params,false);
    if (mousedOverMunicipality != null)
      ctrl.mousedOverMunicipality = mousedOverMunicipality;
  }

  function drawingOnCanvas(canvasOverlay, params) {

    var bounds = params.bounds;
    params.tilePoint.z = params.zoom;
    var offsetLeft = params.canvas._leaflet_pos.x;
    var offsetTop = params.canvas._leaflet_pos.y;

    var ctx = params.canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';


    //console.log('getting tile z' + params.tilePoint.z + '-' + params.tilePoint.x + '-' + params.tilePoint.y);

    var tile = tileIndex.getTile(params.tilePoint.z, params.tilePoint.x, params.tilePoint.y);
    if (!tile) {
      //console.log('tile empty');
      return;
    }

    //console.log(params);
    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
    var rightX = params.canvas.width + offsetLeft;
    var rightY = params.canvas.height + offsetTop;
    //console.log("["+offsetLeft+","+offsetTop+","+rightX+","+rightY+"]");
    //console.log(params.canvas);
    //console.log(tile);


    var features = tile.features;

    ctx.strokeStyle = 'blue';

    for (var i = 0; i < features.length; i++) {
      var feature = features[i],
        type = feature.type;

      ctx.fillStyle = feature.tags.color ? feature.tags.color : 'rgba(255,0,0,0.05)';
      ctx.beginPath();

      for (var j = 0; j < feature.geometry.length; j++) {
        var geom = feature.geometry[j];
        if (type === 1) {
          ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
          continue;
        }

        for (var k = 0; k < geom.length; k++) {
          var p = geom[k];
          var extent = 4096;

          var x = p[0] / extent * 256;
          var y = p[1] / extent * 256;

          if (k) ctx.lineTo(x + pad, y + pad);
          else ctx.moveTo(x + pad, y + pad);
        }
      }

      if (ctrl.selectedMunicipalitiesObj.idInArray(feature.id)){
        var oldLineWidth = ctx.lineWidth;
        ctx.lineWidth=5;
        ctx.stroke();
        ctx.lineWidth = oldLineWidth;
      }else {
        ctx.stroke();
      }
      if (ctrl.mousedOverMunicipality && (feature.id == ctrl.mousedOverMunicipality.id)){
      //if (feature.id == ctrl.mousedOverMunicipality.id){
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.fill();
      }
    }
  }

  function isInside(x, y, z1, z2, z3, z4) {
    var x1 = Math.min(z1, z3);
    var x2 = Math.max(z1, z3);
    var y1 = Math.min(z2, z4);
    var y2 = Math.max(z2, z4);
    if ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2)) {
      return true;
    } else {
      return false;
    }
  }

  function muniObj(muniId, muniName){
    return {
      id: muniId,
      name: muniName.toLowerCase(),
      isEqualTo: function (muniName) {
        return (this.name == muniName.toLowerCase());
      },
      getDatabaseMuniEntry: function(){
        //lookup the entry from Municipalities
        var dbEntry = null;
        for (var i in municipalities){
          var dbMuniName = municipalities[i].municipality_name;
          var friendlyMuniName = this.name.replace("&","and");
          if (friendlyMuniName == "unincorporated"){
            //need to figure out which county
            //for now just choose one
            friendlyMuniName = "central st. louis county";
          }
          if (dbMuniName.toLowerCase() == friendlyMuniName){
            dbEntry = municipalities[i];
            break;
          }
        }
        return dbEntry;
      }
    }
  }

  ctrl.selectedMunicipalitiesObj = {
    municipalityObjs: new Array(),
    addMunicipalityObj: function(municipalityObj){
      this.municipalityObjs.push(municipalityObj);
    },
    removeMunicipalityObj: function (municipalityId) {
      for(var index in this.municipalityObjs){
        if (this.municipalityObjs[index].id == municipalityId){
          this.municipalityObjs.splice(index,1);
        }
      }
    },
    getArrayOfNames: function(){
      var arrayOfNames = new Array();
      for(var index in this.municipalityObjs){
        arrayOfNames.push(this.municipalityObjs[index].name);
      }
      return arrayOfNames;
    },
    getArrayOfDatabaseObjects: function(){
      var arrayOfDatabaseObjects = new Array();
      for(var index in this.municipalityObjs){
        arrayOfDatabaseObjects.push(this.municipalityObjs[index].getDatabaseMuniEntry());
      }
      return arrayOfDatabaseObjects;
    },
    idInArray: function(idToFind){
      var found = false;
      for(var index in this.municipalityObjs){
        if (this.municipalityObjs[index].id == idToFind){
          found = true;
          break;
        }
      }
      return found;
    }
  }

  ctrl.selectLocation = function(){
    //$uibModalInstance.close(ctrl.selectedMunicipalities);
    $uibModalInstance.close(ctrl.selectedMunicipalitiesObj.getArrayOfDatabaseObjects());
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});

/*
 See: https://gist.github.com/Sumbera/c67e5551b21c68dc8299
 Licensed under MIT

 Copyright (c) 2015 Stanislav Sumbera,  with modifications to make CanvasTilesInteractive by Clark Woolsey

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
