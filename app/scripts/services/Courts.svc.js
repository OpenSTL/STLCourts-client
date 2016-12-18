'use strict';

angular.module('yourStlCourts').factory('Courts', function ($resource, $q) {
  var CourtResource = $resource('courts/:id');
  var courts;

  function findById(id){
    return CourtResource.get({id: id}).$promise;
  }

  function findAll() {
    return CourtResource.query().$promise;
  }

  var svc = {
    findById: findById,
    findAll: findAll
  };

  return svc;
});
