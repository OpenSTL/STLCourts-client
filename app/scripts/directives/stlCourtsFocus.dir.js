'use strict';

angular.module('yourStlCourts').directive('stlCourtsFocus', function ($timeout) {
  return {
    restrict: 'A',

    link: function ($scope, element, attr) {
      var scope = $scope;
      $timeout(function(){
        $(element).get(0).focus();
      });
    }
  };
});
