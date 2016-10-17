'use strict';

angular.module('yourStlCourts').controller('HomeCtrl', function ($state,municipalities) {
  var ctrl = this;

  ctrl.municipalities = municipalities;
  ctrl.selectedCourt = null;

  ctrl.courtSelected  = function(){
    $state.go('courtSearchInfo',{'courtId':ctrl.selectedCourt.id});
  };

});
