'use strict';
/*
    Usage: <stl-courts-mobile-ui-select></stl-courts-mobile-ui-select>
    <stl-courts-datepicker date-field="ctrl.dob" date-valid="ctrl.dobValid" date-over-18="ctrl.dobOver18"></stl-courts-datepicker>
*/

angular.module('yourStlCourts').directive('stlCourtsMobileUiSelect', function(){
  return{
    restrict: 'E',
    scope:{
      ngModel:'<',
      onSelect:'&'
    },
    templateUrl: 'views/stlCourtsDatepicker.html',
    controller: 'StlCourtsDatepicker as ctrl',
    link: function($scope,element,attrs){


      element.on('$destroy',function(){

      });
    }
  }
});
