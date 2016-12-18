'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var allMuniResource = $resource('municipalities');
  var MuniResource = $resource('municipalities/:id');
  var MuniCourtResource = $resource('courts/:courtId/municipalities');

  function findById(id){
    return MuniResource.get({id: id}).$promise;
  }

  function findByCourtId(courtId){
    return MuniCourtResource.query({courtId: courtId}).$promise;
  }

  function findAll(){
    return allMuniResource.query().$promise;
  }

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll
  };

  return svc;
});
