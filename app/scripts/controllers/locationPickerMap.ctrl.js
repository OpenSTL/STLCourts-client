'use strict';

angular.module('yourStlCourts').controller('LocationPickerMapCtrl', function ($scope, $http, $uibModalInstance, municipalities, leafletData) {
  var ctrl = this;
  ctrl.mousedOverMunicipality = null;
  ctrl.selectedMunicipalities = [];

  ctrl.center = {
    lat:38.62775,
    lng:-90.381801,
    zoom: 10
  };

  var geoJson;
  var highlightStyle = {
    weight: 3,
    color: 'blue',
    fillColor:'blue',
    dashArray: '',
    fillOpacity: 0.5
  };

  var outlineStyle = {
    weight: 3,
    color: 'blue',
    fillColor:'',
    dashArray: '',
    fillOpacity: 0
  };

  function highlightFeature(e) {
    var municipality = getMunicipalityFromMapName(e.target.feature.properties.municipality);
    if(!isMunicipalitySelected(municipality.id)) {
      var layer = e.target;
      layer.setStyle(outlineStyle);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
    ctrl.mousedOverMunicipality = municipality;
  }

  function resetHighlight(e) {
    var municipality = getMunicipalityFromMapName(e.target.feature.properties.municipality);
    if(!isMunicipalitySelected(municipality.id)) {
      geoJson.resetStyle(e.target);
    }
    ctrl.mousedOverMunicipality = null;
  }

  function selectMunicipality(e) {
    var municipality = getMunicipalityFromMapName(e.target.feature.properties.municipality);
    if(isMunicipalitySelected(municipality.id)) {
      removeMuncipality(municipality);
      geoJson.resetStyle(e.target);
    } else {
      addMunicipality(municipality);
      var layer = e.target;
      layer.setStyle(highlightStyle);
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click:selectMunicipality
    });
  }

  leafletData.getMap("municipalityMap").then(function(map){
    $http.get('data/stlCountyMunicipalBoundaries.json').success(function(geoJsonData){
      geoJson = L.geoJSON(geoJsonData,{
        style: function(feature) {
          return {
            fillColor: "",
            weight: 1,
            opacity: 1,
            color: 'blue',
            dashArray: '',
            fillOpacity: 0
          }
        },
        onEachFeature: onEachFeature
      }).addTo(map);
    });
  });

  function getMunicipalityFromMapName(muniMapName){
    function getName(nameString){
      if (nameString.toLowerCase() == "unincorporated"){
        nameString += " St. Louis County";
      }

      return nameString.replace("&", "and");
    }

    return _.find(municipalities, function(municipality) {
      return municipality.name.toLowerCase() === getName(muniMapName).toLowerCase();
    });
  }

  function isMunicipalitySelected(municipalityId) {
    return !!_.find(ctrl.selectedMunicipalities, {id: municipalityId});
  }

  function addMunicipality(municipality) {
    ctrl.selectedMunicipalities.push(municipality);
  }

  function removeMuncipality(municipality) {
    _.pull(ctrl.selectedMunicipalities, municipality);
  }

  ctrl.selectLocation = function(){
    $uibModalInstance.close(ctrl.selectedMunicipalities);
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
