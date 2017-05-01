'use strict';

angular.module('yourStlCourts').controller('AboutCtrl', function (Contact,smsPhoneNumber) {
  var ctrl = this;
  ctrl.email = Contact.email;
  ctrl.textPhoneNumber = smsPhoneNumber;
});
