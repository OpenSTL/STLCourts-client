'use strict';

angular.module('yourStlCourts').factory('Session', function () {
  var latestCitations = null;
  var lastSelectedCitation = null;
  var latestDOB = null;

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

  function setLatestDOB(dob){
    latestDOB = formatDOB(dob);
  }

  function getLatestDOB(){
    return latestDOB;
  }

  function formatDOB(dob){
    //takes a date of form yyyy-mm-dd and converts to mm/dd/yyyy
    var dobParts = dob.split('-');
    if (dobParts.length == 3){
      return dobParts[1] + '/' + dobParts[2] + '/' + dobParts[0];

    }else{
      return dob;
    }
  }


  var svc = {
    getLatestCitations: getLatestCitations,
    setLatestCitations: setLatestCitations,
    getLastSelectedCitation: getLastSelectedCitation,
    setSelectedCitation:setSelectedCitation,
    setLatestDOB:  setLatestDOB,
    getLatestDOB: getLatestDOB
  };

  return svc;
});
