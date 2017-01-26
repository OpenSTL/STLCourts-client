'use strict';

angular.module('yourStlCourts').component('ticketFinderBox', {
  templateUrl: 'views/ticketFinderBox.html',
  controller: 'TicketFinderCtrl as ctrl',
  transclude:true,
  bindings: {
    municipalities: '<',
    icon: '@',
    currentTicketFinder: '@',
    text: '@'
    }
});
