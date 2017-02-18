'use strict';

describe('PaymentOptionsCtrl', function () {

  var PaymentOptionsCtrl;
  var citationId = 5;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, toaster,$state,Citations,Errors,$httpBackend) {
      PaymentOptionsCtrl = $controller('PaymentOptionsCtrl', {
        Citations:Citations,
        citationId:citationId,
        $state:$state,
        toaster: toaster,
        Errors: Errors
      });
      $httpBackend.whenGET(/municipalities/).respond(200, '');
      $httpBackend.whenGET(/courts/).respond(200, '');
    });
  });

  it('initializes variables on init',function(){
    expect(PaymentOptionsCtrl.dob).toBeNull();
    expect(PaymentOptionsCtrl.dobValid).toBe(false);
    expect(PaymentOptionsCtrl.dobOver18).toBe(false);
  });

  it('goes to citationInfo page',inject(function(Citations,$rootScope,$q,$state){
    var deferred = $q.defer();
    deferred.resolve({citations:[{},{}]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn($state,'go');
    PaymentOptionsCtrl.dobValid = true;
    PaymentOptionsCtrl.dobOver18 = true;
    PaymentOptionsCtrl.dob = "myDate";

    PaymentOptionsCtrl.viewPaymentOptions();
    $rootScope.$apply();

    expect($state.go).toHaveBeenCalledWith('citationInfo',{citations:[{},{}]});
  }));

  it('throws error when no citations are found',inject(function(Errors,Citations,$rootScope,$q){
    var deferred = $q.defer();
    deferred.resolve({citations:[]});
    spyOn(Citations,'find').and.returnValue(deferred.promise);
    spyOn(Errors,'makeError');
    PaymentOptionsCtrl.dobValid = true;
    PaymentOptionsCtrl.dobOver18 = true;
    PaymentOptionsCtrl.dob = "myDate";

    var err = Errors.makeError(Errors.ERROR_CODE.BAD_REQUEST, "No tickets were found with the information provided.");
    expect(function(){PaymentOptionsCtrl.viewPaymentOptions(); $rootScope.$apply();}).toThrow(err);
  }));

  it('shows error when saving invalid date', inject(function(toaster) {
    spyOn(toaster, 'pop');
    PaymentOptionsCtrl.dobValid = false;
    PaymentOptionsCtrl.viewPaymentOptions();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Invalid date of birth.');
  }));

  it('shows error when saving date for under 18 year old', inject(function(toaster) {
    spyOn(toaster, 'pop');
    PaymentOptionsCtrl.dobValid = true;
    PaymentOptionsCtrl.dobOver18 = false;
    PaymentOptionsCtrl.viewPaymentOptions();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'Sorry, you must be at least 18 years old to use this site.');
  }));
});
