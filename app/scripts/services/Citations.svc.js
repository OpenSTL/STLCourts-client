'use strict';

angular.module('yourStlCourts').factory('Citations', function ($resource,$q) {
  var CitationResource = $resource('citations/:id');

  function find(parameters) {
    var deferred = $q.defer();
    CitationResource.get(parameters,function(citations){
      for(var count = 0; count < citations.length; count++){
        citations[count].citation_date = citations[count].citation_date?new Date(citations[count].citation_date):null;
        citations[count].date_of_birth = citations[count].date_of_birth?new Date(citations[count].date_of_birth):null;
        citations[count].court_dateTime = citations[count].court_dateTime?new Date(citations[count].court_dateTime):null;
        violationDateCreate(citations[count].violations);
      }
      deferred.resolve(citations);
    },function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function getByCitationId(citationId) {
    var deferred = $q.defer();
    CitationResource.get(parameters).then(function(citation){
      citations[count].citation_date = citations[count].citation_date?new Date(citations[count].citation_date):null;
      citations[count].date_of_birth = citations[count].date_of_birth?new Date(citations[count].date_of_birth):null;
      citations[count].court_dateTime = citations[count].court_dateTime?new Date(citations[count].court_dateTime):null;
        violationDateCreate(citation.violations);
        deferred.resolve(citation);
    },function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function violationDateCreate(violations){
    for (var count = 0; count < violations.length; count++){
      violations[count].status_date = violations[count].status_date?new Date(violations[count].status_date):null;
    }
  }

  var svc = {
    getByCitationId: getByCitationId,
    find: find
  };

  return svc;
});
