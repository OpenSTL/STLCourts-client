'use strict';

angular.module('yourStlCourts').controller('dobPickerCtrl', function ($uibModalInstance, toaster) {
  var ctrl = this;

  ctrl.dob = null;
  ctrl.dobValid = false;
  ctrl.dobOver18 = false;

  ctrl.save = function(){
    if (ctrl.dobValid && ctrl.dobOver18){
      $uibModalInstance.close(ctrl.dob);
    }else{
      if (!ctrl.dobValid){
        toaster.pop('error', 'Invalid date of birth.');
      }else{
        if (!ctrl.dobOver18){
          toaster.pop('error', 'Sorry, you must be at least 18 years old to use this site.');
        }
      }
    }
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
