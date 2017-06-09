'use strict';

angular.module('yourStlCourts').controller('CitationInfoCtrl', function (faqData,$state, $window, citations,municipalities,courts,Courts,Session,moment,$anchorScroll) {
  var ctrl = this;
  var PLACEHOLDER_DL_NUM = "NO_DL_NUM";

  ctrl.faqData = faqData;
  ctrl.selectedCitation = null;
  ctrl.paymentUrl = "";
  ctrl.citationCourtLocations = {};
  ctrl.groupedCitationCount = 0;

  ctrl.groupCitationsByDL = function(){
    var dlNum = "";
    var dlState = "";
    var groupedCitations = {};

    citations.forEach(function(citation){
      dlNum = citation.drivers_license_number;
      dlState = citation.drivers_license_state;
      if (dlNum === ""){
        //in the event the defendant does not have a DL Num assign one so the object has a key
        dlNum = PLACEHOLDER_DL_NUM;
      }
      if (!groupedCitations[dlNum+dlState]){
        groupedCitations[dlNum+dlState] = [];
      }
      groupedCitations[dlNum+dlState].push(citation);
    });

    ctrl.groupedCitationCount = 0;
    for(var groupedCitation in groupedCitations){
      ctrl.groupedCitationCount++;
    }
    return groupedCitations;
  };

  ctrl.issueMultiplePeopleWarning = function(){

    return (ctrl.groupedCitationCount > 1);
  };

  ctrl.selectCitation = function(citation,idToScrollTo){
    ctrl.selectedCitation = citation;
    Session.setSelectedCitation(ctrl.selectedCitation);
    if (ctrl.selectedCitation) {
      Courts.findById(citation.court_id).then(function (court) {
        ctrl.selectedCitation.court = court;
        ctrl.selectedCitation.courtDirectionLink = getCourtDirectionLink(ctrl.selectedCitation);
      });
      for(var municipality in municipalities){
        if (ctrl.selectedCitation.municipality_id == municipalities[municipality].id){
          ctrl.paymentUrl = municipalities[municipality].paymentUrl;
          break;
        }
      }
      if (citations.length > 1) {
        $anchorScroll(idToScrollTo);
      }
    }
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

  if(!citations) {
    $state.go('home');
  } else {
    ctrl.citations = citations;
    ctrl.groupedCitations = ctrl.groupCitationsByDL();
    for(var citationCount = 0; citationCount < citations.length; citationCount++){
      var courtId = citations[citationCount].court_id;
      var foundCourt = _.find(courts, {id: courtId});
      ctrl.citationCourtLocations[courtId] = foundCourt.name;
    }
    if(ctrl.citations.length === 1) {
      ctrl.selectCitation(ctrl.citations[0]);
    }else{
      ctrl.selectCitation(Session.getLastSelectedCitation());
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

  ctrl.canPayOnline = function(citation){
    var canPayOnline = true;
    citation.violations.forEach(function(violation){
      if (!violation.can_pay_online)
        canPayOnline = false;
    });

    return canPayOnline;
  };

  ctrl.showPaymentButton = function(){
    if (ctrl.selectedCitation) {
      return (ctrl.paymentUrl != '' && ctrl.canPayOnline(ctrl.selectedCitation));
    }else{
      return false;
    }
  };

  ctrl.hasViolations = function(citation) {
    return citation.violations.length > 0;
  };

  ctrl.goToCommunityService = function() {
    $state.go('communityService');
  };

  ctrl.printTicket = function () {
    $window.print();
  };

  ctrl.formatDate = function(dateObjToFormat){
    if (dateObjToFormat) {
      return moment(dateObjToFormat).format("MM/DD/YYYY");
    }else {
      return "";
    }
  };

  ctrl.formatTime = function(dateTimeObjToFormat) {
    if (dateTimeObjToFormat){
      return moment(dateTimeObjToFormat).format("hh:mm A");
    }else{
      return "";
    }
  };

});
