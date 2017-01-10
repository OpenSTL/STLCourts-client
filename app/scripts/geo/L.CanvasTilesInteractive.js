L.GeoJsonVtLayers = L.GridLayer.extend({
  _options: {
    featureOutlineWidth: 2,
    featureHighlightWidth:5,
    featureOutlineColor: 'rgba(0,0,255,1)',
    featureHighlightColor: '',
    featureSelectedColor: 'rgba(255,0,0,0.3)'
  },
  initialize: function(geoJsonVtTileIndex,leafletMapId,mapObj,options){
    var self = this;
    this.geoJsonVtTileIndex = geoJsonVtTileIndex;
    this.leafletMapId = leafletMapId;
    this._mapObj = mapObj;
    L.setOptions(this,this._options);
    L.setOptions(this,options);
    this._firstTile = true;
    this._latLngMousePoint = null;
    this._drawStates = {DRAW:1,SELECT:2,HIGHLIGHT:3};
    this._drawState = this._drawStates.DRAW;
    this._mousedOverMunicipality = null;
    this.mouseEventsOn = false;
    this.on('load',function(){
      self._firstTile = true;
      var htmlEl = L.DomUtil.get(self.leafletMapId);
      self._disableClickMouseMove();
      if (self._drawState == self._drawStates.SELECT || self._drawState == self._drawStates.HIGHLIGHT){
        self._drawState = self._drawStates.DRAW;
        self.redraw();
      }else {
        self.mouseEventsOn = true;
        this._mapObj.on('mousemove',self._onMouseMove,this);
        this._mapObj.on('click',self._onClick,this);
        //L.DomEvent.on(htmlEl, 'mousemove', self._onMouseMove, self);
        //L.DomEvent.on(htmlEl, 'click', self._onClick, self);
      }
    });

  },
  _muniObj: function(muniId, muniName){
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
  },
  _selectedMunicipalitiesObj: {
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
  },
  createTile: function(coords){
    // create a <canvas> element for drawing
    var tile = L.DomUtil.create('canvas', 'leaflet-tile');
    // setup tile width and height according to the options
    var size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;

    if (this._drawState == this._drawStates.DRAW){
      this._drawOnTile(tile,coords);
    }else {
      if (this._drawState == this._drawStates.HIGHLIGHT) {
        this._highlightMunicipalitiesOnCanvas(tile,coords);
      }else{
        this._selectMunicipalityOnCanvas(tile,coords);
      }
    }
    this._firstTile = false;
    // return the tile so it can be rendered on screen
    return tile;
  },

  _drawOnTile: function(tile,coords){
    // get a canvas context and draw something on it using coords.x, coords.y and coords.z
    var ctx = tile.getContext('2d');
    //ctx.globalCompositeOperation = 'source-over';

    //console.log('getting tile: ' + coords.z + '-' + coords.x + '-' + coords.y);
    var geoJsonTile = this.geoJsonVtTileIndex.getTile(coords.z, coords.x, coords.y);
    if (!geoJsonTile) {
      //console.log('tile empty');
      return;
    }

    var features = geoJsonTile.features;

    ctx.strokeStyle = this.options.featureOutlineColor;//'blue';

    for (var i = 0; i < features.length; i++) {
      var feature = features[i],
        type = feature.type;

      //ctx.fillStyle = feature.tags.color ? feature.tags.color : 'rgba(255,0,0,0.05)';
      ctx.beginPath();

      for (var j = 0; j < feature.geometry.length; j++) {
        var geom = feature.geometry[j];

        for (var k = 0; k < geom.length; k++) {
          var p = geom[k];
          var extent = 4096;

          var x = p[0] / extent * 256;
          var y = p[1] / extent * 256;

          if (k) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
      }

      /*if (ctrl.selectedMunicipalitiesObj.idInArray(feature.id)){
        var oldLineWidth = ctx.lineWidth;
        ctx.lineWidth=5;
        ctx.stroke();
        ctx.lineWidth = oldLineWidth;
      }else {*/
        ctx.stroke();
      /*}*/
     /* if (ctrl.mousedOverMunicipality && (feature.id == ctrl.mousedOverMunicipality.id)){
        //if (feature.id == ctrl.mousedOverMunicipality.id){
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.fill();
      }*/
    }

  },
  _disableClickMouseMove: function(){
    var htmlEl = L.DomUtil.get(this.leafletMapId);
    if (this.mouseEventsOn) {
      this.mouseEventsOn = false;
      this._mapObj.off('mousemove',this._onMouseMove);
      this._mapObj.off('click',this._onClick);
      //L.DomEvent.off(htmlEl,'click', self._onClick);
      //L.DomEvent.off(htmlEl, 'mousemove', self._onMouseMove);
    }

  },
  _onMouseMove: function (e) {
    this._disableClickMouseMove();
    //var layerMousePoint = L.point(e.layerPoint.x,e.layerPoint.y,false);
    //this._latLngMousePoint = this._mapObj.layerPointToLatLng(layerMousePoint);
    this._latLngMousePoint = e.latlng;
    this._drawState = this._drawStates.HIGHLIGHT;
    this._firstTile = true;
    this.redraw();
  },
  _onClick: function(e){
    //console.log("click: X:"+e.layerPoint.x+", Y:"+e.layerPoint.y);
    this._disableClickMouseMove();
    //var layerMousePoint = L.point(e.layerPoint.x,e.layerPoint.y,false);
    //this._latLngMousePoint = this._mapObj.layerPointToLatLng(layerMousePoint);
    this._latLngMousePoint = e.latlng;
    this._drawState = this._drawStates.SELECT;
    this._firstTile = true;
    this.redraw();
  },
  _selectMunicipalityOnCanvas: function(tile,coords){
    this._findContainingMunicipality(tile,coords,true);
  },

  _highlightMunicipalitiesOnCanvas: function(tile,coords){
    //loop through everything to find municipality contained in break when found
    if (this._firstTile == true)
      this._mousedOverMunicipality = null;

    var mousedOverMunicipality = this._findContainingMunicipality(tile,coords,false);
    if (mousedOverMunicipality != null)
      this._mousedOverMunicipality = mousedOverMunicipality;
  },

  _findContainingMunicipality: function(tile,coords, selectMunicipalities) {
    var mousedOverMunicipality = null;
    var offsetLeft = coords.x; // params.canvas._leaflet_pos.x;
    var offsetTop = coords.y; //params.canvas._leaflet_pos.y;
    var mousePoint = this._mapObj.latLngToLayerPoint(this._latLngMousePoint);
    var mouseX = mousePoint.x - offsetLeft;
    var mouseY = mousePoint.y - offsetTop;
    var rightX = tile.width + offsetLeft;
    var rightY = tile.height + offsetTop;
    //params.tilePoint.z = params.zoom;

    var ctx = tile.getContext('2d');

    var geoJsonTile = this.geoJsonVtTileIndex.getTile(coords.z, coords.x, coords.y);
    if (!geoJsonTile) {
      return mousedOverMunicipality;
    }

    var features = geoJsonTile.features;
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

          if (k) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
      }

      if (type === 3 || type === 1) {
        var bounds = L.bounds(L.point(offsetLeft,offsetTop),L.point(rightX,rightY));
        //if ((mousePoint != null) && isInside(mousePoint.x,mousePoint.y,offsetLeft,offsetTop,rightX,rightY)) {
        if ((mousePoint != null) && bounds.contains(mousePoint)) {
          if (ctx.isPointInPath(mousePoint.x - offsetLeft, mousePoint.y - offsetTop)) {
            if (selectMunicipalities) {
              if (this._selectedMunicipalitiesObj.idInArray(feature.id)) {
                this._selectedMunicipalitiesObj.removeMunicipalityObj(feature.id);
              } else {
                this._selectedMunicipalitiesObj.addMunicipalityObj(this._muniObj(feature.id, feature.tags.municipality));
              }
            }else {
              mousedOverMunicipality = this._muniObj(feature.id,feature.tags.municipality);
            }
            break;
          }
        }
      }
    }
    return mousedOverMunicipality;
  }

});

L.geoJsonVtLayers = function (geoJsonVtTileIndex,leafletMapId,mapObj, options) {
  options = options?options:{};
  return new L.GeoJsonVtLayers(geoJsonVtTileIndex,leafletMapId,mapObj, options);
};
//---------------------
L.CanvasTilesInteractive2 =  L.TileLayer.Canvas.extend({
  initialize: function (userDrawFunc, userHighlightFunc, userSelectFunc, options,callContext) {
    this._userDrawFunc = userDrawFunc;
    this._userHighlightFunc = userHighlightFunc;
    this._userSelectFunc = userSelectFunc;
    this._highlight = false;
    this._click = false;
    this._callContext = callContext;
    L.setOptions(this, options);
    this._latLngMousePoint = null;
    this._drawStates = {DRAW:1,SELECT:2,HIGHLIGHT:3};
    var numberOfTiles = 0;
    this._firstTile = true;


    var self = this;
    this.drawTile = function (tileCanvas, tilePoint, zoom) {
      //console.log("drawTile Called");
      if (this._highlight || this._click) {
        if (this._highlight) {
          this._draw(tileCanvas, tilePoint, zoom, self._latLngMousePoint, this._drawStates.HIGHLIGHT);
        }else {
          this._draw(tileCanvas, tilePoint, zoom, self._latLngMousePoint, this._drawStates.SELECT);
        }
        if (this._tilesToLoad == 1){ //this is the last tile then
          this._firstTile = true;
          this._highlight = false;
          this._click = false;
          if (this._map) {
            this._reset({hard: true});
            this._update();
          }
        }

      }else {
        this._draw(tileCanvas, tilePoint, zoom, self._latLngMousePoint,this._drawStates.DRAW);
        if (this._tilesToLoad == 1) {
          if (this._userHighlightFunc)
            this._map.on('mousemove',this._onMouseMove,this);
          if (this._userSelectFunc)
            this._map.on('click',this._onClick,this);

          this._firstTile = true;
        }
      }
    };
    return this;
  },
  canvasTileRedraw: function(){
    //console.log("redrawing");
    //this.redraw();  //calling this instead of below code causes the map to be redrawn twice.
    if (this._map) {
      this._reset({hard: true});
      this._update();
    }
  },

  drawing: function (userDrawFunc) {
    this._userDrawFunc = userDrawFunc;
    return this;
  },

  highlighting: function(userHighlightFunc){
    this._userHighlightFunc = userHighlightFunc;
    return this;
  },
  selecting: function(userSelectFunc){
    this._userSelectFunc = userSelectFunc;
    return this;
  },

  params: function (options) {
    L.setOptions(this, options);
    return this;
  },

  addTo: function (map) {
    var layerref = map.addLayer(this);
    //map.on('click',this._onClick);
    //map.addEventListener('click',this._onClick,this);
    //map.on('click',this._onClick,this);
    return this;
  },
  _disableClickMouseMove: function(){
    this._map.off('click');
    this._map.off('mousemove');
  },
  _onMouseMove: function (e) {
    this._disableClickMouseMove();
    var layerMousePoint = L.point(e.layerPoint.x,e.layerPoint.y,false);
    this._latLngMousePoint = this._map.layerPointToLatLng(layerMousePoint);
    this._highlight = true;
    this.canvasTileRedraw();
  },
  _onClick: function(e){
    //console.log("click: X:"+e.layerPoint.x+", Y:"+e.layerPoint.y);
    this._disableClickMouseMove();
    var layerMousePoint = L.point(e.layerPoint.x,e.layerPoint.y,false);
    this._latLngMousePoint = this._map.layerPointToLatLng(layerMousePoint);
    this._click = true;
    this.canvasTileRedraw();
  },
  _drawDebugInfo: function (tileCanvas, tilePoint, zoom) {

    var max = this.options.tileSize;
    var g = tileCanvas.getContext('2d');
    g.globalCompositeOperation = 'destination-over';
    g.strokeStyle = '#FFFFFF';
    g.fillStyle = '#FFFFFF';
    g.strokeRect(0, 0, max, max);
    g.font = "12px Arial";
    g.fillRect(0, 0, 5, 5);
    g.fillRect(0, max - 5, 5, 5);
    g.fillRect(max - 5, 0, 5, 5);
    g.fillRect(max - 5, max - 5, 5, 5);
    g.fillRect(max / 2 - 5, max / 2 - 5, 10, 10);
    g.strokeText(tilePoint.x + ' ' + tilePoint.y + ' ' + zoom, max / 2 - 30, max / 2 - 10);

  },

  /**
   * Transforms coordinates to tile space
   */
  tilePoint: function (map, coords,tilePoint, tileSize) {
    // start coords to tile 'space'
    var s = tilePoint.multiplyBy(tileSize);

    // actual coords to tile 'space'
    var p = map.project(new L.LatLng(coords[0], coords[1]));

    // point to draw
    var x = Math.round(p.x - s.x);
    var y = Math.round(p.y - s.y);
    return {x: x,
      y: y};
  },
  /**
   * Creates a query for the quadtree from bounds
   */
  _boundsToQuery: function (bounds) {
    if (bounds.getSouthWest() == undefined) { return { x: 0, y: 0, width: 0.1, height: 0.1 }; }  // for empty data sets
    return {
      x: bounds.getSouthWest().lng,
      y: bounds.getSouthWest().lat,
      width: bounds.getNorthEast().lng - bounds.getSouthWest().lng,
      height: bounds.getNorthEast().lat - bounds.getSouthWest().lat
    };
  },

  _draw: function (tileCanvas, tilePoint, zoom, latLngMousePoint,drawState) {

    var tileSize = this.options.tileSize;

    var nwPoint = tilePoint.multiplyBy(tileSize);
    var sePoint = nwPoint.add(new L.Point(tileSize, tileSize));


    // padding to draw points that overlap with this tile but their center is in other tile
    var pad = new L.Point(this.options.padding, this.options.padding);

    nwPoint = nwPoint.subtract(pad);
    sePoint = sePoint.add(pad);

    var bounds = new L.LatLngBounds(this._map.unproject(sePoint), this._map.unproject(nwPoint));
    var zoomScale  = 1 / ((40075016.68 / tileSize) / Math.pow(2, zoom));
    // console.time('process');

    if (drawState == this._drawStates.HIGHLIGHT) {
      if (this._userHighlightFunc) {
        this._userHighlightFunc.call(
          this._callContext,
          {
            canvas: tileCanvas,
            tilePoint: tilePoint,
            bounds: bounds,
            size: tileSize,
            zoomScale: zoomScale,
            zoom: zoom,
            options: this.options,
            mousePoint: latLngMousePoint ? this._map.latLngToLayerPoint(latLngMousePoint) : null,
            firstTile: this._firstTile
          }
        );
      }
    }

    if (drawState == this._drawStates.SELECT) {
      if (this._userSelectFunc) {
        this._userSelectFunc.call(
          this._callContext,
          {
            canvas: tileCanvas,
            tilePoint: tilePoint,
            bounds: bounds,
            size: tileSize,
            zoomScale: zoomScale,
            zoom: zoom,
            options: this.options,
            mousePoint: latLngMousePoint ? this._map.latLngToLayerPoint(latLngMousePoint) : null,
            firstTile: this._firstTile
          }
        );
      }
    }

    if (drawState == this._drawStates.DRAW) {
      if (this._userDrawFunc) {
        this._userDrawFunc.call(
          this._callContext,
          this,
          {
            canvas: tileCanvas,
            tilePoint: tilePoint,
            bounds: bounds,
            size: tileSize,
            zoomScale: zoomScale,
            zoom: zoom,
            options: this.options,
            mousePoint: latLngMousePoint ? this._map.latLngToLayerPoint(latLngMousePoint) : null,
            firstTile: this._firstTile
          }
        );
      }
    }

    this._firstTile = false;
    // console.timeEnd('process');


  },
  _objectLength: function(object) {
    var length = 0;
    for( var key in object ) {
      if( object.hasOwnProperty(key) ) {
        ++length;
      }
    }
    return length;
  }


});

L.canvasTilesInteractive2 = function (userDrawFunc, userHighlightFunc, userSelectFunc, options, callContext) {
  return new L.CanvasTilesInteractive2(userDrawFunc, userHighlightFunc, userSelectFunc, options, callContext);
};

/*
 See: http://www.sumbera.com/gist/js/leaflet/canvas/L.CanvasTiles.js
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
