describe('LegalRights', function() {
  var LegalRights;
  var mockWindow;

  beforeEach(function() {
    module(function ($provide) {
      $provide.service('$window', function () {
        this.open = jasmine.createSpy('open');
        this.ga = jasmine.createSpy('ga');
      })
    });
  });

  beforeEach(module('yourStlCourts'));

  beforeEach(inject(function(_LegalRights_, $window){
    LegalRights = _LegalRights_;
    mockWindow = $window;
  }));

  it ('opens a new window with the correct link', inject(function(){
    var court = {
      rights_type: "PDF",
      rights_value: "me.pdf"
    };

    LegalRights.openLegalRightsLink(court);
    expect(mockWindow.open).toHaveBeenCalledWith("/data/court_rights/me.pdf","_blank");

    court = {
      rights_type: "PDF",
      rights_value: ""
    };

    LegalRights.openLegalRightsLink(court);
    expect(mockWindow.open).toHaveBeenCalledWith("/data/court_rights/Default.pdf","_blank");

    court = {
      rights_type: "LINK",
      rights_value: "someLink"
    };

    LegalRights.openLegalRightsLink(court);
    expect(mockWindow.open).toHaveBeenCalledWith("someLink","_blank");

  }));
});
