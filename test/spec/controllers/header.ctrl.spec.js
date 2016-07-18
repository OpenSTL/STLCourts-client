'use strict';

describe('HeaderCtrl', function () {

  var HeaderCtrl;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, Auth, $httpBackend) {
      HeaderCtrl = $controller('HeaderCtrl', {
        Auth: Auth
      });

      $httpBackend.whenGET(/.*\.html/).respond(200, '');
    });
  });

  it('sets up collapsed menu click handling on init', function() {
    var selector = $([
      $('<ul class="navbar-collapse"><li></li></ul>'),
      $('<a class="navbar-brand"></a>')
    ]);
    spyOn(window, '$').and.returnValue(selector);
    spyOn(selector, 'on');

    HeaderCtrl.$onInit();

    expect(selector.on).toHaveBeenCalledWith('click', jasmine.any(Function));
  });

  it('closes menu when navbar item or navbar brand is clicked', function() {
    var navBarCollapse = $('<ul class="navbar-collapse"><li></li></ul>');
    var selector = $([
      navBarCollapse.find('li'),
      $('<a class="navbar-brand"></a>')
    ]);
    var navBarCollapseSelector = $(navBarCollapse);
    spyOn(navBarCollapseSelector, 'collapse');
    var navBarToggleSelector = $('<div class="navbar-toggle"></div>');
    spyOn(navBarToggleSelector, 'addClass');
    spyOn(window, '$').and.returnValues(selector, navBarCollapseSelector, navBarToggleSelector);
    spyOn(selector, 'on');

    HeaderCtrl.$onInit();

    selector.on.calls.first().args[1]();

    expect(navBarCollapseSelector.collapse).toHaveBeenCalledWith('hide');
    expect(navBarToggleSelector.addClass).toHaveBeenCalledWith('collapsed');
  });

  it('indicates is authenticated', inject(function (Auth) {
    spyOn(Auth, 'isAuthenticated').and.returnValue(true);

    var isAuthenticated = HeaderCtrl.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  }));

  it('indicates is not authenticated', inject(function (Auth) {
    spyOn(Auth, 'isAuthenticated').and.returnValue(false);

    var isAuthenticated = HeaderCtrl.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  }));

  it('logs out', inject(function(Auth) {
    spyOn(Auth, 'logout');

    HeaderCtrl.logout();

    expect(Auth.logout).toHaveBeenCalled();
  }));

  it('gets the authenticated sponsor', inject(function(Auth) {
    var sponsor = {id: 2, name: 'Sponsor'};
    spyOn(Auth, 'getAuthenticatedSponsor').and.returnValue(sponsor);

    var authenticatedSponsor = HeaderCtrl.getAuthenticatedSponsor();

    expect(authenticatedSponsor).toEqual(sponsor);
    expect(Auth.getAuthenticatedSponsor).toHaveBeenCalled();
  }));
});
