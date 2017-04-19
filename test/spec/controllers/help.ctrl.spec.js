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


  beforeEach(function() {
    module('yourStlCourts');
    inject(function($controller){
      HelpCtrl = $controller('HelpCtrl',{
        faqData:faqData,
        supportedMunicipalities: supportedMunicipalities
      });
    });
  });

  it('sets qaData on initialization',inject(function(){
    expect(HelpCtrl.faqData).toEqual(faqData);
  }));

  it('sets additionalData on initialization',function(){
    expect(HelpCtrl.additionalData).toEqual([{supportedMunicipalities:supportedMunicipalities}]);
  });

});
