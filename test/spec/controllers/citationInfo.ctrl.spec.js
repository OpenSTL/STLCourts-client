'use strict';

describe('CitationInfoCtrl', function() {
  var CitationInfoCtrl;

  var qaData = {
    "dataLabel":[
      {"q":"myQuestion",
        "a":"myAnswer",
        "keywords":[]}]};

  var paymentData = {
    "apple":"banana",
    "pear":"peach"
  };

  var violation = {
    id:10,
    warrant_status:true
  };

  var violationWithFees = {
    id:10,
    warrant_status:false,
    fine_amount:1.0,
    court_cost:2.0
  };

  var citation = {
                    id:2,
                    court_id:5,
                    violations:[]
                  };

  var citationWithViolations = {
      id:4,
      court_id:11,
      violations:[violation]
    };

  var citationWithViolationsAndFees = {
    id:4,
    court_id:11,
    violations:[violationWithFees]
  };

  var citations = [
    citation,citationWithViolations
  ];

  var court = {
      id:6,
      address: "123 Anystreet",
      city: "anyCity",
      state: "MO",
      zip_code: "12345"
  };

  var expectedAddress = "https://maps.google.com?saddr=Current+Location&daddr=" + "123+Anystreet+anyCity+MO+12345";

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($rootScope,$httpBackend, $controller,$state,$window,Courts){
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      CitationInfoCtrl = $controller('CitationInfoCtrl',{
        qaData:qaData,
        paymentData:paymentData,
        $state:$state,
        $window:$window,
        citations:citations,
        Courts:Courts
      });
    });

  });

  it('correctly sets qaData and paymentData',inject(function(){
    expect(CitationInfoCtrl.qaData).toEqual(qaData);
    expect(CitationInfoCtrl.paymentData).toEqual(paymentData);
  }));

  it('correctly sets selected citation',inject(function(Courts,$q,$rootScope){
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts,'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl.selectCitation(citation);
    $rootScope.$apply();
    expect(CitationInfoCtrl.selectedCitation).toEqual(citation);
    expect(Courts.findById).toHaveBeenCalledWith(citation.court_id);
    expect(CitationInfoCtrl.selectedCitation.court).toEqual(court);
    expect(CitationInfoCtrl.selectedCitation.courtDirectionLink).toEqual(expectedAddress);
  }));

  it('returns correct result for hasWarrant',inject(function(){
    CitationInfoCtrl.selectedCitation = citationWithViolations;
    spyOn(CitationInfoCtrl,'hasViolations').and.returnValue(true);
    expect(CitationInfoCtrl.hasWarrant()).toBe(true);
  }));

  it('correctly returns paymentWebsite',inject(function(){
    CitationInfoCtrl.selectedCitation = {
      id:5,
      court:{
        id:6,
        payment_system:"pear"
      }
    };
    expect(CitationInfoCtrl.paymentWebsite()).toEqual("peach");
  }));

  it('goes to home page if no citations',inject(function($controller,$state,$window,Courts){
    spyOn($state,'go');

    var CitationInfoCtrl = $controller('CitationInfoCtrl',{
      qaData:qaData,
      paymentData:paymentData,
      $state:$state,
      $window:$window,
      citations:null,
      Courts:Courts
    });

    expect($state.go).toHaveBeenCalledWith('home');

  }));

  it('initializes Citations correctly with Multiple citations',inject(function(){
    expect(CitationInfoCtrl.citations).toEqual(citations);
    expect(CitationInfoCtrl.selectedCitation).toBe(null);
  }));

  it('initializes Citations correctly with one citation',inject(function($controller,$state,$window,Courts,$q,$rootScope){
    var deferred = $q.defer();
    deferred.resolve(court);
    spyOn(Courts,'findById').and.returnValue(deferred.promise);

    CitationInfoCtrl = $controller('CitationInfoCtrl',{
      qaData:qaData,
      paymentData:paymentData,
      $state:$state,
      $window:$window,
      citations:[citation],
      Courts:Courts
    });

    $rootScope.$apply();
    expect(CitationInfoCtrl.selectedCitation).toEqual(citation);
  }));

  it('correctly identifies if the citation is selected',inject(function(){
    CitationInfoCtrl.selectedCitation = citation;
    expect(CitationInfoCtrl.citationSelected(citation)).toBe(true);
  }));

  it('correctly identifies missing information',inject(function(){
    expect(CitationInfoCtrl.isMissingFineInfo(citationWithViolations)).toBe(true);
    expect(CitationInfoCtrl.isMissingFeeInfo(citationWithViolations)).toBe(true);
  }));

  it('correctly gets fine and fee totals',inject(function(){
    expect(CitationInfoCtrl.isMissingFineInfo(citationWithViolationsAndFees)).toBe(false);
    expect(CitationInfoCtrl.isMissingFeeInfo(citationWithViolationsAndFees)).toBe(false);
    expect(CitationInfoCtrl.getFineTotal(citationWithViolationsAndFees)).toBe("1.00");
    expect(CitationInfoCtrl.getFeeTotal(citationWithViolationsAndFees)).toBe("2.00");
  }));

  it('correctly identifies if there are violations',inject(function(){
    expect(CitationInfoCtrl.hasViolations(citationWithViolations)).toBe(true);
    expect(CitationInfoCtrl.hasViolations(citation)).toBe(false);
  }));

  it('goes to community service',inject(function($state){
    spyOn($state,'go');
    CitationInfoCtrl.goToCommunityService();
    expect($state.go).toHaveBeenCalledWith('communityService');
  }));

  it('goes to payment options',inject(function($state){
    spyOn($state,'go');
    CitationInfoCtrl.selectedCitation = citation;
    CitationInfoCtrl.goToPaymentOptions();
    expect($state.go).toHaveBeenCalledWith('paymentOptions',{citationId:2});
  }));

  it('goes to prints ticket',inject(function($window){
    spyOn($window,'print');
    CitationInfoCtrl.printTicket();
    expect($window.print).toHaveBeenCalled();
  }));

  it('correctlyFormatsDate',inject(function(){
    var isoDate = "2016/02/16";
    expect(CitationInfoCtrl.formatDate(isoDate)).toEqual("02/16/2016");
    isoDate = null;
    expect(CitationInfoCtrl.formatDate(isoDate)).toEqual(null);
  }));

});
