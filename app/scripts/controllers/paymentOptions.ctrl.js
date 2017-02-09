'use strict';

angular.module('yourStlCourts').controller('PaymentOptionsCtrl', function (Citations,citationId,toaster,$state,Errors) {
  var ctrl = this;
  ctrl.dob = null;
  ctrl.dobValid = false;
  ctrl.dobOver18 = false;

  ctrl.dobValidate = function(){
    if (ctrl.dobValid && ctrl.dobOver18){
      var params = {
        dob: ctrl.dob,
        citationNumber:citationId
      };
      return Citations.find(params).then(function(result){
        if(result.citations.length <= 0) {
          throw Errors.makeError(Errors.ERROR_CODE.BAD_REQUEST, "No tickets were found with the information provided.");
        }
        $state.go('citationInfo', {citations: result.citations});
      });
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
});
