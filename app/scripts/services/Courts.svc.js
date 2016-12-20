'use strict';

angular.module('yourStlCourts').factory('Courts', function ($resource, $q) {
  var CourtResource = $resource('courts/:id', {id: '@id'});
  var courts;

  function findById(id){
    return CourtResource.get({id: id}).$promise;
  }

  function findAll() {
    if(courts) {
      return $q.when(courts);
    }
    return CourtResource.query().$promise.then(function(response){
      courts = response;
      return courts;
    });
  }

  var svc = {
    findById: findById,
    findAll: findAll
  };

  return svc;
});
