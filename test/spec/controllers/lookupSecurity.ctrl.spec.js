'use strict';

describe('LookupSecurityCtrl', function () {

  var LookupSecurityCtrl;
  var modalInstance;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, toaster) {
      modalInstance = {
        dismiss: jasmine.createSpy('dismiss spy'),
        close: jasmine.createSpy('close spy')
      };
      LookupSecurityCtrl = $controller('lookupSecurityCtrl', {
        $uibModalInstance: modalInstance,
        toaster: toaster
      });
    });
  });

  it('initializes variables on init',function(){
    expect(LookupSecurityCtrl.dob).toBeNull();
    expect(LookupSecurityCtrl.dobValid).toBe(false);
    expect(LookupSecurityCtrl.dobOver18).toBe(false);
    expect(LookupSecurityCtrl.lastName).toBe('');
  });

  it('calls save with dob and lastName',function(){
    LookupSecurityCtrl.dobValid = true;
    LookupSecurityCtrl.dobOver18 = true;
    LookupSecurityCtrl.dob = "myDate";
    LookupSecurityCtrl.lastName = "myName";
    LookupSecurityCtrl.save();
    expect(modalInstance.close).toHaveBeenCalledWith(LookupSecurityCtrl.dob, LookupSecurityCtrl.lastName);
  });

  it('shows error when saving invalid date', inject(function(toaster) {
    spyOn(toaster, 'pop');
    LookupSecurityCtrl.dobValid = false;
    LookupSecurityCtrl.save();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Invalid date of birth.');
  }));

  it('shows error when saving date for under 18 year old', inject(function(toaster) {
    spyOn(toaster, 'pop');
    LookupSecurityCtrl.dobValid = true;
    LookupSecurityCtrl.dobOver18 = false;
    LookupSecurityCtrl.save();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Sorry, you must be at least 18 years old to use this site.');
  }));

  it('shows error when no last name', inject(function(toaster) {
    spyOn(toaster, 'pop');
    LookupSecurityCtrl.dobValid = true;
    LookupSecurityCtrl.dobOver18 = true;
    LookupSecurityCtrl.save();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Invalid last name.');
  }));

  it('cancels', function() {
    LookupSecurityCtrl.cancel();
    expect(modalInstance.dismiss).toHaveBeenCalled();
  });
});
