'use strict';

angular.module('yourStlCourts').directive('faqQuestionBox', function ($window,$rootScope,FaqAnswerBox) {
  return {
    restrict: 'E',
    scope:{
      noTitle:'@',
      questionCount:'<',
      question:'<',
      answer: '<'
    },
    templateUrl: 'views/faqQuestionBox.html',
    controller: 'FaqQuestionBoxCtrl as ctrl',

    link: function ($scope, element) {
      var scope = $scope;
      scope.ctrl.question = scope.question;
      scope.ctrl.answer = scope.answer;

      /*
        we want spacing between rows
          if there is a group title
          And if there is no title and we are not on the first row
       */
      if (scope.noTitle !== 'true' || (scope.noTitle === 'true' && scope.questionCount !== 1 && scope.questionCount !== 2)){
        $(element).parentsUntil(".row-eq-height").parent().addClass("topMargin");
      }

      $(element).on('click',function(){
        FaqAnswerBox.set(scope.ctrl.question,scope.ctrl.answer);
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
