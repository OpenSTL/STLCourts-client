'use strict';

describe('ErrorCtrl', function() {
  var ErrorCtrl;

  beforeEach(function() {
    module('yourStlCourts');
  });

  it('sets error  to value on initialization',inject(function(){
    inject(function($controller) {
      ErrorCtrl = $controller('ErrorCtrl', {
        error: {code: 404, message: "There was an error"}
      });
    });
    expect(ErrorCtrl.errorCode).toEqual(404);
    expect(ErrorCtrl.errorMessage).toEqual("There was an error");
  }));

  it('sets error to "" on initialization',inject(function(){
    inject(function($controller) {
      ErrorCtrl = $controller('ErrorCtrl', {
        error: null
      });
    });
    expect(ErrorCtrl.errorCode).toEqual("");
    expect(ErrorCtrl.errorMessage).toEqual("");
  }));
});
