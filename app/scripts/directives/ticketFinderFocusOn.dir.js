'use strict';

angular.module('yourStlCourts').directive('ticketFinderFocusOn', function () {
  return {
    restrict: 'A',

    link: function ($scope, element, attr) {
      var scope = $scope;
      $scope.$on('ticketFinderFocusOn', function(event, name){
        if(name === attr.ticketFinderFocusOn) {
          $(element).focus();
          //element[0].focus();
        }
      });
    }
  };
});
