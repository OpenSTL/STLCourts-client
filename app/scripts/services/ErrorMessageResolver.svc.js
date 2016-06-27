'use strict';
angular.module('yourStlCourts').factory('errorMessageResolver', function ($q) {
  /**
   * Replaces string placeholders with corresponding template string
   */
  if (!('errorFormat' in String.prototype)) {
    String.prototype.errorFormat = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== undefined ? args[number] : match;
      });
    };
  }

  var errorMessages = {
      defaultMsg: 'This field is invalid',
      email: 'Email address is not valid',
      minlength: '{0} must be at least {1} characters long',
      maxlength: '{0} cannot exceed {1} characters',
      min: '{0} must be at least {1}',
      max: '{0} cannot be larger than {1}',
      required: '{0} is required',
      date: 'Date is invalid',
      pattern: '{0} format is invalid',
      number: '{0} must be a valid number',
      url: '{0} must be a valid URL in the format of http(s)://wwww.google.com'
    },

    resolve = function (errorType, el) {
      var defer = $q.defer();
      var errMsg = errorMessages[errorType];

      if (errMsg === undefined) {
        errMsg = errorMessages.defaultMsg.errorFormat(errorType);
      }

      if (el && el.attr) {
        try {
          var name = el.attr('displayName');

          var validationParam = el.attr('ng-' + errorType);
          if (validationParam === undefined) {
            validationParam = el.attr('data-ng-' + errorType) || el.attr(errorType);
          }

          errMsg = errMsg.errorFormat(name, validationParam);
        } catch (e) {
          throw new Error('An error occurred trying to resolve the error message');
        }
      }

      defer.resolve(errMsg);

      return defer.promise; // Utilize this meaningfully if we need to do any async logic
    };

  return {
    resolve: resolve
  };
});
