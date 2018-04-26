'use strict';

describe('CitationInfoCtrl', function () {
  var CitationInfoCtrl;
  var $anchorScroll = jasmine.createSpy("anchorScroll");

  var faqData = {
    "dataLabel": [
      {
        "q": "myQuestion",
        "a": "myAnswer",
        "keywords": []
      }]
  };

  var municipality = {
    id: 5,
    paymentUrl: "someUrl"
  };

  var municipalities = [municipality];

  var violation = {
    id: 10,
    warrant_status: true,
    can_pay_online:false
  };

  var violationWithFees = {
    id: 10,
    warrant_status: false,
    fine_amount: 1.0,
    court_cost: 2.0
  };

  var violationPayableOnline = {
    id:20,
    can_pay_online:true
  };

  var citation = {
    id: 2,
    court_id: 5,
    violations: [],
    municipality_id:5
  };

  var citationWithViolations = {
    id: 4,
    court_id: 11,
    violations: [violation],
    municipality_id:5
  };

  var citationWithViolationsAndFees = {
    id: 4,
    court_id: 11,
    violations: [violationWithFees],
    municipality_id:5
  };

  var citationPayableOnline = {
    id: 13,
    court_id:11,
    violations: [violationPayableOnline],
    municipality_id:5
  };

  var citationDuplicate1 = {
    id:20,
    court_id:11,
    violations: [violationPayableOnline],
    municipality_id:5,
    drivers_license_number: "1234",
    drivers_license_state: "MO"
  };

  var citationDuplicate2 = {
    id:21,
    court_id:11,
    violations: [violationPayableOnline],
    municipality_id:5,
    drivers_license_number: "1235",
    drivers_license_state: "MO"
  };

  var citationDuplicate3 = {
    id:21,
    court_id:11,
    violations: [violationPayableOnline],
    municipality_id:5,
    drivers_license_number: "1234",
    drivers_license_state: "MO"
  };

  var citationsDuplicate = [citationDuplicate1,citationDuplicate2];
  var citationsNonDuplicate = [citationDuplicate1,citationDuplicate3];

  var citations = [
    citation, citationWithViolations
  ];

  var court = {
    id: 6,
    name: "courtName6",
    address: "123 Anystreet",
    city: "anyCity",
    state: "MO",
    zip: "12345",
    zone_id: "America/Chicago"
  };

  var court2 = {
    id: 5,
    name: "courtName5"
  };

  var court3 = {
    id: 11,
    name: "courtName11"
  };

  var courts = [court,court2,court3];

  var session = {
    getLastSelectedCitation:function(){return null},
    setSelectedCitation:function(value){}
  };

  var expectedAddress = "https://maps.google.com?saddr=Current+Location&daddr=" + "123+Anystreet+anyCity+MO+12345";

  var legalRights = {
    openLegalRightsLink: jasmine.createSpy('openLegalRightsLink')
  };

  var dob = '02/18/1950';

  beforeEach(function () {
    module('yourStlCourts');

    inject(function ($rootScope, $httpBackend, $controller, $state, $window, Courts, moment) {
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
      $httpBackend.whenGET(/info/).respond(200, '');

      CitationInfoCtrl = $controller('CitationInfoCtrl', {
        faqData: faqData,
        municipalities: municipalities,
        $state: $state,
        $window: $window,
        citations: citations,
        dob: dob,
        Courts: Courts,
        Session: session,
        courts: courts,
        moment: moment,
        $anchorScroll:$anchorScroll,
        LegalRights: legalRights
      });
    });
  });

  it('correctly sets faqData', inject(function () {
    expect(CitationInfoCtrl.faqData).toEqual(faqData);
  }));

  it('correctly sets dob', function(){
    expect(CitationInfoCtrl.dob).toEqual(dob);
  });

  it('calls $anchorScroll', inject(function(Courts, $q, $rootScope){
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation,'someId');
    $rootScope.$apply();

    expect($anchorScroll).toHaveBeenCalledWith("someId");
  }));

  it('correctly sets selected citation', inject(function (Courts, $q, $rootScope) {
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation,'someId');
    $rootScope.$apply();

    expect(CitationInfoCtrl.selectedCitation).toEqual(citation);
    expect(Courts.findById).toHaveBeenCalledWith(citation.court_id);
    expect(CitationInfoCtrl.selectedCitation.court).toEqual(court);
    expect(CitationInfoCtrl.selectedCitation.courtDirectionLink).toEqual(expectedAddress);
  }));

  it('does not set selected citation when multiple and not stored in session', function () {
    expect(CitationInfoCtrl.selectedCitation).toBeNull();
  });

  it('correctly sets selected paymentUrl', inject(function (Courts, $q, $rootScope) {
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation,'someId');
    $rootScope.$apply();

    expect(CitationInfoCtrl.paymentUrl).toEqual(municipality.paymentUrl);
  }));

  it('correctly shows or hides payment button', inject(function(Courts, $q, $rootScope){
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citationWithViolations,'someId');
    CitationInfoCtrl.paymentUrl = "someUrl";
    $rootScope.$apply();
    expect (CitationInfoCtrl.showPaymentButton()).toBe(false);

    CitationInfoCtrl.selectCitation(citationPayableOnline,'someId');
    CitationInfoCtrl.paymentUrl = "someUrl";
    $rootScope.$apply();
    expect (CitationInfoCtrl.showPaymentButton()).toBe(true);

    CitationInfoCtrl.selectCitation(citationPayableOnline,'someId');
    CitationInfoCtrl.paymentUrl = "";
    $rootScope.$apply();
    expect (CitationInfoCtrl.showPaymentButton()).toBe(false);
  }));

  it('returns correct result for hasWarrant', inject(function () {
    CitationInfoCtrl.selectedCitation = citationWithViolations;
    spyOn(CitationInfoCtrl, 'hasViolations').and.returnValue(true);
    expect(CitationInfoCtrl.hasWarrant()).toBe(true);
  }));

  it('returns correct result for canPayOnline', inject(function () {
    CitationInfoCtrl.selectedCitation = citationWithViolations;
    expect(CitationInfoCtrl.canPayOnline(CitationInfoCtrl.selectedCitation)).toBe(false);
  }));

  it('goes to home page if no citations', inject(function ($controller, $state, $window, Courts) {
    spyOn($state, 'go');

    var CitationInfoCtrl = $controller('CitationInfoCtrl', {
      faqData: faqData,
      municipalities: municipalities,
      $state: $state,
      $window: $window,
      citations: null,
      dob: dob,
      Courts: Courts,
      courts: courts
    });

    expect($state.go).toHaveBeenCalledWith('home');

  }));

  it('initializes Citations correctly with Multiple citations', inject(function () {
    expect(CitationInfoCtrl.citations).toEqual(citations);
    expect(CitationInfoCtrl.selectedCitation).toBe(null);
  }));

  it('initializes Citations correctly with one citation', inject(function ($controller, $state, $window, Courts, $q, $rootScope) {
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl = $controller('CitationInfoCtrl', {
      faqData: faqData,
      municipalities: municipalities,
      $state: $state,
      $window: $window,
      citations: [citation],
      dob: dob,
      Courts: Courts,
      courts: courts
    });

    $rootScope.$apply();

    expect(CitationInfoCtrl.selectedCitation).toEqual(citation);
  }));

  it('correctly identifies if the citation is selected', inject(function () {
    CitationInfoCtrl.selectedCitation = citation;
    expect(CitationInfoCtrl.citationSelected(citation)).toBe(true);
  }));

  it('correctly identifies missing information', inject(function () {
    expect(CitationInfoCtrl.isMissingFineInfo(citationWithViolations)).toBe(true);
    expect(CitationInfoCtrl.isMissingFeeInfo(citationWithViolations)).toBe(true);
  }));

  it('correctly gets fine and fee totals', inject(function () {
    expect(CitationInfoCtrl.isMissingFineInfo(citationWithViolationsAndFees)).toBe(false);
    expect(CitationInfoCtrl.isMissingFeeInfo(citationWithViolationsAndFees)).toBe(false);
    expect(CitationInfoCtrl.getFineTotal(citationWithViolationsAndFees)).toBe("1.00");
    expect(CitationInfoCtrl.getFeeTotal(citationWithViolationsAndFees)).toBe("2.00");
  }));

  it('correctly identifies if there are violations', inject(function () {
    expect(CitationInfoCtrl.hasViolations(citationWithViolations)).toBe(true);
    expect(CitationInfoCtrl.hasViolations(citation)).toBe(false);
  }));

  it('goes to community service', inject(function ($state) {
    spyOn($state, 'go');
    CitationInfoCtrl.goToCommunityService();
    expect($state.go).toHaveBeenCalledWith('communityService');
  }));

  it('goes to prints ticket', inject(function ($window) {
    spyOn($window, 'print');
    CitationInfoCtrl.printTicket();
    expect($window.print).toHaveBeenCalled();
  }));

  it('correctlyFormatsDate', inject(function () {
    var isoDate = new Date("2016/02/16");
    expect(CitationInfoCtrl.formatDate(isoDate)).toEqual("02/16/2016");
    isoDate = null;
    expect(CitationInfoCtrl.formatDate(isoDate)).toEqual("Please contact the court for further information regarding your case.");
  }));

  it('correctlyFormatsTime', inject(function (Courts, $q, $rootScope) {
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation,'someId');
    $rootScope.$apply();

    var isoDate = new Date("2018-04-20T22:46:49-05:00");
    expect(CitationInfoCtrl.formatTime(isoDate)).toEqual("10:46 PM CDT");
    CitationInfoCtrl.selectedCitation.court.zone_id = "America/New_York";
    expect(CitationInfoCtrl.formatTime(isoDate)).toEqual("11:46 PM EDT");
    isoDate = null;
    expect(CitationInfoCtrl.formatTime(isoDate)).toEqual("");
  }));

  it('correctly sets citationCourtLocations', function(){
    expect(CitationInfoCtrl.citationCourtLocations[5]).toEqual("courtName5");
    expect(CitationInfoCtrl.citationCourtLocations[11]).toEqual("courtName11");
  });

  it('catches citations with different people', inject(function ($controller, $state, $window, Courts) {
    var CitationInfoCtrl = $controller('CitationInfoCtrl', {
      faqData: faqData,
      municipalities: municipalities,
      $state: $state,
      $window: $window,
      citations: citationsDuplicate,
      dob: dob,
      Courts: Courts,
      courts: courts
    });

    expect(_.size(CitationInfoCtrl.groupedCitations)).toBe(2);
    expect(CitationInfoCtrl.issueMultiplePeopleWarning()).toBe(true);
  }));

  it('catches citations with different people and does not return false positive', inject(function ($controller, $state, $window, Courts) {
    var CitationInfoCtrl = $controller('CitationInfoCtrl', {
      faqData: faqData,
      municipalities: municipalities,
      $state: $state,
      $window: $window,
      citations: citationsNonDuplicate,
      dob: dob,
      Courts: Courts,
      courts: courts
    });

    expect(_.size(CitationInfoCtrl.groupedCitations)).toBe(1);
    expect(CitationInfoCtrl.issueMultiplePeopleWarning()).toBe(false);
  }));

  it('calls LegalRights svc', inject(function($q, Courts, $rootScope){
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation,'someId');
    $rootScope.$apply();

    CitationInfoCtrl.openLegalRightsLink({});
    expect(legalRights.openLegalRightsLink).toHaveBeenCalledWith(court);
  }));
});
