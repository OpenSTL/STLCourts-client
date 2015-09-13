'use strict';

angular.module('ghAngularApp').controller('SponsorLoginCtrl', function (toaster, Sponsor) {

    var ctrl = this;

    // Setup form binding object/fields
    ctrl.credentials = {};
    ctrl.credentials.userId = "";
    ctrl.credentials.password = "";

    // Function for form submit
    ctrl.DoSponsorLogin = function(sponsorLoginFrm) {
        if (sponsorLoginFrm.$valid) {
            Sponsor.Login(ctrl.credentials);
        } else {
            toaster.pop('error', 'Please provide the required information');
        }
    };
});