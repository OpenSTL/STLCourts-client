'use strict';

describe('HelpCtrl', function() {
  var HelpCtrl;

  var qadata = "mydata";

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller){
      HelpCtrl = $controller('HelpCtrl',{
        qaData:qadata
      });
    });
  });

  it('sets qaData on initialization',inject(function(){
    expect(HelpCtrl.qaData).toEqual(qadata);
  }));
});
