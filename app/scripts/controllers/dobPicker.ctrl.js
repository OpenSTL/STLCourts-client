'use strict';

angular.module('ghAngularApp').controller('dobPickerCtrl', function ($uibModalInstance, DateFormatter, toaster) {
  var ctrl = this;

  ctrl.dob = null;
  ctrl.status = {
    opened : false
  };
  var today = new Date;
  ctrl.datepickerOptions = {
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(today.getFullYear(),today.getMonth(),today.getDate())
  };

  ctrl.datepickerFormat = 'MM/dd/yyyy';
  ctrl.acceptedDatepickerFormats = ['dd-MMMM-yyyy', 'MM-dd-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

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
