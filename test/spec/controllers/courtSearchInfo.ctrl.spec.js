'use strict';

describe('CourtSearchInfoCtrl', function() {
  var CourtSearchInfoCtrl;
  var sample_court;
  var sample_muni;

  sample_court = {
    id: 9,
    latitutde: 38.7947506,
    longitude: -90.26261696,
    phone: "314.555.1212",
    website:"www.mywebsite.com",
    address: "12500 Old Jamestown Road",
    city: "St. Louis",
    state: "MO",
    zip_code: 63033
  };

  sample_muni = {
    id: 3,
    municipality: "someMuni",
    court_id: 42
  };



  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller,$state, $window,$httpBackend){

      CourtSearchInfoCtrl = $controller('CourtSearchInfoCtrl',{
        $state: $state,
        $window: $window,
        court:sample_court,
        municipality:sample_muni
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
        court: null,
        municipality:sample_muni
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

  it('sets municipality on initialization',inject(function(){
    expect(CourtSearchInfoCtrl.courtMunicipality).toEqual(sample_muni.municipality);
  }));

  it('sets blank municipality on initialization if municipality is null',inject(function(){
    inject(function($controller,$state, $window) {
      CourtSearchInfoCtrl = $controller('CourtSearchInfoCtrl', {
        $state: $state,
        $window: $window,
        court: sample_court,
        municipality:null
      });
    });
    expect(CourtSearchInfoCtrl.courtMunicipality).toEqual('');
  }));

  it('sets phone and website on initialization',inject(function(){
    expect(CourtSearchInfoCtrl.courtWebsite).toEqual(sample_court.website);
    expect(CourtSearchInfoCtrl.courtPhone).toEqual(sample_court.phone);
  }));

  it('gets correct directions',(function(){
    var directionString = "https://maps.google.com?saddr=Current+Location&daddr=12500+Old Jamestown Road+St. Louis+MO+63033";
    expect(CourtSearchInfoCtrl.courtDirectionLink).toEqual(directionString);
  }));

});
