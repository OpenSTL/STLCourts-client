'use strict';

angular.module('yourStlCourts').controller('AboutCtrl', function (Contact,PageMessage,TextMessageMessage,textPhoneNumber) {
  var ctrl = this;
  ctrl.email = Contact.email;
  ctrl.textPhoneNumber = textPhoneNumber;
  PageMessage.setMessage(TextMessageMessage.getTextMessageMessage());
});
