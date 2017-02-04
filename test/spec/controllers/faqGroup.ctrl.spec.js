'use strict';

describe('FaqGroupCtrl', function() {
  var FaqGroupCtrl;

  var faqItemFound = {keywords:["watch"]};
  var faqItemNotFound = {keywords:[]};

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($rootScope,$httpBackend, $componentController){
      $httpBackend.whenGET(/views\/faqGroup.html/).respond(200, '');
      FaqGroupCtrl = $componentController('faqGroup',{$scope:$rootScope.$new()},{
        groupTitle:"Home Alone",
        keywords:"watch,me"
      });
    });

  });

  it('correctly sets groupTitle and faqName',inject(function(){
    expect(FaqGroupCtrl.groupTitle).toBeDefined();
    expect(FaqGroupCtrl.groupTitle).toEqual("Home Alone");
    expect(FaqGroupCtrl.faqName).toEqual("homeAlone");
  }));

  it('correctly finds keywords',inject(function(){
    expect(FaqGroupCtrl.keywords).toEqual("watch,me");
    var found = FaqGroupCtrl.keywordFilter(faqItemFound);
    expect(found).toBe(true);
    found = FaqGroupCtrl.keywordFilter(faqItemNotFound);
    expect(found).toBe(false);
    FaqGroupCtrl.keywords = "";
    found = FaqGroupCtrl.keywordFilter(faqItemNotFound);
    expect(found).toBe(true);
  }));

  it('correctly returns an empty faqName',inject(function($rootScope, $componentController){
    FaqGroupCtrl = $componentController('faqGroup',{$scope:$rootScope.$new()},{
      groupTitle:""
    });
    expect(FaqGroupCtrl.faqName).toEqual("");
  }));
});
