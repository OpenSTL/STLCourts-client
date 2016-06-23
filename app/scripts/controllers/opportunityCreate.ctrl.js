'use strict';

angular.module('yourStlCourts').controller('OpportunityCreateCtrl', function ($uibModalInstance, toaster, Opportunities, Auth, courts) {
  var ctrl = this;
  ctrl.municipalities = courts;
  ctrl.opportunity = {
    name: null,
    shortDescription: null,
    fullDescription: null,
    sponsorId: Auth.getAuthenticatedSponsor().id,
    courtId: null
  };

  ctrl.save = function(form){
    if(form.$valid){
      Opportunities.create(ctrl.opportunity).then(function(){
        toaster.pop('success', 'Opportunity was created');
        $uibModalInstance.close(ctrl.opportunity);
      }, function(){
        toaster.pop('error', 'There was an error trying to create your opportunity');
      });
    } else {
      toaster.pop('error', 'Please correct the indicated errors and try again');
    }
  };

  ctrl.cancel = function(){
    $uibModalInstance.dismiss();
  };
});
