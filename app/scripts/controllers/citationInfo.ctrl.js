'use strict';

angular.module('ghAngularApp').controller('citationInfoCtrl', function ($state, citations) {
  var ctrl = this;
  if(!citations) {
    $state.go('home');
  }
  ctrl.citations = citations;
  ctrl.selectedCitation = null;
  if(ctrl.citations.length === 1) {
    ctrl.selectedCitation = ctrl.citations[0];
  }

  ctrl.selectCitation = function(citation){
    ctrl.selectedCitation = citation;
  };
});
