'use strict';

angular.module('yourStlCourts').directive('faqGroup', function ($window,$rootScope) {
  return {
    restrict: 'E',
    scope:{
      groupTitle:"@",
      arrayName:"@",
      sourceData:"<",
      additionalData:"<",
      keywords:"@",
      noTitle:"@"
    },
    templateUrl: 'views/faqGroup.html',
    controller: 'FaqGroupCtrl as ctrl',

    link: function ($scope, element) {
      var scope = $scope;
      scope.ctrl.groupTitle = scope.groupTitle;
      scope.ctrl.arrayName = scope.arrayName;
      scope.ctrl.sourceData = scope.sourceData;
      scope.ctrl.additionalData = scope.additionalData;
      scope.ctrl.keywords = scope.keywords;
      scope.ctrl.noTitle = scope.noTitle;

      if ($('#faqAnswerBox').length === 0){
        $('body').prepend('<faq-answer-box id="faqAnswerBox"></faq-answer-box>');
      }
    }
  };
});
