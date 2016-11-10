'use strict';

angular.module('yourStlCourts').controller('ErrorCtrl', function (error) {
  var ctrl = this;
  ctrl.errorCode = error ? error.code : "";
  ctrl.errorMessage = error ? error.message : "";
});
