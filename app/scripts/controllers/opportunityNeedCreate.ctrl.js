'use strict';

angular.module('ghAngularApp').controller('OpportunityNeedCreateCtrl', function ($modalInstance, toaster, Opportunities, courts, opportunity) {
    var ctrl = this;
    ctrl.municipalities = courts;
    ctrl.opportunity = opportunity;
    ctrl.opportunityNeed = {
        name: null,
        shortDescription: null,
        fullDescription: null,
        courtId: null
    };

    ctrl.save = function(form) {
        if (form.$valid) {
            //Opportunities.create(ctrl.opportunity).then(function(){
            //    toaster.pop('success', 'Opportunity was created');
            //    $modalInstance.close(ctrl.opportunity);
            //}, function(){
            //    toaster.pop('error', 'There was an error trying to create your opportunity');
            //})
        } else {
            toaster.pop('error', 'Please correct the indicated errors and try again');
        }
    };

    ctrl.cancel = function(){
        $modalInstance.dismiss();
    }
});
