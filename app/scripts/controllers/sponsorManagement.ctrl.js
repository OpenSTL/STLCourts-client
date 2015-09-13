'use strict';

angular.module('ghAngularApp').controller('SponsorMgmtCtrl', function ($state, Sponsor) {

    var ctrl = this;

    ctrl.sponsor = Sponsor.GetCurrentSponsor();

    if (ctrl.sponsor === null || ctrl.sponsor === undefined)
    {
        $state.go('sponsorLogin');
    }

});