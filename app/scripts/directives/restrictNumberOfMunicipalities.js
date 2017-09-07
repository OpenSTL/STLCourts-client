'use strict';

angular.module('yourStlCourts').directive('restrictNumberOfMunicipalities', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var numberOfMunicipalities  = attrs.restrictNumberOfMunicipalities;
      var validateFn = function(value){
        if (value && value.length > numberOfMunicipalities){
          ctrl.$setValidity('restrictNumberOfMunicipalities', false);
        }else{
          ctrl.$setValidity('restrictNumberOfMunicipalities', true);
        }
        return value;
      };

      ctrl.$parsers.push(validateFn);
      ctrl.$formatters.push(validateFn);
    }
  };
});
