'use strict';

angular.module('ghAngularApp').directive('layout', function () {
  return {
    restrict: 'A',

    link: function ($scope, element) {
      $scope.$on('$stateChangeStart', function(event, toState){
        if(toState.name === 'home') {
          element.addClass('background');
        } else {
          element.removeClass('background');
        }
      });
    }
  };
});
