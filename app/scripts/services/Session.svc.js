'use strict';

angular.module('yourStlCourts').factory('Session', function () {
  var latestCitations = null;
  var lastSelectedCitation = null;
  function getLatestCitations(citations) {
    if (!citations) {
      citations = latestCitations;
    }
    latestCitations = citations;
    return citations;
  }

  function getLastSelectedCitation(){
    return lastSelectedCitation;
  }

  function storeSelectedCitation(citation){
    lastSelectedCitation = citation;
    return citation;
  }

  var svc = {
    getLatestCitations: getLatestCitations,
    getLastSelectedCitation: getLastSelectedCitation,
    storeSelectedCitation:storeSelectedCitation
  };

  return svc;
});
