'use strict';

angular.module('yourStlCourts').controller('LocationPickerMapCtrl', function ($scope, $http, $uibModalInstance, municipalities, leafletData) {
  var ctrl = this;
  ctrl.mousedOverMunicipality = null;
  ctrl.selectedMunicipalities = [];
  var selectedMapMunicipalityIds = [];
  var unincorporatedCount = 0;

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
    var mapMunicipalityId = e.target.feature.id;
    var municipality = getMunicipalityFromMapName(e.target.feature.properties.municipality);
    if(!isMunicipalitySelected(mapMunicipalityId)) {
      var layer = e.target;
      layer.setStyle(outlineStyle);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
    ctrl.mousedOverMunicipality = municipality;
  }

  function resetHighlight(e) {
    var mapMunicipalityId = e.target.feature.id;
    if(!isMunicipalitySelected(mapMunicipalityId)) {
      geoJson.resetStyle(e.target);
    }
    ctrl.mousedOverMunicipality = null;
  }

  function selectMunicipality(e) {
    var mapMunicipalityId = e.target.feature.id;
    var municipality = getMunicipalityFromMapName(e.target.feature.properties.municipality);
    if(isMunicipalitySelected(mapMunicipalityId)) {
      removeMuncipality(municipality, mapMunicipalityId);
      geoJson.resetStyle(e.target);
    } else {
      addMunicipality(municipality, mapMunicipalityId);
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
      click: selectMunicipality
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
        nameString = "St. Louis County Municipal";
      }

      return nameString.replace("&", "and");
    }

    return _.find(municipalities, function(municipality) {
      return municipality.name.toLowerCase() === getName(muniMapName).toLowerCase();
    });
  }

  function isMunicipalitySelected(mapMunicipalityId) {
    return _.includes(selectedMapMunicipalityIds, mapMunicipalityId);
  }

  function addMunicipality(municipality, mapMunicipalityId) {
    updateUnincorporatedCount(municipality, true);
    if(!_.find(ctrl.selectedMunicipalities, {id: municipality.id})) {
      ctrl.selectedMunicipalities.push(municipality);
    }
    selectedMapMunicipalityIds.push(mapMunicipalityId);
  }

  function removeMuncipality(municipality, mapMunicipalityId) {
    updateUnincorporatedCount(municipality, false);

    var unincorporated = isUnincorporated(municipality);
    var shouldRemove = unincorporated ? unincorporatedCount === 0 : true;
    if(shouldRemove) {
      _.pull(ctrl.selectedMunicipalities, municipality);
    }

    _.pull(selectedMapMunicipalityIds, mapMunicipalityId);
  }

  function updateUnincorporatedCount(municipality, isAdded) {
    if(isUnincorporated(municipality)) {
      if(isAdded) {
        unincorporatedCount++;
      } else {
        unincorporatedCount--;
      }
    }
  }

  function isUnincorporated(municipality) {
    return municipality.name.toLowerCase().indexOf('unincorporated') >= 0;
  }

  ctrl.selectLocation = function(){
    $uibModalInstance.close(ctrl.selectedMunicipalities);
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
