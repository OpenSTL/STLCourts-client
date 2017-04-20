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

  var citations = [
    citation, citationWithViolations
  ];

  var court = {
    id: 6,
    name: "courtName6",
    address: "123 Anystreet",
    city: "anyCity",
    state: "MO",
    zip: "12345"
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
        Courts: Courts,
        Session: session,
        courts: courts,
        moment: moment,
        $anchorScroll:$anchorScroll
      });
    });
  });

  it('correctly sets faqData', inject(function () {
    expect(CitationInfoCtrl.faqData).toEqual(faqData);
  }));

  it('calls $anchorScroll', function(){
    CitationInfoCtrl.scrollTo("someId");
    expect($anchorScroll).toHaveBeenCalledWith("someId");
  });

  it('correctly sets selected citation', inject(function (Courts, $q, $rootScope,Session) {
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation);
    $rootScope.$apply();

    expect(CitationInfoCtrl.selectedCitation).toEqual(citation);
    expect(Courts.findById).toHaveBeenCalledWith(citation.court_id);
    expect(CitationInfoCtrl.selectedCitation.court).toEqual(court);
    expect(CitationInfoCtrl.selectedCitation.courtDirectionLink).toEqual(expectedAddress);
  }));

  it('correctly sets selected paymentUrl', inject(function (Courts, $q, $rootScope,Session) {
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts, 'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation);
    $rootScope.$apply();

    expect(CitationInfoCtrl.paymentUrl).toEqual(municipality.paymentUrl);
  }));

  it('correctly sets selected citation when citation is null', inject(function () {
    CitationInfoCtrl.selectCitation(null);

    expect(CitationInfoCtrl.selectedCitation).toBe(null);
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
    expect(CitationInfoCtrl.formatDate(isoDate)).toEqual("");
  }));

  it('correctly sets citationCourtLocations', function(){
    expect(CitationInfoCtrl.citationCourtLocations[5]).toEqual("courtName5");
    expect(CitationInfoCtrl.citationCourtLocations[11]).toEqual("courtName11");
  });
});
