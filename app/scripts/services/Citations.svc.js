'use strict';

angular.module('ghAngularApp').factory('Citations', function ($resource) {
  var CitationResource = $resource('citations/:id');

  function find(parameters) {
    return CitationResource.get(parameters).$promise;
  }

  function getByCitationId(citationId) {
    return CitationResource.get({ id : citationId }).$promise;
  }

  var svc = {
    getByCitationId: getByCitationId,
    find: find
  };

  return svc;
});
