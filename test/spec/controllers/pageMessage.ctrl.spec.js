'use strict';

describe('PageMessageCtrl', function() {
  var PageMessageCtrl;
  var pageMessage = jasmine.createSpyObj('pageMessage',['hasMessage','hasLink','getMessage','getLink']);

  beforeEach(function() {
    module('yourStlCourts');
    inject(function($controller,$state){
      PageMessageCtrl = $controller('PageMessageCtrl',{
        $state:$state,
        PageMessage:pageMessage
      });
    });
  });

  it('checks if there is a message',inject(function(){
    PageMessageCtrl.hasMessage();
    expect(pageMessage.hasMessage).toHaveBeenCalled();
  }));

  it('checks if there is a link',inject(function(){
    PageMessageCtrl.hasLink();
    expect(pageMessage.hasLink).toHaveBeenCalled();
  }));

  it('retrieves the message',inject(function(){
    PageMessageCtrl.message();
    expect(pageMessage.getMessage).toHaveBeenCalled();
  }));

  it('goes to the link',inject(function($state){
    spyOn($state,'go');
    spyOn(PageMessageCtrl,'hasLink').and.returnValue(true);
    pageMessage.getLink.and.returnValue("ABC");
    PageMessageCtrl.gotoLink();
    expect(PageMessageCtrl.hasLink).toHaveBeenCalled();
    expect(pageMessage.getLink).toHaveBeenCalled();
    expect($state.go).toHaveBeenCalledWith("ABC");
  }));

});
