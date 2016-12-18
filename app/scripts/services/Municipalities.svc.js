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

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll
  };

  return svc;
});
