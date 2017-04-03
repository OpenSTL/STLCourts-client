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
        //var IMAGE_RATIO = 0.3125; //ratio of height to width of main banner image;
        var IMAGE_RATIO = 0.208; //ratio of height to width of main banner image;
        var newHeight = $(window).width()*IMAGE_RATIO;
        $(element).height(Number(newHeight));
      }

      element.on('$destroy',function(){
        angular.element($window).off('resize');
      });
    }
  };
});
