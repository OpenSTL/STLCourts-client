'use strict';

angular.module('yourStlCourts').controller('PaymentOptionsCtrl', function (citationId,DateFormatter, $uibModal,toaster) {
  var today = new Date();
  var ctrl = this;

  ctrl.dob = null;
  ctrl.status = {
    opened : false
  };
  ctrl.datepickerOptions = {
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(today.getFullYear(),today.getMonth(),today.getDate()),
    showWeeks:false
  };

  ctrl.datepickerFormat = 'MM/dd/yyyy';
  ctrl.acceptedDatepickerFormats = ['dd-MMMM-yyyy', 'MM-dd-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  ctrl.open = function() {
    ctrl.status.opened = true;
  };

  ctrl.validateDob = function(){
    var dateValidator = /^[0-1][1-9][\/](([0][1-9])|([1-2][0-9])|([3][0-1]))[\/][0-9]{4}$/;
    if (dateValidator.test(ctrl.myDate)){
      //passes basic date form now make sure it is a vaild date.
      var datePartsArray = ctrl.myDate.split("/");
      var d;
      try {
        d = new Date(datePartsArray[2], datePartsArray[0], datePartsArray[1]);
        alert("worked");
      }catch(dateErr){
        alert("tried converting. "+dateErr);
      }
    }

  };


  /*ctrl.save = function(form) {
    if (form.$valid) {
      //$uibModalInstance.close(DateFormatter.format(ctrl.dob, 'mm/dd/yyyy'));
    } else {
      toaster.pop('error', 'Invalid date of birth. Use mm/dd/yyyy');
    }
  };

  ctrl.cancel = function() {
    //$uibModalInstance.dismiss();
  };*/

  /*
   var params = {
   dob: $stateParams.dob,
   citationNumber:$stateParams.citation
   };
   return Citations.find(params).then(function(result){
   if(result.citations.length <= 0) {
   throw Errors.makeError(Errors.ERROR_CODE.BAD_REQUEST, "No tickets were found with the information provided.");
   }
   return result.citations;
   });

   */
});
