'use strict';

angular.module('yourStlCourts').factory('StlCourtsDatePickerInputValidation', function () {
  var svc = {
    makeError: makeError
  };

  function makeError (errorMessage) {
    return {
      message: errorMessage
    };
  }

  return svc;
});

