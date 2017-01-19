'use strict';

describe('FooterCtrl', function() {
  var FooterCtrl;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller){
      FooterCtrl = $controller('FooterCtrl');

    });
  });

  it('sets copyRightYears on initialization',inject(function(){
    var currentYear = (new Date()).getFullYear();
    expect(FooterCtrl.copyRightYears(2016)).toEqual("2016-"+currentYear);
    expect(FooterCtrl.copyRightYears(currentYear)).toEqual(currentYear);
  }));

});
