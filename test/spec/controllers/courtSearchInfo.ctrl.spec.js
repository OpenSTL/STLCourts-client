'use strict';

describe('CourtSearchInfoCtrl', function() {
  var CourtSearchInfoCtrl;
  var sample_court;

  sample_court = {
    id: 9,
    latitutde: 38.7947506,
    longitude: -90.26261696,
    municipality: "Black Jack",
    address: "12500 Old Jamestown Road",
    city: "St. Louis",
    state: "MO",
    zip_code: 63033
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

  it('sets court on initialization',inject(function($rootScope){
    $rootScope.$apply();
    expect(CourtSearchInfoCtrl.courtInfo).toEqual(sample_court);
  }));

  it('calls and gets correct directions',(function(){
    //spyOn(CourtSearchInfoCtrl,'getCourtDirectionLink');
    var directionString = "https://maps.google.com?saddr=Current+Location&daddr=12500+Old Jamestown Road+St. Louis+MO+63033";
    //expect(CourtSearchInfoCtrl.getCourtDirectionLink).toHaveBeenCalled();//.and.toEqual(directionString);
    expect(CourtSearchInfoCtrl.courtDirectionLink).toEqual(directionString);

  }));

});
