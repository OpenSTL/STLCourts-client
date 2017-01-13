L.GeoJsonVt = L.GridLayer.extend({
  createTile: function(coords, done){
    console.log("createTile");
    var error;
    // create a <canvas> element for drawing
    var tile = L.DomUtil.create('canvas', 'leaflet-tile');
    // setup tile width and height according to the options
    var size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;
    // draw something asynchronously and pass the tile to the done() callback
    setTimeout(function() {
      done(error, tile);
    }, 1000);
    return tile;
  }
});

L.geoJsonVt = function (geoJsonVtTileIndex, options) {
  options = options?options:{};
  return new L.GeoJsonVt(geoJsonVtTileIndex, options);
};

