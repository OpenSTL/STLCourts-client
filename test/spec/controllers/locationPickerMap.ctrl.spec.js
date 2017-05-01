'use strict';

describe('LocationPickerMapCtrl', function() {
  var LocationPickerMapCtrl;

  var fakeModal = {
    close: jasmine.createSpy('modalClose'),
    dismiss: jasmine.createSpy('modalDismiss')
  };

  var municipalities = [{
    id: 9, name: 'Black Jack'
  }];

  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, $rootScope, $http, leafletData) {
      LocationPickerMapCtrl = $controller('LocationPickerMapCtrl',{
        $scope: $rootScope.$new(),
        $http: $http,
        $uibModalInstance: fakeModal,
        municipalities: municipalities,
        leafletData: leafletData
      });
    });
  });

  it ('should initialize empty mousedOverMuni', inject(function(){
    expect(LocationPickerMapCtrl.mousedOverMunicipality).toBeNull();
  }));

  it('selects locations', function() {
    LocationPickerMapCtrl.selectedMunicipalities = [municipalities[0]];

    LocationPickerMapCtrl.selectLocation();

    expect(fakeModal.close).toHaveBeenCalledWith(LocationPickerMapCtrl.selectedMunicipalities);
  });

  it('cancels selecting locations', function() {
    LocationPickerMapCtrl.cancel();

    expect(fakeModal.dismiss).toHaveBeenCalled();
  });
});
