'use strict';

describe('SMSInstructionsCtrl', function() {
  var SMSInstructionsCtrl;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller){
      SMSInstructionsCtrl = $controller('SMSInstructionsCtrl',{
        smsPhoneNumber:"someNumber"
      });

    });
  });

  it('sets textPhoneNumber on intitialization',inject(function(){
    expect(AboutCtrl.textPhoneNumber).toEqual("someNumber");
  }));

});
