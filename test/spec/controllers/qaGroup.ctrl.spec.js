'use strict';

describe('QaGroupCtrl', function() {
  var QaGroupCtrl;

  var qaItemFound = {keywords:["watch"]};
  var qaItemNotFound = {keywords:[]};

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($rootScope,$httpBackend, $componentController){
      $httpBackend.whenGET(/views\/qaGroup.html/).respond(200, '');
      QaGroupCtrl = $componentController('qaGroup',{$scope:$rootScope.$new()},{
        groupTitle:"Home Alone",
        keywords:"watch,me"
      });
    });

  });

  it('correctly sets groupTitle and qaName',inject(function(){
    expect(QaGroupCtrl.groupTitle).toBeDefined();
    expect(QaGroupCtrl.groupTitle).toEqual("Home Alone");
    expect(QaGroupCtrl.qaName).toEqual("homeAlone");
  }));

  it('correctly finds keywords',inject(function(){
    expect(QaGroupCtrl.keywords).toEqual("watch,me");
    var found = QaGroupCtrl.keywordFilter(qaItemFound);
    expect(found).toBe(true);
    found = QaGroupCtrl.keywordFilter(qaItemNotFound);
    expect(found).toBe(false);
    QaGroupCtrl.keywords = "";
    found = QaGroupCtrl.keywordFilter(qaItemNotFound);
    expect(found).toBe(true);
  }));

  it('correctly returns an empty qaName',inject(function($rootScope, $componentController){
    QaGroupCtrl = $componentController('qaGroup',{$scope:$rootScope.$new()},{
      groupTitle:""
    });
    expect(QaGroupCtrl.qaName).toEqual("");
  }));
});
