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
        Contact:contact
      });

    });
  });

  it('sets email on intitialization',inject(function(){
    expect(AboutCtrl.email).toEqual("happy");
  }));

});
