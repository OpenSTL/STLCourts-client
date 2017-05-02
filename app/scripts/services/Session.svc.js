'use strict';

angular.module('yourStlCourts').factory('Session', function () {
  var latestCitations = null;
  var lastSelectedCitation = null;
  function getLatestCitations() {
    return latestCitations;
  }

  function setLatestCitations(citations){
    latestCitations = citations;
    clearLastSelectedCitation();
  }

  function getLastSelectedCitation(){
    return lastSelectedCitation;
  }

  function setSelectedCitation(citation){
    lastSelectedCitation = citation;
  }

  function clearLastSelectedCitation(){
    lastSelectedCitation = null;
  }

  var svc = {
    getLatestCitations: getLatestCitations,
    setLatestCitations: setLatestCitations,
    getLastSelectedCitation: getLastSelectedCitation,
    setSelectedCitation:setSelectedCitation
  };

  return svc;
});
