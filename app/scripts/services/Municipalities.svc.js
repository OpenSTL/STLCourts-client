'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var Municipalities = $resource('municipalities/:id', {id: '@id'});
  var MunicipalitiesFromCourt = $resource('courts/:courtId/municipalities', {courtId: '@courtId'});
  var municipalities;
  var COMBINED_COUNTY_MUNI_ID = -1;

  function findById(id){
    return !!municipalities ? $q.when(_.cloneDeep(_.find(municipalities, {id: id}))) : Municipalities.get({id: id}).$promise;
  }

  function findByCourtId(courtId){
    return MunicipalitiesFromCourt.query({courtId: courtId}).$promise;
  }

  function findAll(){
    var municipalityPromise = !!municipalities ? $q.when(municipalities) : Municipalities.query().$promise;

    return municipalityPromise.then(function(response){
      if(!municipalities) {
        municipalities = response;
      }
      return _.cloneDeep(municipalities);
    });
  }

  //function getUnincorporated

  function separateCountyMunis() {

  }

  function municipalitiesMapNames(){
    //this function takes the database name 'Unincorporated St. Louis County' and renames it to 'St. Louis County'
    var newMunicipalities = [];
    if (municipalities) {
      municipalities.forEach(function(municipality) {
        var clonedMunicipality = angular.copy(municipality);
        var muniName = clonedMunicipality.name;
        if (muniName.indexOf('St. Louis County') != -1) {
          clonedMunicipality.name = muniName.replace('Unincorporated ','');
        }
        newMunicipalities.push(clonedMunicipality);
      });
    }
    return newMunicipalities;
  }

  function translateMapNamesToDatabaseNames(municipalityArray){
    var names = [];
    if (municipalityArray) {
      municipalityArray.forEach(function (municip) {
        if (municip.name == 'St. Louis County') {
          //need to search through all counties so add all counties for search purposes
          names.push('Unincorporated Central St. Louis County');
          names.push('Unincorporated West St. Louis County');
          names.push('Unincorporated North St. Louis County');
          names.push('Unincorporated South St. Louis County');
        } else {
          names.push(municip.name);
        }
      });
    }
    return names;
  }

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll,
    municipalitiesMapNames: municipalitiesMapNames,
    translateMapNamesToDatabaseNames: translateMapNamesToDatabaseNames
  };

  return svc;
});
