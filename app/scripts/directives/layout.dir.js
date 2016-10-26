'use strict';

angular.module('yourStlCourts').directive('layout', function () {
  return {
    restrict: 'A',

    link: function ($scope, element) {
      $scope.$on('$stateChangeStart', function(event, toState){
        var statesToUseBackground = ['home',
                                     'ticketSearch',
                                     'about',
                                     'help',
                                     'info',
                                     'error'];
        if (statesToUseBackground.indexOf(toState.name) != -1){
          element.addClass('background');
        } else {
          element.removeClass('background');
        }
      });
    }
  };
});
