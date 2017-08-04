'use strict';

angular.module('yourStlCourts').controller('lookupSecurityCtrl', function ($uibModalInstance, toaster) {
  var ctrl = this;

  ctrl.dob = null;
  ctrl.dobValid = false;
  ctrl.dobOver18 = false;
  ctrl.lastName = '';

  ctrl.save = function(){
    if (ctrl.dobValid && ctrl.dobOver18 && ctrl.lastName){
      $uibModalInstance.close(ctrl.dob, ctrl.lastName);
    }else{
      if (!ctrl.dobValid){
        toaster.pop('error', 'Invalid date of birth.');
      }else{
        if (!ctrl.dobOver18){
          toaster.pop('error', 'Sorry, you must be at least 18 years old to use this site.');
        }else{
          if (!ctrl.lastName){
            toaster.pop('error', 'Invalid last name.');
          }
        }
      }
    }
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss();
  };
});
