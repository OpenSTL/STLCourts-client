'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var Municipalities = $resource('municipalities/:id', {id: '@id'});
  var MunicipalitiesFromCourt = $resource('courts/:courtId/municipalities', {courtId: '@courtId'});
  var SupportedMunicipalities = $resource('municipalities/supported');
  var municipalities;
  var supportedMunicipalities;

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

  function findSupported(){
    var supportedMunicipalityPromise = !!supportedMunicipalities ? $q.when(supportedMunicipalities) : SupportedMunicipalities.query().$promise;

    return supportedMunicipalityPromise.then(function(response){
      if(!supportedMunicipalities) {
        supportedMunicipalities = response;
      }
      return _.cloneDeep(supportedMunicipalities);
    });
  }

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll,
    findSupported: findSupported
  };

  return svc;
});
