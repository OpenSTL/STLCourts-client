describe('PageMessage', function() {
  var PageMessage;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function(_PageMessage_) {
      PageMessage = _PageMessage_;
    });
  });

  it('initializes correctly',inject(function($rootScope) {
    expect(PageMessage.getMessage()).toEqual("");
    expect(PageMessage.getLink()).toEqual("");
    PageMessage.set("Hello","MyLink");
    PageMessage.start();
    $rootScope.$broadcast('$stateChangeStart');
    expect(PageMessage.getMessage()).toEqual("");
    expect(PageMessage.getLink()).toEqual("");
  }));

  it('sets and gets Messages', inject(function($rootScope) {
    spyOn($rootScope,'$broadcast');
    PageMessage.setMessage("Hello");
    expect(PageMessage.getMessage()).toEqual("Hello");
    expect($rootScope.$broadcast).toHaveBeenCalledWith('pageMessageUpdated');
    expect(PageMessage.hasMessage()).toBe(true);
  }));

  it('sets and gets Links and Messages', inject(function($rootScope) {
    spyOn($rootScope,'$broadcast');
    PageMessage.set("Bye","MyLink");
    expect(PageMessage.getMessage()).toEqual("Bye");
    expect($rootScope.$broadcast).toHaveBeenCalledWith('pageMessageUpdated');
    expect(PageMessage.hasMessage()).toBe(true);

    expect(PageMessage.getLink()).toEqual("MyLink");
    expect(PageMessage.hasLink()).toBe(true);
  }));


});
