'use strict';

angular.module('yourStlCourts').directive('flipBox', function ($window) {
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
      scope.ctrl.faqBoxBack = scope.front;
      scope.ctrl.frontShowing = true;
     // scope.$apply();


      $(element).on('click',function(){
        if (scope.ctrl.frontShowing){
          scope.ctrl.frontShowing = false;
        }else{
          scope.ctrl.frontShowing = true;
        }
      });

      angular.element($window).on('resize',function(){
        resizeColumns();
      });
      resizeColumns(); //call it for initial setup

      function resizeColumns(){
        var newWidth = $(window).width()/2 - 75;
        console.log(newWidth);
        $(element).find(".flip-box-front,.flip-box-back").each(function(){
          $(this).width(Number(newWidth));
        });
      }

      element.on('$destroy',function(){
        element.off('click');
        angular.element($window).off('resize');
      });
    }
  };
});
