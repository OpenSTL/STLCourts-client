'use strict';

angular.module('yourStlCourts').directive('loading', function($timeout){
  return{
    restrict: 'E',
    scope:{
    },
    templateUrl: 'views/loading.html',
    link: function($scope,element,attrs){
      var fastEnough = true;
      $(element).addClass("hidden");
      $scope.$on('$stateChangeStart',function(){
        fastEnough = false;
        $timeout(function(){
          if (!fastEnough){
            $(element).removeClass("hidden");
          }
        },500);
      });

      $scope.$on('$stateChangeSuccess',function(){
        $(element).addClass("hidden");
        fastEnough = true;
      });
    }
  }
});
