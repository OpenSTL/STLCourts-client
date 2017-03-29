'use strict';

angular.module('yourStlCourts').factory('Citations', function ($resource) {
  var CitationResource = $resource('citations/');

  function find(parameters) {
    parameters = parameters || {};
    return CitationResource.query(parameters).$promise.then(function(citations){
      for(var count = 0; count < citations.length; count++){
        convertCitationDateStringsToDates(citations[count]);
      }
      return citations;
    });
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

  function convertCitationDateStringsToDates(citation){
    citation.citation_date = getDate(citation.citation_date);
    citation.date_of_birth = getDate(citation.date_of_birth);
    citation.court_dateTime = getDate(citation.court_dateTime);
    violationDateCreate(citation.violations);
  }

  var svc = {
    find: find
  };

  return svc;
});
