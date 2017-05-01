'use strict';

angular.module('yourStlCourts').controller('InfoCtrl', function ($anchorScroll) {
  var ctrl = this;
  ctrl.scrollTo = function(id){
    $anchorScroll(id);
  }
});
