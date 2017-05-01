'use strict';

describe('Errors', function() {
  var Errors;

  beforeEach(function() {
    module('yourStlCourts');
    inject(function (_Errors_) {
      Errors = _Errors_;
    });
  });

  it('returns the correct error object',function(){
    var error = Errors.makeError(404,"Got an error.");
    expect(error.code).toEqual(404);
    expect(error.message).toEqual("Got an error.");
  });

  it('goes to error page when $stateChangeError is triggered',inject(function($rootScope,$state){
    spyOn($state,'go');
    var error = {code:404,message:"Got an error."};
    $rootScope.$broadcast("$stateChangeError","","","","",error);
    expect($state.go).toHaveBeenCalledWith('error',{error:error});
  }));

  it('goes to noCitationsFound page when customError is called with correct Error code', inject(function($rootScope, $state){
    spyOn($state,'go');
    var error = {code:Errors.ERROR_CODE.NO_CITATIONS_FOUND,message:""};
    $rootScope.$broadcast("stlCourtsCustomError",error);
    expect($state.go).toHaveBeenCalledWith('noCitationsFound');
  }));

  it('does nothing page when customError is called with incorrect Error code', inject(function($rootScope, $state){
    spyOn($state,'go');
    var error = {code:"InvalidError",message:""};
    $rootScope.$broadcast("stlCourtsCustomError",error);
    expect($state.go).toHaveBeenCalledTimes(0);
  }));

});
