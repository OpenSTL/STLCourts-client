'use strict';

angular.module('yourStlCourts').controller('InfoCtrl', function ($anchorScroll,courts, $state,municipalities) {
  var ctrl = this;
  ctrl.citySearchGroups = [];
  ctrl.municipalities = municipalities;
  ctrl.selectedCitySearchGroup = null;
  ctrl.scrollTo = function(id){
    $anchorScroll(id);
  }

  ctrl.onCitySearchGroupSelected  = function(){
    //$state.go('courtSearchInfo', {courtId : ctrl.selectedCitySearchGroup.court.id});
  };

  ctrl.groupCourts = function(citySearchGroup) {
    return citySearchGroup.municipalityCourtCount > 1 ? citySearchGroup.municipalityName : undefined; //undefined causes no group to be made
  };

  function populateCitySearchGroups() {
    var groups = [];
    municipalities.forEach(function(municipality) {
      municipality.courts.forEach(function(courtId) {
        groups.push({
          municipalityName: municipality.name,
          municipalityCourtCount: municipality.courts.length,
          court: _.find(courts, {id: courtId})
        });
      });
    });

    ctrl.citySearchGroups = groups;
  }

  populateCitySearchGroups();
});
