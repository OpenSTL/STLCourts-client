'use strict';

angular.module('yourStlCourts').controller('FooterCtrl', function () {
  var ctrl = this;

  ctrl.copyRightYears = function(startingYear){
    var crStmt = startingYear;
    var today = new Date();
    var year = today.getFullYear();
    if (year > startingYear)
      crStmt = startingYear + "-" + year;
    return crStmt;
  }
});
