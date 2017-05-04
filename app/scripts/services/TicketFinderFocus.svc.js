'use strict';

angular.module('yourStlCourts').factory('TicketFinderFocus', function ($rootScope, $timeout) {
  function focus(name){
    return ($timeout(function(){
      $rootScope.$broadcast('ticketFinderFocusOn',name);
    }));
  }

  var svc = {
    focus: focus
  };

  return svc;
});
