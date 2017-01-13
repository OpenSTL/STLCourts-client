'use strict';

angular.module('yourStlCourts').controller('LocationPickerMapCtrl', function ($scope, $http, $uibModalInstance, municipalities, leafletData) {
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
    if (!ctrl.selectedMunicipalitiesObj.idInArray(e.target.feature.id)) {
      var layer = e.target;
      layer.setStyle(outlineStyle);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
    ctrl.mousedOverMunicipality = muniObj(e.target.feature.id,e.target.feature.properties.municipality);
  }

  function resetHighlight(e) {
    if (!ctrl.selectedMunicipalitiesObj.idInArray(e.target.feature.id)) {
      geoJson.resetStyle(e.target);
    }
    ctrl.mousedOverMunicipality = "";
  }

  function selectMunicipality(e) {
    if (ctrl.selectedMunicipalitiesObj.municipalityClicked(muniObj(e.target.feature.id,e.target.feature.properties.municipality))){
      var layer = e.target;
      layer.setStyle(highlightStyle);
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }else{
      geoJson.resetStyle(e.target);
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
    geoJson = L.geoJSON(countyMunicipalityBoundaryData,{
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


  function muniObj(muniId, muniName){
    function capitalizeFirstLetter (str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function getName(nameString){
      nameString = capitalizeFirstLetter(nameString);
      if (nameString == "Unincorporated"){
        nameString = "St. Louis County";
      }
      return nameString;
    }

    return {
      id: muniId,
      name: getName(muniName),
      isEqualTo: function (muniName) {
        return (this.name == muniName.toLowerCase());
      },
      getDatabaseMuniEntry: function(){
        //lookup the entry from Municipalities
        var dbEntry = null;
        var friendlyMuniName = this.name.replace("&","and");
        for (var i in municipalities){
          var dbMuniName = municipalities[i].municipality_name;
          if (friendlyMuniName == "St. Louis County"){
            dbEntry = {municipality_name:friendlyMuniName};
            break;
          }
          if (dbMuniName.toLowerCase() == friendlyMuniName.toLowerCase()){
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
    municipalityClicked: function(municipalityObj){
      var municipalityAdded = false;
      if (this.idInArray(municipalityObj.id)){
        this.removeMunicipalityObj(municipalityObj.id);
      }else{
        this.addMunicipalityObj(municipalityObj);
        municipalityAdded = true;
      }
      return municipalityAdded;
    },
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
      //this function removes duplicate names while allowing the selectedMunicipalitesObj to retain duplicated names with different ids
      var arrayOfNames = new Array();
      var countyInArray = false;
      for(var index in this.municipalityObjs){
        arrayOfNames.push(this.municipalityObjs[index].name);
        if (this.municipalityObjs[index].name == "St. Louis County"){
          if (!countyInArray){
            countyInArray = true;
          }else{
            arrayOfNames.pop();  //only need one entry for county so don't add again.
          }

        }
      }
      return arrayOfNames;
    },
    getArrayOfDatabaseObj: function(){
      var arrayOfDatabaseObj = new Array();
      for(var index in this.municipalityObjs){
        arrayOfDatabaseObj.push(this.municipalityObjs[index].getDatabaseMuniEntry());
      }
      return arrayOfDatabaseObj;
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
    $uibModalInstance.close(ctrl.selectedMunicipalitiesObj.getArrayOfDatabaseObj());
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
