'use strict';

angular.module('yourStlCourts').controller('ErrorCtrl', function (Error) {
  var ctrl = this;
  ctrl.errorCode = Error.getError().code;
  ctrl.errorMessage = Error.getError().message;

});
