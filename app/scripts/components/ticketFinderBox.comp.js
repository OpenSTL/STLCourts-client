'use strict';

angular.module('yourStlCourts').component('ticketFinderBox', {
  templateUrl: 'views/ticketFinderBox.html',
  controller: 'TicketFinderCtrl as ctrl',
  bindings: {
    finderSelected: '<',
    selectFinder: '=',
    municipalities: '<',
    icon: '@',
    currentTicketFinder: '@',
    text: '@',
    openScrollToId: '=?',
    closeScrollToId: '=?'
    }
});
