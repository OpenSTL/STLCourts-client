'use strict';

angular.module('ghAngularApp').controller('citationInfoCtrl', function ($state, citations) {
  var ctrl = this;
  if(!citations) {
    $state.go('home');
  }
  ctrl.citations = citations;
});
