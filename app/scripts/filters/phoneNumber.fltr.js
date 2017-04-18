'use strict';

angular.module('yourStlCourts').filter('phoneNumber', function () {
  return function(numberToFormat){
    var baseNumber = numberToFormat.replace(/(\D)/g,'').replace(/^1/,'');
    var m = baseNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? "":"("+m[1]+") "+m[2]+"-"+m[3];
  }
});
