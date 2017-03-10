'use strict';
/*
  To use the pageMessage function, call the PageMessage Service from the state's controller.
*/

angular.module('yourStlCourts').directive('pageMessage', function($rootScope){
  return {
    restrict: 'E',
    templateUrl: 'views/pageMessage.html',
    controller: 'PageMessageCtrl as ctrl',
    link: function ($scope, element, attrs) {
      //hides the element initially
      $(element).addClass("page-message-no-show");

      $rootScope.$on('pageMessageUpdated',function(){
        //decides whether to show or hide the element based on whether there is a message
        //this is necessary to do because the <page-message> element has different attributes
        //depending on whether it is in the top corner or under the header.
        if ($scope.ctrl.hasMessage()) {
          $(element).removeClass("page-message-no-show");
        }else{
          $(element).addClass("page-message-no-show");
        }
      });
    }
  }
});
