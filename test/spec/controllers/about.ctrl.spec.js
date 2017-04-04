'use strict';

describe('AboutCtrl', function() {
  var AboutCtrl;

  var contact = {
    email:"happy"
  };

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller){
      AboutCtrl = $controller('AboutCtrl',{
        Contact:contact,
        textPhoneNumber:"someNumber"
      });

    });
  });

  it('sets email and textPhoneNumber on intitialization',inject(function(){
    expect(AboutCtrl.email).toEqual("happy");
    expect(AboutCtrl.textPhoneNumber).toEqual("someNumber");
  }));

});
