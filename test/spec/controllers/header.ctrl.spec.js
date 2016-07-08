'use strict';

describe('HeaderCtrl', function () {

  var HeaderCtrl;

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, Auth) {
      HeaderCtrl = $controller('HeaderCtrl', {
        Auth: Auth
      });
    });
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
