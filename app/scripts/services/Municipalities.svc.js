'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var Municipalities = $resource('municipalities/:id', {id: '@id'});
  var MunicipalitiesFromCourt = $resource('courts/:courtId/municipalities', {courtId: '@courtId'});
  var municipalities;

  function findById(id){
    return Municipalities.get({id: id}).$promise;
  }

  function findByCourtId(courtId){
    return MunicipalitiesFromCourt.query({courtId: courtId}).$promise;
  }

  function findAll(){
    if(municipalities) {
      return $q.when(municipalities);
    }

    return Municipalities.query().$promise.then(function(response){
      municipalities = response;
      return municipalities;
    });
  }

  function combineCountyMunisIntoOne(){
    //this function combines all of Unincorporated Central, West, South, North St. Louis Counties
    // into one St. Louis County entry
    //this only creates an array of municipalities with the field "municipality_name" It is not a true municipality object
    var countyAdded = false;
    var newMunicipalities = new Array();
    if (municipalities) {
      for (var muniIndex = 0; muniIndex < municipalities.length; muniIndex++) {
        var muniName = municipalities[muniIndex].municipality_name;
        if (muniName.indexOf("St. Louis County") != -1) {
          if (!countyAdded) {
            newMunicipalities.push({municipality_name: "St. Louis County"});
            countyAdded = true;
          }
        } else {
          newMunicipalities.push({municipality_name: muniName});
        }
      }
    }
    return newMunicipalities;
  }

  function createFriendlyStlCountyMunicipalities(){
    //this function takes the database name "Unincorporated St. Louis County" and renames it to "St. Louis County"
    var newMunicipalities = new Array();
    if (municipalities) {
      for (var muniIndex = 0; muniIndex < municipalities.length; muniIndex++) {
        var newMunicipalityObj = angular.copy(municipalities[muniIndex]);
        var muniName = newMunicipalityObj.municipality_name;
        if (muniName.indexOf("St. Louis County") != -1) {
          newMunicipalityObj.municipality_name = muniName.replace("Unincorporated ","");
        }
        newMunicipalities.push(newMunicipalityObj);
      }
    }
    return newMunicipalities;
  }

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll,
    combineCountyMunis: combineCountyMunisIntoOne,
    friendlyMunicipalities: createFriendlyStlCountyMunicipalities
  };

  return svc;
});
