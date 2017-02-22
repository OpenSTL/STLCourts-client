'use strict';

angular.module('yourStlCourts').factory('Courts', function ($resource, $q) {
  var CourtResource = $resource('courts/:id', {id: '@id'});
  var courts;

  function findById(id){
    return !!courts ? $q.when(_.cloneDeep(_.find(courts, {id: parseInt(id)}))) : CourtResource.get({id: id}).$promise;
  }

  function findAll() {
    var courtPromise = !!courts ? $q.when(courts) : CourtResource.query().$promise;

    return courtPromise.then(function(response){
      if(!courts) {
        courts = response;
      }
      return _.cloneDeep(courts);
    });
  }

  var svc = {
    findById: findById,
    findAll: findAll
  };

  return svc;
});
