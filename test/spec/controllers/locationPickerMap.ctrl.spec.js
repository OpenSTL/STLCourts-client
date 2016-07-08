'use strict';

describe('HomeCtrl', function() {
  var LocationPickerMapCtrl;
  var esriRegistry = {
    get: jasmine.createSpy('getMapSpy')
  };
  var municipalities = [
    { id: 1, municipality: 'Bellefontaine Neighbors'},
    { id: 2, municipality: 'Brentwood'},
    { id: 3, municipality: 'Valley Park'}
  ];
  var map = {
    on: jasmine.createSpy('mapOnSpy'),
    extent: {
      getWidth: function() {}
    },
    width: null,
    getLayer: function() {
      return {
        queryFeatures: function(query, callback) {
          callback();
        }
      };
    },
    graphicsLayerIds: [1]
  };
  var modalInstance;
  var scope;
  window.esri = {
    tasks : {
      Query: function() {}
    },
    geometry: {
      Extent: function(x1, y1, x2, y2, spatialRef) {}
    }
  };

  beforeEach(function() {
    module('yourStlCourts');

    modalInstance = {
      dismiss: jasmine.createSpy('dismiss spy'),
      close: jasmine.createSpy('close spy')
    };

    inject(function($controller, $rootScope, $q) {
      var esriMapDefer = $q.defer();
      esriMapDefer.resolve(map);
      esriRegistry.get.and.returnValue(esriMapDefer.promise);
      scope = $rootScope.$new();
      LocationPickerMapCtrl = $controller('LocationPickerMapCtrl', {
        $scope: scope,
        esriRegistry: esriRegistry,
        $uibModalInstance: modalInstance,
        municipalities: municipalities
      });
    });
  });

  it('initializes properties', inject(function() {
    scope.$apply();
    expect(LocationPickerMapCtrl.selectedMunicipalities).toEqual([]);
    expect(LocationPickerMapCtrl.map).toEqual({
      options: {
        basemap: 'streets',
        center: [-90.381801, 38.668909],
        zoom: 10,
        sliderStyle: 'small'
      }
    });
    expect(esriRegistry.get).toHaveBeenCalledWith('stlMap');
    expect(map.on).toHaveBeenCalledWith('click', jasmine.any(Function));
  }));

  it('closes modal when location is selected', function() {
    LocationPickerMapCtrl.selectLocation();

    expect(modalInstance.close).toHaveBeenCalledWith(LocationPickerMapCtrl.selectedMunicipalities);
  });

  it('cancels the location picker modal', function() {
    LocationPickerMapCtrl.cancel();

    expect(modalInstance.dismiss).toHaveBeenCalled();
  });

  it('updates selected municipalities when clicking on the map', function() {
    var event = {
      mapPoint : { x: 10, y: 10 }
    };
    spyOn(scope, '$apply');

    map.on.calls.first().args[1](event);

    expect(scope.$apply).toHaveBeenCalled();
  });
});
