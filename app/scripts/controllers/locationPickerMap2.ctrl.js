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
