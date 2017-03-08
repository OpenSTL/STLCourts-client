'use strict';

angular.module('yourStlCourts').directive('scrollable', function ($anchorScroll, $timeout) {
  return {
    restrict: 'A',

    link: function ($scope, element) {
      $scope.$on('scrollToLocation', function(event, idToScrollTo){
        $timeout(function () {
          $anchorScroll(idToScrollTo);
        },500);
      });
    }
  };
});
