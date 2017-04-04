'use strict';

angular.module('yourStlCourts').controller('HelpCtrl', function (faqData,PageMessage,TextMessageMessage) {
  var ctrl = this;
  ctrl.faqData = faqData;
  PageMessage.setMessage(TextMessageMessage.getTextMessageMessage());
});
