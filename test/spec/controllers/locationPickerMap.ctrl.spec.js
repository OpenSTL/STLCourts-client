'use strict';

describe('LocationPickerMapCtrl', function() {
  var LocationPickerMapCtrl;

  var fakeModal = {
    result: {
      then: function(confirmCallback, cancelCallback) {
        //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
        this.confirmCallBack = confirmCallback;
        this.cancelCallback = cancelCallback;
      }
    },
    close: function( item ) {
      //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
      this.result.confirmCallBack( item );
    },
    dismiss: function( type ) {
      //The user clicked cancel on the modal dialog, call the stored cancel callback
      this.result.cancelCallback( type );
    }
  };

  var municipalities = [{
    municipality_name:"someMuniName"
  }];


  var municipalityObj = {
      id: 10,
      name: "muniObjName"
  };


  beforeEach(function() {
    module('yourStlCourts');

    inject(function($controller, $rootScope, $http, leafletData) {
      LocationPickerMapCtrl = $controller('LocationPickerMapCtrl',{
        $scope:$rootScope.$new(),
        $http:$http,
        $uibModalInstance:fakeModal,
        municipalities:municipalities,
        leafletData:leafletData
      });
    });

  });

  it ('should initialize empty mousedOverMuni', inject(function(){
    expect(LocationPickerMapCtrl.mousedOverMunicipality).toEqual("");
  }));

  it('should add and remove municipalityObjs',inject(function(){
     LocationPickerMapCtrl.selectedMunicipalitiesObj.municipalityClicked(municipalityObj);
     expect(LocationPickerMapCtrl.selectedMunicipalitiesObj.municipalityObjs[0]).toEqual(municipalityObj);
     LocationPickerMapCtrl.selectedMunicipalitiesObj.removeMunicipalityObj(municipalityObj.id);
     expect(LocationPickerMapCtrl.selectedMunicipalitiesObj.municipalityObjs.length).toEqual(0);
  }));

  it('should return an array of names',inject(function(){
    LocationPickerMapCtrl.selectedMunicipalitiesObj.addMunicipalityObj(municipalityObj);
    var arrayOfNames = LocationPickerMapCtrl.selectedMunicipalitiesObj.getArrayOfNames();
    expect(arrayOfNames).toEqual([municipalityObj.name]);

  }));

  it('should search correctly for the id in the municipalityObjs Array',inject(function(){
    LocationPickerMapCtrl.selectedMunicipalitiesObj.addMunicipalityObj(municipalityObj);
    expect(LocationPickerMapCtrl.selectedMunicipalitiesObj.idInArray(10)).toBe(true);
    expect(LocationPickerMapCtrl.selectedMunicipalitiesObj.idInArray(11)).toBe(false);
  }));
  
});
