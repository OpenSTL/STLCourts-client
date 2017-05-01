'use strict';

angular.module('yourStlCourts').controller('SMSInstructionsCtrl', function (smsPhoneNumber) {
  var ctrl = this;
  ctrl.textPhoneNumber = smsPhoneNumber;
});
