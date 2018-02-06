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
    //expects dob to be in form yyyy-mm-dd
    latestDOB = convertDobToDate(dob);
  }

  function getLatestDOB(){
    return latestDOB;
  }

  function convertDobToDate(dob){
    //takes a date of form yyyy-mm-dd returns a date object
    var dobParts = dob.split('-');
    if (dobParts.length == 3){
      return new Date(dobParts[0], Number(dobParts[1])-1, dobParts[2]);
    }else{
      return new Date();
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
