'use strict';

angular.module('yourStlCourts').controller('AboutCtrl', function (Contact) {
  var ctrl = this;
  ctrl.email = Contact.email;
});
