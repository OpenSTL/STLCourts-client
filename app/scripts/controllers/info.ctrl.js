'use strict';

angular.module('yourStlCourts').controller('InfoCtrl', function (PageMessage,TextMessageMessage) {
  PageMessage.setMessage(TextMessageMessage.getTextMessageMessage());
});
