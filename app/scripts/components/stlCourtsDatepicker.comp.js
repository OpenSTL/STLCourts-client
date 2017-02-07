'use strict';
/*
    Usage: <stl-courts-datepicker></stl-courts-datepicker>

 */

angular.module('yourStlCourts').directive('stlCourtsDatepicker', function(){
  return{
    restrict: 'E',
    scope:{},
    templateUrl: 'views/stlCourtsDatepicker.html',
    controller: 'StlCourtsDatepicker as ctrl',
    link: function(scope,element,attrs,ctrl){
        ctrl.watchCalledNumber = 0;
        ctrl.dateFormat = attrs.dateFormat;
        ctrl.dateString = ctrl.dateFormat;
        scope.$watch(function(){
          return ctrl.dateString
        }, function(){
          ctrl.watchCalledNumber++;
          ctrl.setCaretPos();
        });
        var p = 0;
    }
  }
});
/*  bindings: {
    dateFormat:'@'*/

