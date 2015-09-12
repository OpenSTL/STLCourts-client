'use strict';

angular.module('ghAngularApp').controller('HomeCtrl', function ($scope, esriRegistry) {
  var ctrl = this;
  ctrl.map = {
    options: {
      basemap: 'streets',
      center: [-90.381801, 38.668909],
      zoom: 10,
      sliderStyle: 'small'
    }
  };

  function onMapClick(map, evt) {
    var selectionQuery = new esri.tasks.Query();
    console.log(selectionQuery);
    var tol = map.extent.getWidth()/map.width * 5;
    var x = evt.mapPoint.x;
    var y = evt.mapPoint.y;
    var queryExtent = new esri.geometry.Extent(x - tol, y - tol, x + tol, y + tol, evt.mapPoint.spatialReference);
    selectionQuery.geometry = queryExtent;
    var layer = map.getLayer(map.graphicsLayerIds[0]);
    layer.queryFeatures(selectionQuery, function(queryResult){
      queryResult.features.forEach(function(feature){
        console.log(feature.attributes.MUNICIPALITY); //TODO: USE this for realz
      });
    });
  }

  esriRegistry.get('stlMap').then(function(map){
    map.on('click', function(e) {
      $scope.$apply(onMapClick.bind(null, map, e));
    });
  });
});
