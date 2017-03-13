'use strict';

angular.module('yourStlCourts').factory('Citations', function ($resource,$q) {
  var CitationResource = $resource('citations/:id');

  function find(parameters) {
    var deferred = $q.defer();
    CitationResource.get(parameters,function(citations){
      for(var count = 0; count < citations.length; count++){
        citations[count].citation_date = getDate(citations[count].citation_date);
        citations[count].date_of_birth = getDate(citations[count].date_of_birth);
        citations[count].court_dateTime = getDate(citations[count].court_dateTime);
        violationDateCreate(citations[count].violations);
      }
      deferred.resolve(citations);
    });

    return deferred.promise;
  }

  function getByCitationId(citationId) {
    var deferred = $q.defer();
    CitationResource.get(parameters).then(function(citation){
      citations[count].citation_date = getDate(citations[count].citation_date);
      citations[count].date_of_birth = getDate(citations[count].date_of_birth);
      citations[count].court_dateTime = getDate(citations[count].court_dateTime);
      violationDateCreate(citation.violations);
      deferred.resolve(citation);
    });

    return deferred.promise;
  }

  function violationDateCreate(violations){
    for (var count = 0; count < violations.length; count++){
      violations[count].status_date = getDate(violations[count].status_date);
    }
  }

  function getDate(isoDateString){
    if (isoDateString){
      return new Date(isoDateString);
    }else{
      return null;
    }
  }

  var svc = {
    getByCitationId: getByCitationId,
    find: find
  };

  return svc;
});
