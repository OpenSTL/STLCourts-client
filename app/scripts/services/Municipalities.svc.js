'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var Municipalities = $resource('municipalities/:id', {id: '@id'});
  var MunicipalitiesFromCourt = $resource('courts/:courtId/municipalities', {courtId: '@courtId'});
  var municipalities;

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

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll
  };

  return svc;
});
