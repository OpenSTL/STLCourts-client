'use strict';

describe('HelpCtrl', function() {
  var HelpCtrl;

  var faqData = "mydata";
  var supportedMunicipalities = [
    {
      id:"ABC",
      name:"muniName",
      courts:[]
    }
  ];

  var pageMessage = jasmine.createSpyObj('pageMessage',['setMessage']);

  beforeEach(function() {
    module('yourStlCourts');
    inject(function($controller){
      HelpCtrl = $controller('HelpCtrl',{
        faqData:faqData,
        supportedMunicipalities: supportedMunicipalities,
        PageMessage:pageMessage
      });
    });
  });

  it('sets qaData on initialization',inject(function(){
    expect(HelpCtrl.faqData).toEqual(faqData);
  }));

  it('sets additionalData on initialization',function(){
    expect(HelpCtrl.additionalData).toEqual([{supportedMunicipalities:supportedMunicipalities}]);
  });

  it('sets pageMessage', inject(function () {
    expect(pageMessage.setMessage).toHaveBeenCalled();
  }));
});
