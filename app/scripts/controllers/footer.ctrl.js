'use strict';

angular.module('yourStlCourts').controller('FooterCtrl', function (Auth) {
  var ctrl = this;

  ctrl.collapseOptions = function(){
    return false;
  };
});
