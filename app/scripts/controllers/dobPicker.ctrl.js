'use strict';

angular.module('yourStlCourts').controller('dobPickerCtrl', function ($uibModalInstance, DateFormatter, toaster) {
  var today = new Date();
  var ctrl = this;

  ctrl.dob = null;
  ctrl.status = {
    opened : false
  };
  ctrl.datepickerOptions = {
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(today.getFullYear()-18,today.getMonth(),today.getDate())
  };

  ctrl.datepickerFormat = 'MM/dd/yyyy';
  ctrl.acceptedDatepickerFormats = ['dd-MMMM-yyyy', 'MM-dd-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  ctrl.open = function() {
    ctrl.status.opened = true;
  };

  ctrl.save = function(form) {
    if (form.$valid) {
      $uibModalInstance.close(DateFormatter.format(ctrl.dob, 'mm/dd/yyyy'));
    } else {
      toaster.pop('error', 'Invalid date of birth. Use mm/dd/yyyy');
    }
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
