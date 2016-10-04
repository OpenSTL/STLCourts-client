'use strict';
//planning on using: https://github.com/ghiden/angucomplete-alt
//for the search box, just need to read into it a little
angular.module('yourStlCourts').controller('HomeCtrl', function ($state,Courts,municipalities) {
  var ctrl = this;

  ctrl.courts = Courts;
  ctrl.municipalities = municipalities;
  ctrl.selectedCourt = null;

  ctrl.courtSelected  = function(){
    $state.go('courtSearchInfo',{'courtInfo':ctrl.selectedCourt});
  };

  /*ctrl.search = function() {
  };*/
});
