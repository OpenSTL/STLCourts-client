'use strict';

angular.module('ghAngularApp').controller('PaymentOptionsCtrl', function (citation, Opportunities) {

    var ctrl = this;

    ctrl.citation = citation;

    Opportunities.findByCourtId(citation.court_id).then(function(results) {
       ctrl.opportunities = results;
    });
});