'use strict';

angular.module('yourStlCourts').factory('Municipalities', function ($resource, $q) {
  var Municipalities = $resource('municipalities/:id', {id: '@id'});
  var MunicipalitiesFromCourt = $resource('courts/:courtId/municipalities', {courtId: '@courtId'});
  var municipalities;

  var MUNICIPALITIES_TO_GET = {
    ALL: 1,
    UNSUPPORTED: 2,
    SUPPORTED: 3
  };

  function findById(id){
    return !!municipalities ? $q.when(_.cloneDeep(_.find(municipalities, {id: id}))) : Municipalities.get({id: id}).$promise;
  }

  function findByCourtId(courtId){
    return MunicipalitiesFromCourt.query({courtId: courtId}).$promise;
  }

  function findAll(municipalitiesToGet){
    var municipalityPromise;

    if (municipalitiesToGet == null){
      municipalitiesToGet = MUNICIPALITIES_TO_GET.ALL;
    }

    switch(municipalitiesToGet){
      case MUNICIPALITIES_TO_GET.ALL:
        municipalityPromise = Municipalities.query().$promise;
        return municipalityPromise.then(function(response){
          if(!municipalities) {
            municipalities = response;
          }
          return _.cloneDeep(municipalities);
        });
        break;
      case MUNICIPALITIES_TO_GET.UNSUPPORTED:
        municipalityPromise = Municipalities.query({supported:false}).$promise;
        break;
      case MUNICIPALITIES_TO_GET.SUPPORTED:
        municipalityPromise = Municipalities.query({supported:true}).$promise;
        break;
    }

    return municipalityPromise;
  }


  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findAll: findAll,
    MUNICIPALITIES_TO_GET:MUNICIPALITIES_TO_GET
  };

  return svc;
});
