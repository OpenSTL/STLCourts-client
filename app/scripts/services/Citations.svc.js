'use strict';

angular.module('yourStlCourts').factory('Citations', function ($resource) {
  var CitationResource = $resource('citations/:id', {id: '@id'});

  function find(parameters) {
    return CitationResource.get(parameters,function(citations){
      for(var count = 0; count < citations.length; count++){
        convertCitationDateStringsToDates(citations[count]);
      }
      return citations;
    }).$promise;
  }

  function getByCitationId(citationId) {
    return CitationResource.get({id: citationId},function(citation){
      convertCitationDateStringsToDates(citation);
      return citation;
    }).$promise;
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
    citation[count].citation_date = getDate(citation[count].citation_date);
    citation[count].date_of_birth = getDate(citation[count].date_of_birth);
    citation[count].court_dateTime = getDate(citation[count].court_dateTime);
    violationDateCreate(citation.violations);
  }

  var svc = {
    getByCitationId: getByCitationId,
    find: find
  };

  return svc;
});
