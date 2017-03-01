'use strict';

angular.module('yourStlCourts').controller('CitationInfoCtrl', function (faqData,paymentData,$state, $window, citations, Courts, moment) {
  var ctrl = this;
  ctrl.faqData = faqData;
  ctrl.paymentData = paymentData;

  ctrl.selectCitation = function(citation){
    ctrl.selectedCitation = citation;
    Courts.findById(citation.court_id).then(function(court){
      ctrl.selectedCitation.court = court;
      ctrl.selectedCitation.courtDirectionLink = getCourtDirectionLink(ctrl.selectedCitation);
    });
  };

  ctrl.hasWarrant = function(){
    var hasWarrant = false;
    if (ctrl.selectedCitation && ctrl.hasViolations(ctrl.selectedCitation)){
     for(var violationIndex in ctrl.selectedCitation.violations){
       if (ctrl.selectedCitation.violations[violationIndex].warrant_status){
         hasWarrant = true;
         break;
       }
     }
    }
    return hasWarrant;
  };

  ctrl.paymentWebsite = function(){
    var websiteURL = "";
    if (ctrl.selectedCitation && ctrl.selectedCitation.court) {
      if (ctrl.selectedCitation.court.paymentSystem in ctrl.paymentData){
        websiteURL = ctrl.paymentData[ctrl.selectedCitation.court.paymentSystem];
      }
    }
    return websiteURL;
  };

  if(!citations) {
    $state.go('home');
  } else {
    ctrl.citations = citations;
    ctrl.selectedCitation = null;
    if(ctrl.citations.length === 1) {
      ctrl.selectCitation(ctrl.citations[0]);
    }
  }

  function getCourtDirectionLink(citation) {
    var address = citation.court.address.replace(' ', '+');
    var city = citation.court.city;
    var state = citation.court.state;
    var zip = citation.court.zip;
    var addressParts = [address, city, state, zip];
    return 'https://maps.google.com?saddr=Current+Location&daddr=' + addressParts.join('+');
  }

  ctrl.citationSelected = function(citation) {
    return citation === ctrl.selectedCitation;
  };

  ctrl.isMissingFineInfo = function(citation){
    var missing = false;
    citation.violations.forEach(function(violation){
      if(!violation.fine_amount) {
        missing = true;
      }
    });

    return missing;
  };

  ctrl.isMissingFeeInfo = function(citation){
    var missing = false;
    citation.violations.forEach(function(violation){
      if(!violation.court_cost) {
        missing = true;
      }
    });

    return missing;
  };

  ctrl.getFineTotal = function(citation) {
    var total = 0;
    citation.violations.forEach(function(violation){
      total += violation.fine_amount;
    });

    return total.toFixed(2);
  };

  ctrl.getFeeTotal = function(citation){
    var total = 0;
    citation.violations.forEach(function(violation){
      total += violation.court_cost;
    });

    return total.toFixed(2);
  };

  ctrl.hasViolations = function(citation) {
    return citation.violations.length > 0;
  };

  ctrl.goToCommunityService = function() {
    $state.go('communityService');
  };
  ctrl.goToPaymentOptions = function() {
    $state.go('paymentOptions', { citationId: ctrl.selectedCitation.id });
  };

  ctrl.printTicket = function () {
    $window.print();
  };

  ctrl.formatDate = function(dateObjToFormat){
    return moment(dateObjToFormat).format("MM/DD/YYYY");
  };

  ctrl.formatTime = function(dateTimeObjToFormat){
    return moment(dateTimeObjToFormat).format("hh:mm A");
  };

});
