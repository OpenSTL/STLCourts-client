'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var Municipalities = $resource('municipalities/:id', {id: '@id'});
  var MunicipalitiesFromCourt = $resource('courts/:courtId/municipalities', {courtId: '@courtId'});

  function findById(id){
    return Municipalities.get({id: id}).$promise;
  }

  function findByCourtId(courtId){
    return MunicipalitiesFromCourt.query({courtId: courtId}).$promise;
  }

  function findAll(){
    return findSupported();
  }

  function findSupported(supported){
    var params = {};
    if (supported !== undefined){
      params.supported = supported;
    }
    return Municipalities.query(params).$promise;
  }

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll,
    findSupported: findSupported
  };

  return svc;
});
