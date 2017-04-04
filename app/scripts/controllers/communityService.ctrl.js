'use strict';

angular.module('yourStlCourts').controller('CommunityServiceCtrl', function (PageMessage,TextMessageMessage) {
  PageMessage.setMessage(TextMessageMessage.getTextMessageMessage());
});
