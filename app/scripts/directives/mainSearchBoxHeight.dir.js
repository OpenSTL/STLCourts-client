'use strict';

angular.module('yourStlCourts').directive('mainSearchBox', function ($window) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div id="mainSearchBox" class="accent" ng-transclude></div>',
    scope: false,
    link: function ($scope, element, attrs) {
      angular.element($window).on('resize',function(){
        resizeMainSearchBox();
      });
      resizeMainSearchBox(); //call it for initial setup

      function resizeMainSearchBox(){
        var newHeight = $(element).parentsUntil('body').parent().width()*.3125;
        $(element).height(Number(newHeight)+2);
        console.log("resized");
      }

      element.on('$destroy',function(){
        angular.element($window).off('resize');
      });
    }
  };
});
