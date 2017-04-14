'use strict';

angular.module('yourStlCourts').directive('flipBox', function () {
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
      scope.$apply();


      $(element).on('click',function(){

      });
    }
  };
});
