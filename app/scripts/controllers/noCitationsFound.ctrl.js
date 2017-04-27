'use strict';

angular.module('yourStlCourts').controller('NoCitationsFoundCtrl', function (supportedMunicipalities) {
  var ctrl = this;

  ctrl.getSupportedMunicipalitiesList = function(){
    return makeHtmlList(supportedMunicipalities)
  };

  function makeHtmlList(municipalityArray){
    var htmlMuniList = "";
    for (var municipalityCount = 0; municipalityCount < municipalityArray.length; municipalityCount++) {
      if (municipalityCount > 0) {
        htmlMuniList += ", ";
      }
      htmlMuniList += municipalityArray[municipalityCount].name;
    }
    return htmlMuniList;
  }
});
