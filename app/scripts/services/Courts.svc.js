'use strict';

angular.module('ghAngularApp').factory('Courts', function ($resource) {
  var CourtResource = $resource('courts/:id');

  function findAll() {
    return CourtResource.get().$promise.then(function(data){
      return data.courts;
    });
  }

  var svc = {
    findAll: findAll
  };

  return svc;
});
