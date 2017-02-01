'use strict';

describe('HelpCtrl', function() {
  var HelpCtrl;

  var faqData = "mydata";

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller){
      HelpCtrl = $controller('HelpCtrl',{
        faqData:faqData
      });
    });
  });

  it('sets qaData on initialization',inject(function(){
    expect(HelpCtrl.faqData).toEqual(faqData);
  }));
});
