'use strict';

describe('DobPickerCtrl', function () {

  var DobPickerCtrl;
  var modalInstance;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, toaster) {
      modalInstance = {
        dismiss: jasmine.createSpy('dismiss spy'),
        close: jasmine.createSpy('close spy')
      };
      DobPickerCtrl = $controller('dobPickerCtrl', {
        $uibModalInstance: modalInstance,
        toaster: toaster
      });
    });
  });

  it('initializes variables on init',function(){
    expect(DobPickerCtrl.dob).toBeNull();
    expect(DobPickerCtrl.dobValid).toBe(false);
    expect(DobPickerCtrl.dobOver18).toBe(false);
  });

  it('calls save with dob',function(){
    DobPickerCtrl.dobValid = true;
    DobPickerCtrl.dobOver18 = true;
    DobPickerCtrl.dob = "myDate";
    DobPickerCtrl.save();
    expect(modalInstance.close).toHaveBeenCalledWith(DobPickerCtrl.dob);
  });

  it('shows error when saving invalid date', inject(function(toaster) {
    spyOn(toaster, 'pop');
    DobPickerCtrl.dobValid = false;
    DobPickerCtrl.save();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Invalid date of birth.');
  }));

  it('shows error when saving date for under 18 year old', inject(function(toaster) {
    spyOn(toaster, 'pop');
    DobPickerCtrl.dobValid = true;
    DobPickerCtrl.dobOver18 = false;
    DobPickerCtrl.save();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Sorry, you must be at least 18 years old to use this site.');
  }));

  it('cancels', function() {
    DobPickerCtrl.cancel();
    expect(modalInstance.dismiss).toHaveBeenCalled();
  });
});
