'use strict';

angular.module('ghAngularApp').directive('formField', function () {
  return {
    restrict: 'E',
    require: '^form',
    replace: true,
    transclude: true,
    templateUrl: 'views/formField.html',
    scope: {
      info : '@?'
    },
    link: function (scope, elem, attrs) {
      scope.label = attrs.label;
      scope.required  = attrs.hasOwnProperty('required');

      // Select input only if it is of type text, email, or password...if type attribute doesn't exist, HTML
      //  defaults to text input type
      var input = elem.find('textarea, input:not(.ui-select-search)').filter("[type='text'], [type='email'], [type='password'], [type='number'],:not([type])");
      input.addClass('form-control');
      // Grab the id of the input, if applicable, and expose it for use in the label "for" attribute

      scope.id = input.attr('id');
    }
  };
});
