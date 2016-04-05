'use strict';

angular.module('ghAngularApp').controller('OpportunityNeedCreateCtrl', function ($modalInstance, toaster, Opportunities, courts, opportunity) {
  var ctrl = this;
  ctrl.municipalities = courts;
  ctrl.opportunity = opportunity;
  ctrl.minDate = new Date();
  ctrl.maxDate = new Date(2016, ctrl.minDate.getMonth(), ctrl.minDate.getDate());
  ctrl.opportunityNeed = {
    startTime: null,
    endTime: null,
    violationFineLimit: null,
    desiredCount: null,
    opportunityId: ctrl.opportunity.id
  };

  ctrl.openMin = function() {
    ctrl.minOpen = true;
    ctrl.maxOpen = false;
  };

  ctrl.openMax = function() {
    ctrl.maxOpen = true;
    ctrl.minOpen = false;
  };

  ctrl.save = function (form) {
    if (form.$valid) {
      Opportunities.createNeed(ctrl.opportunity, ctrl.opportunityNeed).then(function(){
        toaster.pop('success', 'Opportunity Need was created');
        $modalInstance.close(ctrl.opportunityNeed);
      }, function(){
        toaster.pop('error', 'There was an error trying to create your opportunity need');
      });
    } else {
      toaster.pop('error', 'Please correct the indicated errors and try again');
    }
  };

  ctrl.cancel = function () {
    $modalInstance.dismiss();
  };
});
