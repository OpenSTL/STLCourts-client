'use strict';

describe('PaymentOptionsCtrl', function () {
  var PaymentOptionsCtrl;
  var citation;
  var opportunities;

  beforeEach(function() {
    module('yourStlCourts');

    citation = {
      id: 10,
      citation_number: 'M123456',
      court_id: 100
    };

    opportunities = [{
      id: 5,
      name: 'Pickup trash',
      courtId: 100
    }];

    inject(function($controller, Opportunities, $state, $uibModal, $q, $httpBackend) {
      var opportunitiesDefer = $q.defer();
      opportunitiesDefer.resolve(opportunities);
      spyOn(Opportunities, 'findByCourtId').and.returnValue(opportunitiesDefer.promise);

      PaymentOptionsCtrl = $controller('PaymentOptionsCtrl', {
        citation: citation,
        Opportunities: Opportunities,
        $state: $state,
        $uibModal: $uibModal
      });
      
      $httpBackend.whenGET(/(.*\.html)|(courts)/).respond(200, '');
    });
  });

  it('sets citation on initialization', inject(function($rootScope) {
    $rootScope.$apply();

    expect(PaymentOptionsCtrl.citation).toEqual(citation);
    expect(PaymentOptionsCtrl.opportunities).toEqual(opportunities);
  }));

  it('opens modal to open needs for an opportunity', inject(function($q, $uibModal, Opportunities, $rootScope) {
    spyOn($uibModal, 'open');
    var needsDefer = $q.defer();
    needsDefer.resolve([{id: 55, need: 'Need people!'}]);
    spyOn(Opportunities, 'findNeeds').and.returnValue(needsDefer.promise);

    PaymentOptionsCtrl.openNeeds(opportunities[0]);

    var expectedModalOptions = {
      templateUrl: 'views/opportunityDetails.html',
      controller: 'OpportunityDetailsCtrl as ctrl',
      size: 'md',
      resolve: {
        opportunity: jasmine.any(Function),
        needs: jasmine.any(Function)
      }
    };

    expect($uibModal.open).toHaveBeenCalledWith(expectedModalOptions);
    expect($uibModal.open.calls.first().args[0].resolve.opportunity()).toEqual(opportunities[0]);
    $uibModal.open.calls.first().args[0].resolve.needs(Opportunities).then(function(needs) {
      expect(needs).toEqual([{id: 55, need: 'Need people!'}]);
    });

    $rootScope.$apply();
  }));

  it('goes back to the ticket info page', inject(function($state) {
    spyOn($state, 'go');

    PaymentOptionsCtrl.goBack();

    expect($state.go).toHaveBeenCalledWith('citationInfo', {citations : [PaymentOptionsCtrl.citation]});
  }));
});
