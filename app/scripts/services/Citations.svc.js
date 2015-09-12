'use strict';

angular.module('ghAngularApp').factory('Citations', function ($resource) {
  var CitationResource = $resource('citations/:id');

  function find(parameters) {
    return CitationResource.get(parameters).$promise;
  }

  var svc = {
    find: find
  };

  return svc;
});
