'use strict';

angular.module('ghAngularApp').factory('Opportunities', function ($resource) {
  var OpportunitiesResource = $resource('opportunities/:id');

  function findBySponsorId(sponsorId) {
    return OpportunitiesResource.get({sponsorId : sponsorId}).$promise.then(function(response){
      return response.opportunities;
    });
  }

  function findById(opportunityId){
    return OpportunitiesResource.get({id: opportunityId}).$promise;
  }

  function create(opportunity){
    return OpportunitiesResource.save(opportunity).$promise;
  }

  var svc = {
    findById: findById,
    findBySponsorId: findBySponsorId,
    create: create
  };

  return svc;
});
