'use strict';

angular.module('ghAngularApp').controller('citationInfoCtrl', function ($state, citations, Courts) {
  var ctrl = this;

  ctrl.selectCitation = function(citation){
    ctrl.selectedCitation = citation;
    Courts.findById(citation.court_id).then(function(court){
      ctrl.selectedCitation.court = court;
    });
  };

  if(!citations) {
    $state.go('home');
  } else {
    ctrl.citations = citations;
    ctrl.selectedCitation = null;
    if(ctrl.citations.length === 1) {
      ctrl.selectCitation(ctrl.citations[0]);
    }
  }
});
