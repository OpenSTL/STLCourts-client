'use strict';

describe('StlCourtsDatepicker', function () {

  var StlCourtsDatepicker;


  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller) {
      StlCourtsDatepicker = $controller('StlCourtsDatepicker', {});
    });
  });

  it('initializes variables on init',function(){
    expect(StlCourtsDatepicker.uibDatePickerDate instanceof Date).toBe(true);
    expect(StlCourtsDatepicker.datepickerOptions.minDate instanceof Date).toBe(true);
    expect(StlCourtsDatepicker.datepickerOptions.maxDate instanceof Date).toBe(true);
    expect(StlCourtsDatepicker.datepickerOptions.showWeeks).toBe(false);
  });


});
