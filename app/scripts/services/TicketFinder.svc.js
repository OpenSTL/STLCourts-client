'use strict';

angular.module('yourStlCourts').factory('TicketFinder', function ($rootScope, $state) {

  var svc = {
    finderSelected : "",
    uniqueNumber : 0,
    TicketFinderToSelect: {
      TICKET_NUMBER : 'TICKET_NUMBER',
      DRIVER_INFO : 'DRIVER_INFO',
      LOCATION : 'LOCATION',
      NONE : 'NONE'
    }

  };

  return svc;
});

