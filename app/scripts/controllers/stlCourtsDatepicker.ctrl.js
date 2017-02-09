'use strict';
angular.module('yourStlCourts').controller('StlCourtsDatepicker', function () {
  var ctrl = this;

  ctrl.dt = new Date();

  ctrl.datepickerOptions = {
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(),
    showWeeks:false
  };

});
