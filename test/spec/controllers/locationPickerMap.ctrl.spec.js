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
        toaster: toaster,
        MAX_SEARCH_MUNICIPALITIES:5
      });
    });
  });

  it ('should initialize empty mousedOverMuni', inject(function(){
    expect(LocationPickerMapCtrl.mousedOverMunicipality).toBeNull();
  }));

  it ('It does not close dialog if form is invalid', inject(function(toaster){
    LocationPickerMapCtrl.selectLocation({$valid:false});
    expect(fakeModal.close.calls.count()).toEqual(0);
  }));

  it('selects locations', function() {
    LocationPickerMapCtrl.selectedMunicipalities = [municipalities[0]];

    LocationPickerMapCtrl.selectLocation({$valid:true});

    expect(fakeModal.close).toHaveBeenCalledWith(LocationPickerMapCtrl.selectedMunicipalities);
  });

  it('cancels selecting locations', function() {
    LocationPickerMapCtrl.cancel();

    expect(fakeModal.dismiss).toHaveBeenCalled();
  });
});
