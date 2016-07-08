'use strict';

describe('DobPickerCtrl', function () {

  var DobPickerCtrl;
  var modalInstance;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, DateFormatter, toaster) {
      modalInstance = {
        dismiss: jasmine.createSpy('dismiss spy'),
        close: jasmine.createSpy('close spy')
      };
      DobPickerCtrl = $controller('dobPickerCtrl', {
        $uibModalInstance: modalInstance,
        DateFormatter: DateFormatter,
        toaster: toaster
      });
    });
  });

  it('sets variables on init', function() {
    var today = new Date();

    expect(DobPickerCtrl.dob).toBeNull();
    expect(DobPickerCtrl.status.opened).toBe(false);
    expect(DobPickerCtrl.datepickerOptions.minDate).toEqual(new Date(1900, 0, 1));
    expect(DobPickerCtrl.datepickerOptions.maxDate).toEqual(new Date(today.getFullYear()-18,today.getMonth(),today.getDate()));
    expect(DobPickerCtrl.datepickerFormat).toEqual('MM/dd/yyyy');
    expect(DobPickerCtrl.acceptedDatepickerFormats).toEqual(['dd-MMMM-yyyy', 'MM-dd-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']);
  });

  it('sets to open status', function() {
    DobPickerCtrl.open();

    expect(DobPickerCtrl.status.opened).toBe(true);
  });

  it('closes modal with dob on save', inject(function(DateFormatter) {
    var form = { $valid: true };
    DobPickerCtrl.dob = new Date(1995, 5, 18);

    DobPickerCtrl.save(form);

    expect(modalInstance.close).toHaveBeenCalledWith('06/18/1995');
  }));

  it('shows error when saving invalid date', inject(function(toaster) {
    var form = { $valid: false };
    spyOn(toaster, 'pop');

    DobPickerCtrl.save(form);

    expect(toaster.pop).toHaveBeenCalledWith('error', 'Invalid date of birth.');
  }));

  it('cancels', function() {
    DobPickerCtrl.cancel();

    expect(modalInstance.dismiss).toHaveBeenCalled();
  });
});
