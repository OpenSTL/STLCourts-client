'use strict';

angular.module('yourStlCourts').directive('faqAnswerBox', function ($window,$rootScope) {
  return {
    restrict: 'E',
    scope:{
      question:'<',
      answer: '<'
    },
    templateUrl: 'views/faqAnswerBox.html',
    controller: 'FaqAnswerBoxCtrl as ctrl',

    link: function ($scope, element) {
      var scope = $scope;
      scope.ctrl.question = scope.question;
      scope.ctrl.answer = scope.answer;

      $rootScope.$on('faqAnswerBoxReveal',function(evt,question,answer){
        scope.ctrl.question = question;
        scope.ctrl.answer = answer;
      });

      $(element).on('click',function(){

      });
     /* var frontElement;
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
*/
      element.on('$destroy',function(){
        element.off('click');
      });
    }
  };
});
