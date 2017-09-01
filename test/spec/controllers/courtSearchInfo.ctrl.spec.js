'use strict';

describe('CourtSearchInfoCtrl', function() {
  var CourtSearchInfoCtrl;
  var sample_court;
  var sample_muni;

  sample_court = {
    id: 9,
    name:"mySampleCourt",
    latitutde: 38.7947506,
    longitude: -90.26261696,
    phone: "314.555.1212",
    extension: "1",
    website:"www.mywebsite.com",
    address: "12500 Old Jamestown Road",
    city: "St. Louis",
    state: "MO",
    zip: 63033
  };

  sample_muni = {
    id: 3,
    name: "someMuni"
  };



  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller,$state, $window,$httpBackend){

      CourtSearchInfoCtrl = $controller('CourtSearchInfoCtrl',{
        $state: $state,
        $window: $window,
        court:sample_court
      });

      $httpBackend.whenGET(/courts/).respond(200, '');
    });
  });

  it('goes back to home page if court is null',inject(function($state){
    spyOn($state,'go');
    inject(function($controller,$state, $window) {
      CourtSearchInfoCtrl = $controller('CourtSearchInfoCtrl', {
        $state: $state,
        $window: $window,
        court: null
      });
    });
    expect($state.go).toHaveBeenCalledWith('home');
  }));

  it('prints if printCourtInfo is called',inject(function($window){
    spyOn($window,'print');
    CourtSearchInfoCtrl.printCourtInfo();
    expect($window.print).toHaveBeenCalled();
  }));

  it('sets court on initialization',inject(function(){
    expect(CourtSearchInfoCtrl.courtInfo).toEqual(sample_court);
  }));

  it('sets phone,extension,courtName, and website on initialization',inject(function(){
    expect(CourtSearchInfoCtrl.courtName).toEqual(sample_court.name);
    expect(CourtSearchInfoCtrl.courtWebsite).toEqual(sample_court.website);
    expect(CourtSearchInfoCtrl.courtPhone).toEqual(sample_court.phone);
    expect(CourtSearchInfoCtrl.phoneExtension).toEqual(sample_court.extension);
  }));

  it('gets correct directions',(function(){
    var directionString = "https://maps.google.com?saddr=Current+Location&daddr=12500+Old Jamestown Road+St. Louis+MO+63033";
    expect(CourtSearchInfoCtrl.courtDirectionLink).toEqual(directionString);
  }));

  it('opens Legal Rights Link', inject(function($controller, $state){
    var fakeWindow = {
      open: jasmine.createSpy('windowOpen')
    };

    var CourtSearchInfoCtrl = $controller('CourtSearchInfoCtrl',{
      $state: $state,
      $window: fakeWindow,
      court:sample_court
    });

    CourtSearchInfoCtrl.courtInfo.rights_type = "PDF";
    CourtSearchInfoCtrl.courtInfo.rights_value = "me.pdf";
    CourtSearchInfoCtrl.openLegalRightsLink();
    expect(fakeWindow.open).toHaveBeenCalledWith("/data/court_rights/me.pdf");

    CourtSearchInfoCtrl.courtInfo.rights_type = "PDF";
    CourtSearchInfoCtrl.courtInfo.rights_value = "";
    CourtSearchInfoCtrl.openLegalRightsLink();
    expect(fakeWindow.open).toHaveBeenCalledWith("/data/court_rights/Default.pdf");

    CourtSearchInfoCtrl.courtInfo.rights_type = "LINK";
    CourtSearchInfoCtrl.courtInfo.rights_value = "someLink";
    CourtSearchInfoCtrl.openLegalRightsLink();
    expect(fakeWindow.open).toHaveBeenCalledWith("someLink");
  }));

});
