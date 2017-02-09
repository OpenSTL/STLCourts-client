'use strict';
angular.module('yourStlCourts').controller('StlCourtsDatepicker', function () {
  var ctrl = this;

  var today = new Date();
  ctrl.dt = today;

  ctrl.datepickerOptions = {
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(today.getFullYear(),today.getMonth(),today.getDate()),
    showWeeks:false
  };

});
