'use strict';

angular.module('yourStlCourts').directive('layout', function () {
  return {
    restrict: 'A',

    link: function ($scope, element) {
      $scope.$on('$stateChangeStart', function(event, toState){
        if (toState.name === 'home' || toState.name === 'ticketSearch' || toState.name === 'about' || toState.name === 'help' || toState.name === 'info' || toState.name === 'error') {
          element.addClass('background');
        } else {
          element.removeClass('background');
        }
      });
    }
  };
});
