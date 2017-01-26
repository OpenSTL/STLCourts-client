'use strict';

angular.module('yourStlCourts').directive('ticketFinderContentDriver', [function () {
  return {
    restrict: 'E',
    transclude: false,
    scope:false,
    templateUrl: 'views/ticketFinderContentDriver.html'
  };
}]);
