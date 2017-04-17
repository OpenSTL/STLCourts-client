'use strict';

angular.module('yourStlCourts').directive('flipBox', function ($window,$rootScope) {
  return {
    restrict: 'E',
    scope:{
      front:'<',
      back:'<'
    },
    templateUrl: 'views/flipBox.html',
    controller: 'FlipBox as ctrl',

    link: function ($scope, element) {
      var scope = $scope;
      scope.ctrl.faqBoxFront = scope.front;
      scope.ctrl.faqBoxBack = scope.back;
      scope.ctrl.frontShowing = true;

      var frontElement;
      var backElement;
      var flipContainer;

      $(element).find(".flip-box-front").each(function(){
        frontElement = this;
      });
      $(element).find(".flip-box-back").each(function(){
        backElement = this;
      });
      $(element).find(".flip-box-container").each(function(){
        flipContainer = this;
      });



      $(element).on('click',function(){
        if (scope.ctrl.frontShowing){
          scope.ctrl.frontShowing = false;
          $(frontElement).addClass("HideFront");
          $(backElement).removeClass("HideBack");
          $(flipContainer).addClass("flipContainerShowingBack");
        }else{
          scope.ctrl.frontShowing = true;
          $(frontElement).removeClass("HideFront");
          $(backElement).addClass("HideBack");
          $(flipContainer).removeClass("flipContainerShowingBack");
        }


      });

      element.on('$destroy',function(){
        element.off('click');
      });
    }
  };
});
