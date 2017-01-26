'use strict';

angular.module('yourStlCourts').factory('TicketFinder', function () {

  var svc = {
    TicketFinderToSelect: {
      TICKET_NUMBER : 'TICKET_NUMBER',
      DRIVER_INFO : 'DRIVER_INFO',
      LOCATION : 'LOCATION',
      NONE : 'NONE'
    }
  };
  return svc;
});

