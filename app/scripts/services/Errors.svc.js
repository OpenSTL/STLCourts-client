'use strict';

angular.module('yourStlCourts').factory('Errors', function ($rootScope, $state) {
  var ERROR_CODE = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  }

  var svc = {
    makeError: makeError,
    ERROR_CODE: ERROR_CODE
  };

  $rootScope.$on('$stateChangeError',function(event, toState,toParams,fromState,fromParams,error){
    event.preventDefault();
    $state.go('error', {error: error});
  });

  function makeError (errorCode, errorMessage) {
    return {
      code: errorCode,
      message: errorMessage
    };
  }

  return svc;
});

