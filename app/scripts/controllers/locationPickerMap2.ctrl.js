'use strict';

/* global esri */
angular.module('yourStlCourts').controller('LocationPickerMapCtrl2', function ($scope, $http, $uibModalInstance, municipalities) {
  var ctrl = this;
  ctrl.selectedMunicipalities = [];

  ctrl.center = {
    lat:38.62775,
    lng:-90.381801,
    zoom: 10
  };


/*  this works but is super slow
  angular.extend($scope, {
    defaults: {
      scrollWheelZoom: false
    },
    geojson:{
      data:countyMunicipalityBoundaryData,
      style:{
        fill: false,
        weight: 2,
        opacity: 1,
        color: 'blue'
      }
    }
  });
  */

  var tileOptions = {
    maxZoom: 20,  // max zoom to preserve detail on
    tolerance: 5, // simplification tolerance (higher means simpler)
    extent: 4096, // tile extent (both width and height)
    buffer: 64,   // tile buffer on each side
    debug: 0,      // logging level (0 to disable, 1 or 2)

    indexMaxZoom: 0,        // max zoom in the initial tile index
    indexMaxPoints: 100000, // max number of points per tile in the index
  };

  var tileIndex = geojsonvt(countyMunicipalityBoundaryData, tileOptions);

  var a = 1+2;

  function drawingOnCanvas(canvasOverlay, params) {

    var bounds = params.bounds;
    params.tilePoint.z = params.zoom;

    var ctx = params.canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';


    console.log('getting tile z' + params.tilePoint.z + '-' + params.tilePoint.x + '-' + params.tilePoint.y);

    var tile = tileIndex.getTile(params.tilePoint.z, params.tilePoint.x, params.tilePoint.y);
    if (!tile) {
      console.log('tile empty');
      return;
    }

    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);

    var features = tile.features;

    ctx.strokeStyle = 'grey';


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
          if (k) ctx.lineTo(x  + pad, y   + pad);
          else ctx.moveTo(x  + pad, y  + pad);
        }
      }

      if (type === 3 || type === 1) ctx.fill('evenodd');
      ctx.stroke();
    }

  };




  /* function onMapClick(map, evt) {
     ctrl.selectedMunicipalities = [];

     var selectionQuery = new esri.tasks.Query();
     var tol = map.extent.getWidth()/map.width * 5;
     var x = evt.mapPoint.x;
     var y = evt.mapPoint.y;
     var queryExtent = new esri.geometry.Extent(x - tol, y - tol, x + tol, y + tol, evt.mapPoint.spatialReference);
     selectionQuery.geometry = queryExtent;
     var layer = map.getLayer(map.graphicsLayerIds[0]);
     layer.queryFeatures(selectionQuery, function(queryResult){
       queryResult.features.forEach(function(feature){
         if (feature.attributes && feature.attributes.MUNICIPALITY) {
           municipalities.every(function (realMunicip) {
             if (realMunicip.municipality.toLowerCase() === feature.attributes.MUNICIPALITY.toLowerCase()) {
               ctrl.selectedMunicipalities.push(realMunicip);
               return false;
             }

             return true;
           });
         } else {
           console.error('Received a map feature with the incorrect attributes. Something is wrong with the ESRI configuration.');
         }
       });
     });

     $scope.$apply();
   }*/

  /*esriRegistry.get('stlMap').then(function(map){
    map.on('click', function(e) {
      onMapClick(map, e);
    });
  });*/

  ctrl.selectLocation = function(){
    $uibModalInstance.close(ctrl.selectedMunicipalities);
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
