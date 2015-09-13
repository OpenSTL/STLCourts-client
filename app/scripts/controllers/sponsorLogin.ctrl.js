'use strict';

/* global _ */
angular.module('ghAngularApp').controller('SponsorLoginCtrl', function (toaster, Sponsor) {
    var ctrl = this;

    ctrl.DoSponsorLogin = function(sponsorLoginFrm) {
        if (sponsorLoginFrm.$valid) {



        } else {
            toaster.pop('error', 'Please provide the required information');
        }
    };
});