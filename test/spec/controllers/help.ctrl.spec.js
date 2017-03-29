'use strict';

describe('HelpCtrl', function() {
  var HelpCtrl;

  var faqData = "mydata";
  var pageMessage = jasmine.createSpyObj('pageMessage',['setMessage']);

  beforeEach(function() {
    module('yourStlCourts');
    inject(function($controller){
      HelpCtrl = $controller('HelpCtrl',{
        faqData:faqData,
        PageMessage:pageMessage
      });
    });
  });

  it('sets qaData on initialization',inject(function(){
    expect(HelpCtrl.faqData).toEqual(faqData);
  }));

  it('sets pageMessage', inject(function () {
    expect(pageMessage.setMessage).toHaveBeenCalled();
  }));
});
