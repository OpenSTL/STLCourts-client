'use strict';

angular.module('yourStlCourts').directive('ticketFinderContentTicket', [function () {
  return {
    restrict: 'E',
    transclude: false,
    scope:false,
    templateUrl: 'views/ticketFinderContentTicket.html'
  };
}]);
