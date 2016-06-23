'use strict';

angular.module('yourStlCourts').factory('Opportunities', function ($resource) {
  var OpportunitiesResource = $resource('opportunities/:id');

  function findBySponsorId(sponsorId) {
    return OpportunitiesResource.get({sponsorId : sponsorId}).$promise.then(function(response){
      return response.opportunities;
    });
  }

  function findByCourtId(courtId) {
    return OpportunitiesResource.get({courtId : courtId}).$promise.then(function(response) {
      return response.opportunities;
    });
  }

  function findNeeds(opportunityId) {
    return $resource('opportunities/:id/needs').get({id : opportunityId}).$promise.then(function(response){
      return response.opportunityNeeds;
    });
  }

  function createNeed(opportunityId, need){
    return $resource('opportunities/' + opportunityId + '/needs').save(need).$promise;
  }

  function findById(opportunityId){
    return OpportunitiesResource.get({id: opportunityId}).$promise;
  }

  function create(opportunity){
    return OpportunitiesResource.save(opportunity).$promise;
  }

  var svc = {
    findById: findById,
    findByCourtId: findByCourtId,
    findBySponsorId: findBySponsorId,
    create: create,
    findNeeds: findNeeds,
    createNeed: createNeed
  };

  return svc;
});
