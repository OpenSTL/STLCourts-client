'use strict';

describe('HomeCtrl', function() {
  var HomeCtrl;
  var municipalities;
  var ticketFinder;

  var municipalityArray = [{
    id: 9,
    municipality_name: "Black Jack",
    court_id: 10
  }];

  municipalities = {
    municipalitiesMapNames: function(){
      return (municipalityArray);
    }
  };


  ticketFinder = {
    finderSelected: "SomeValue",
    TicketFinderToSelect:{
      NONE : 'NONE'
    }
  };

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller,$state,$httpBackend){
      HomeCtrl = $controller('HomeCtrl',{
        $state: $state,
        Municipalities:municipalities,
        TicketFinder:ticketFinder
      });

      $httpBackend.whenGET(/municipalities/).respond(200, '');
    });
  });

  it('sets municipalities on initialization',inject(function(){
    expect(HomeCtrl.municipalities).toEqual(municipalityArray);
  }));

  it('goes to court search results page',inject(function($state){
    spyOn($state,'go');
    HomeCtrl.selectedMunicipality = {id:10, municipality:"someMuni",court_id:5};
    HomeCtrl.municipalitySelected();
    expect($state.go).toHaveBeenCalledWith('courtSearchInfo',{courtId:HomeCtrl.selectedMunicipality.court_id});
  }));

  it('clears TicketFinderToSelect',inject(function(){
    HomeCtrl.clearTicketFinder();
    expect(ticketFinder.finderSelected).toEqual(ticketFinder.TicketFinderToSelect.NONE);
  }));

});
