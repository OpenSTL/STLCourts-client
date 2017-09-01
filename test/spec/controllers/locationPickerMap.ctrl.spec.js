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

    inject(function($controller, $rootScope, $http, leafletData,toaster) {
      LocationPickerMapCtrl = $controller('LocationPickerMapCtrl',{
        $scope: $rootScope.$new(),
        $http: $http,
        $uibModalInstance: fakeModal,
        municipalities: municipalities,
        leafletData: leafletData,
        toaster: toaster
      });
    });
  });

  it ('should initialize empty mousedOverMuni', inject(function(){
    expect(LocationPickerMapCtrl.mousedOverMunicipality).toBeNull();
  }));

  it ('toasts an error message instead of selecting locations if more than 5 municipalities are selected', inject(function(toaster){
    spyOn(toaster,'pop');
    LocationPickerMapCtrl.selectedMunicipalities = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}];
    LocationPickerMapCtrl.selectLocation();
    expect(toaster.pop).toHaveBeenCalledWith('error', 'A maximum of 5 municipalities can be selected at a time.');
    expect(fakeModal.close.calls.count()).toEqual(0);
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
