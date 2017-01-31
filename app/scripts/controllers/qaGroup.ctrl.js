'use strict';
angular.module('yourStlCourts').controller('QaGroupCtrl', function () {
  var ctrl = this;
  ctrl.qaName = camelize(ctrl.groupTitle);

  ctrl.keywordFilter = function(qaItem){
      var found = false;
      if (ctrl.keywords){
        var keywordArray = ctrl.keywords.split(",");
        for (var keywordIndex in keywordArray){
          if (qaItem.keywords.indexOf(keywordArray[keywordIndex]) != -1){
            found = true;
            break;
          }
        }
      }else{
        found = true;
      }
      return found;
  };

  function camelize(str) {
    if (str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }else
      return "";
  }
});
