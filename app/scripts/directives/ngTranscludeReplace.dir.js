'use strict';

angular.module('yourStlCourts').directive('ngTranscludeReplace', function () {
  return {
    terminal: true,
    restrict: 'EA',

    link: function ($scope, $element, $attr, ctrl, transclude) {
      if (!transclude) {
        return; //Illegal use of ngTranscludeReplace directive in the template! No parent directive that requires a transclusion found
      }
      transclude(function (clone) {
        if (clone.length) {
          $element.replaceWith(clone);
        }
        else {
          $element.remove();
        }
      });
    }
  };
});
