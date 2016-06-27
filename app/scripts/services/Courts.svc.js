'use strict';

angular.module('yourStlCourts').factory('Courts', function ($resource, $q) {
  var CourtResource = $resource('courts/:id');
  var courts;

  function findById(id){
    return CourtResource.get({id: id}).$promise;
  }

  function findAll() {
    if(courts) {
      return $q.when(courts);
    }

    return CourtResource.get().$promise.then(function(data){
      courts = data.courts;
      return data.courts;
    });
  }

  var svc = {
    findById: findById,
    findAll: findAll
  };

  return svc;
});
