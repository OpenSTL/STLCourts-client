'use strict';

angular.module('ghAngularApp').controller('dobPickerCtrl', function ($uibModalInstance, DateFormatter, toaster) {
  var ctrl = this;

  ctrl.dob = null;
  ctrl.minDate = new Date(1900, 0, 1);
  ctrl.maxDate = new Date();
  ctrl.status = {
    opened : false
  };

  ctrl.open = function() {
    ctrl.status.opened = true;
  };

  ctrl.save = function(form) {
    if (form.$valid)
    {
      $uibModalInstance.close(DateFormatter.format(ctrl.dob, 'mm/dd/yyyy'));
    }
    else
    {
      toaster.pop('error', 'Invalid date of birth.');
    }
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
