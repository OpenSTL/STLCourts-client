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
    maxDate: new Date(today.getFullYear()-18,today.getMonth(),today.getDate())
  };

  ctrl.datepickerFormat = 'MM/dd/yyyy';
  ctrl.acceptedDatepickerFormats = ['dd-MMMM-yyyy', 'MM-dd-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  ctrl.open = function() {
    ctrl.status.opened = true;
  };

  var modalInstance = $uibModal.open({
    templateUrl: 'views/dobPicker.html',
    controller: 'dobPickerCtrl as ctrl',
    size: 'sm'
  });

  modalInstance.result.then(function (dob) {
    ctrl.dob = dob;
    //ctrl.findTicket();
  });

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
