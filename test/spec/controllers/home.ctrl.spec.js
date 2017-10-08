'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;
  var municipalities;
  var courts;
  var mockWindow;


  beforeEach(function() {
    module(function ($provide) {
      $provide.service('$window', function () {
        this.open = jasmine.createSpy('open');
        this.ga = jasmine.createSpy('ga');
      })
    });
  });

  beforeEach(function() {
    module('yourStlCourts');

    municipalities = [{id: "XYZ", name: 'Black Jack', courts: ["ABC"]}, {id: "MNO", name: 'Beverly Hills', courts: ["ABC", "DEF"]}];
    courts = [{id: "ABC", name: 'Black Jack Court'}, {id: "DEF", name: 'Beverly Hills Court'}];

    inject(function($controller, $state, $httpBackend, TicketFinder, $window){
      HomeCtrl = $controller('HomeCtrl',{
        $state: $state,
        $window: $window,
        municipalities: municipalities,
        courts: courts,
        TicketFinder: TicketFinder
      });

      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
    });
  });

  it('sets properties on initialization',inject(function(TicketFinder){
    expect(HomeCtrl.citySearchGroups).toEqual([
      {municipalityName: 'Black Jack', municipalityCourtCount: 1, court: courts[0]},
      {municipalityName: 'Beverly Hills', municipalityCourtCount: 2, court: courts[0]},
      {municipalityName: 'Beverly Hills', municipalityCourtCount: 2, court: courts[1]}
      ]);
    expect(HomeCtrl.municipalities).toEqual(municipalities);
    expect(HomeCtrl.finderSelected).toEqual(TicketFinder.TicketFinderToSelect.NONE);

  }));

  it('updates finderSelected',inject(function(TicketFinder){
    HomeCtrl.updateFinderSelected(TicketFinder.TicketFinderToSelect.DUMMY);

    expect(HomeCtrl.finderSelected).toEqual(TicketFinder.TicketFinderToSelect.DUMMY);
  }));

  it('goes to court search results page in a new window',inject(function($window, $state){
    spyOn($state,'href');
    HomeCtrl.selectedCitySearchGroup = { municipalityName:"someMuni", court: {id: "HIJ"} };

    HomeCtrl.onCitySearchGroupSelected();
    expect($state.href).toHaveBeenCalledWith('courtSearchInfo', {courtId : 'HIJ'});
    expect($window.open).toHaveBeenCalled();
  }));

  it('clears TicketFinderToSelect',inject(function(TicketFinder){
    HomeCtrl.clearTicketFinder();

    expect(HomeCtrl.finderSelected).toEqual(TicketFinder.TicketFinderToSelect.NONE);
  }));

  it('does not group courts with 1 court', function() {
    var groupResult = HomeCtrl.groupCourts(HomeCtrl.citySearchGroups[0]);

    expect(groupResult).toBeUndefined();
  });

  it('groups courts into city search groups with multiple courts', function() {
    var groupResult = HomeCtrl.groupCourts(HomeCtrl.citySearchGroups[1]);

    expect(groupResult).toEqual(HomeCtrl.citySearchGroups[1].municipalityName);
  });
});
