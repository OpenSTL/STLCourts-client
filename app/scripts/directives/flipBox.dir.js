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

      if ($('#answerBox').length === 0){
        $('body').prepend('<div id="answerBox"></div>');
      }

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
          $(flipContainer).removeClass("flipContainerShowingFront").addClass("flipContainerShowingBack");
          $(frontElement).removeClass("showFront").addClass("hideFront").removeClass("flip-box-front-start");
          $(backElement).removeClass("hideBack").addClass("showBack").removeClass("flip-box-back-start");
        }else{
          scope.ctrl.frontShowing = true;
          $(frontElement).removeClass("hideFront").addClass("showFront");
          $(backElement).removeClass("showBack").addClass("hideBack");
          $(flipContainer).removeClass("flipContainerShowingBack").addClass("flipContainerShowingFront");
        }
      });

      element.on('$destroy',function(){
        element.off('click');
      });
    }
  };
});
