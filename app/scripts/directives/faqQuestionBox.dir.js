'use strict';

angular.module('yourStlCourts').directive('faqQuestionBox', function ($window,$rootScope,FaqAnswerBox) {
  return {
    restrict: 'E',
    scope:{
      noTitle:'@',
      question:'<',
      answer: '<'
    },
    templateUrl: 'views/faqQuestionBox.html',
    controller: 'FaqQuestionBoxCtrl as ctrl',

    link: function ($scope, element) {
      var scope = $scope;
      scope.ctrl.question = scope.question;
      scope.ctrl.answer = scope.answer;


      $(element).on('click',function(){
        FaqAnswerBox.set(scope.ctrl.question,scope.ctrl.answer);
      });

      element.on('$destroy',function(){
        element.off('click');
      });
    }
  };
});
