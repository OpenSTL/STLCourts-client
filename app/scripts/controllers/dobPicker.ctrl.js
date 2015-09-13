'use strict';

angular.module('ghAngularApp').controller('dobPickerCtrl', function ($modalInstance, DateFormatter) {
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

  ctrl.save = function(){
    $modalInstance.close(DateFormatter.format(ctrl.dob, 'mm/dd/yyyy'));
  };

  ctrl.cancel = function() {
    $modalInstance.dismiss();
  };
});
