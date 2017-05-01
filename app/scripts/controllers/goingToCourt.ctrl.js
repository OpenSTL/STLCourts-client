'use strict';

angular.module('yourStlCourts').controller('GoingToCourtCtrl', function ($anchorScroll) {
  var ctrl = this;
  ctrl.scrollTo = function(id){
    $anchorScroll(id);
  }
});
