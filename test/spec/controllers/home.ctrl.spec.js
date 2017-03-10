'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;
  var municipalities;
  var courts;
  var pageMessage = jasmine.createSpyObj('pageMessage',['setMessage']);


  beforeEach(function() {
    module('yourStlCourts');

    municipalities = [{id: 9, name: 'Black Jack', courts: [100]}, {id: 8, name: 'Beverly Hills', courts: [100, 101]}];
    courts = [{id: 100, name: 'Black Jack Court'}, {id: 101, name: 'Beverly Hills Court'}];

    inject(function($controller, $state, $httpBackend, TicketFinder){
      HomeCtrl = $controller('HomeCtrl',{
        $state: $state,
        municipalities: municipalities,
        courts: courts,
        TicketFinder: TicketFinder,
        PageMessage:pageMessage
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
    expect(pageMessage.setMessage).toHaveBeenCalled();

  }));

  it('updates finderSelected',inject(function(TicketFinder){
    HomeCtrl.updateFinderSelected(TicketFinder.TicketFinderToSelect.DUMMY);

    expect(HomeCtrl.finderSelected).toEqual(TicketFinder.TicketFinderToSelect.DUMMY);
  }));

  it('goes to court search results page',inject(function($state){
    spyOn($state,'go');
    HomeCtrl.selectedCitySearchGroup = { municipalityName:"someMuni", court: {id: 5} };

    HomeCtrl.onCitySearchGroupSelected();

    expect($state.go).toHaveBeenCalledWith('courtSearchInfo',{courtId:HomeCtrl.selectedCitySearchGroup.court.id});
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
