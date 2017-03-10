'use strict';

angular.module('yourStlCourts').controller('PageMessageCtrl', function (PageMessage, $state) {
  var ctrl = this;
  ctrl.hasMessage = function(){
    return PageMessage.hasMessage();
  };

  ctrl.hasLink = function(){
    return PageMessage.hasLink();
  };

  ctrl.message = function(){
    return PageMessage.getMessage();
  };

  ctrl.gotoLink = function(){
    if (ctrl.hasLink()){
      $state.go(PageMessage.getLink());
    }
  }
});
