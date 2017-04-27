'use strict';

angular.module('yourStlCourts').directive('faqAnswerBox', function ($window,$rootScope,$timeout) {
  return {
    restrict: 'E',
    scope:{
      question:'=',
      answer:'='
    },
    templateUrl: 'views/faqAnswerBox.html',
    controller: 'FaqAnswerBoxCtrl as ctrl',

    link: function ($scope, element) {
      var scope = $scope;
      scope.ctrl.question = "";
      scope.ctrl.answer = "";
      var frontShowing = true;

      $rootScope.$on('faqAnswerBoxReveal',function(evt,question,answer){
        var q = question;
        var a = answer;
        if (!frontShowing){
          $(".faq-answer-back").removeClass("showBack").addClass("hideBack");
          $(".faq-answer-front").removeClass("hideFront").addClass("showFront");
          $timeout(function(){
            flipToBack(q,a);
          },1500);
        }else{
          flipToBack(q,a);
        }
      });

      function flipToBack(question,answer){
        frontShowing = false;
        scope.ctrl.question = question;
        scope.ctrl.answer = answer;
        scope.$apply();

        $(".faq-answer-back").addClass("showBack").removeClass("hideBack");
        $(".faq-answer-front").addClass("hideFront").removeClass("showFront");
      }

      $("#faq-answer-box-close-button").on('click',function(){
        $(".faq-answer-back").removeClass("showBack").addClass("hideBack");
        $(".faq-answer-front").removeClass("hideFront").addClass("showFront");
        frontShowing = true;
      });


      element.on('$destroy',function(){
        $rootScope.$off('faqAnswerBoxReveal');
        $("#faq-answer-box-close-button").off('click');
      });
    }
  };
});
