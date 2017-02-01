'use strict';

describe('FooterCtrl', function() {
  var FooterCtrl;

  var contact = {
    email:"happy"
  };

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller){
      FooterCtrl = $controller('FooterCtrl',{
        Contact:contact
      });

    });
  });

  it('sets copyRightYears on initialization',inject(function(){
    var currentYear = (new Date()).getFullYear();
    expect(FooterCtrl.copyRightYears()).toEqual("2016-"+currentYear);
  }));

  it('sets email on intitialization',inject(function(){
    expect(FooterCtrl.email).toEqual("happy");
  }));

});
