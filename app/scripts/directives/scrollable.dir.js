'use strict';

angular.module('yourStlCourts').directive('scrollable', function ($anchorScroll, $timeout) {
  return {
    restrict: 'A',

    link: function ($scope, element) {
      var scope = $scope;
      $scope.$on('scrollToLocation', function(event, idToScrollTo, hasNgIncludedContent){
        var scrollToId = idToScrollTo;
        if (hasNgIncludedContent){
          scope.$on('$includeContentLoaded',function(){
            $timeout(function(){
              $anchorScroll(scrollToId);
            },500);
          });
        }else{
          $anchorScroll(scrollToId);
        }
      });
    }
  };
});
