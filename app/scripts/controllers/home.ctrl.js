'use strict';

angular.module('yourStlCourts').controller('HomeCtrl', function ($state,Courts,municipalities) {
  var ctrl = this;

  ctrl.courts = Courts;
  ctrl.municipalities = municipalities;
  ctrl.selectedCourt = null;

  ctrl.courtSelected  = function(){
    $state.go('courtSearchInfo',{'courtId':ctrl.selectedCourt.id});
  };

});
