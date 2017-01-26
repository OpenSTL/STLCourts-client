'use strict';

angular.module('yourStlCourts').component('ticketFinderBox', {
  templateUrl: 'views/ticketFinderBox.html',
  controller: 'TicketFinderCtrl as ctrl',
  /*require:{
    updateFinderSelected: '^HomeCtrl'
  },*/
  bindings: {
    finderSelected: '=',
    selectFinder: '=',
    municipalities: '<',
    icon: '@',
    currentTicketFinder: '@',
    text: '@'
    }
});
