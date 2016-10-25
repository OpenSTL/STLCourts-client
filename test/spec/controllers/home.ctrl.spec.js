'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;
  var municipalities;

  municipalities = [{
    id: 9,
    latitutde: 38.7947506,
    longitude: -90.26261696,
    municipality: "Black Jack",
    address: "12500 Old Jamestown Road",
    city: "St. Louis",
    state: "MO",
    zip_code: 63033
  }];




  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller,$state, $httpBackend){
      HomeCtrl = $controller('HomeCtrl',{
        $state: $state,
        municipalities:municipalities
      });

      $httpBackend.whenGET(/courts/).respond(200, '');
    });
  });

  it('sets municipalities on initialization',inject(function($rootScope){
    $rootScope.$apply();
    expect(HomeCtrl.municipalities).toEqual(municipalities);
  }));

  it('goes to court search results page',inject(function($state){
    spyOn($state,'go');
    HomeCtrl.selectedCourt = {id:10};
    HomeCtrl.courtSelected();
    expect($state.go).toHaveBeenCalledWith('courtSearchInfo',{courtId:HomeCtrl.selectedCourt.id});
  }));

});
