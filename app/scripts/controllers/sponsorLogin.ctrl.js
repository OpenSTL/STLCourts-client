'use strict';

angular.module('ghAngularApp').controller('SponsorLoginCtrl', function ($state, toaster, Sponsor) {

    var ctrl = this;

    // Setup form binding object/fields
    ctrl.credentials = {};
    ctrl.credentials.userId = "";
    ctrl.credentials.password = "";

    // Function for form submit
    ctrl.DoSponsorLogin = function(sponsorLoginFrm) {
        if (sponsorLoginFrm.$valid) {
            Sponsor.Login(ctrl.credentials).then(
            function(response) {
                Sponsor.StoreCurrentSponsor(response.data);
                toaster.pop('success', 'Welcome back ' + response.data.name);
                $state.go('sponsorMgmt');
            },
            function() {
                toaster.pop('error', 'There was an error logging in.');
            });
        } else {
            toaster.pop('error', 'Please provide the required information');
        }
    };
});