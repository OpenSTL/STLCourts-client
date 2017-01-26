'use strict';

angular.module('yourStlCourts').directive('ticketFinderContentLocation', [function () {
  return {
    restrict: 'E',
    transclude: false,
    scope:false,
    templateUrl: 'views/ticketFinderContentLocation.html'
  };
}]);
