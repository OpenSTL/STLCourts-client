'use strict';
angular.module('yourStlCourts').controller('FaqGroupCtrl', function ($scope) {
  var ctrl = this;
  ctrl.faqName = camelize($scope.groupTitle);
  ctrl.autolinker = new Autolinker({stripPrefix:false});
  var rowCount = 0;

  ctrl.addTopMargin = function(index){
    if ($scope.noTitle !== 'true'){
      return true;
    }else{
      if (rowWillBeFiltered(index)) {
        rowCount++;
        if (rowCount == 1){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
  };

  function rowWillBeFiltered(index){
    return (ctrl.keywordFilter(index) || ctrl.keywordFilter(index+1));
  }

  for(var faqSection in $scope.sourceData){
    for(var faq in $scope.sourceData[faqSection]){
      var fillIn = $scope.sourceData[faqSection][faq]["fill-in"];
      switch(fillIn){
        case "supportedMunicipalities":
          var additionalData = findAdditionalData("supportedMunicipalities");
          if (additionalData) {
            var supportedMuniList = "Participating municipalities: ";
            for (var municipalityCount = 0; municipalityCount < additionalData.length; municipalityCount++) {
              if (municipalityCount > 0) {
                supportedMuniList += ", ";
              }
              supportedMuniList += additionalData[municipalityCount].name;
            }
            $scope.sourceData[faqSection][faq]["a"] += "<br><br>" + supportedMuniList;
          }
          break;
      }
    }
  }

  function findAdditionalData(dataLabel){
    if ($scope.additionalData){
      var foundData = _.find($scope.additionalData,function(obj){
        return (dataLabel in obj);
      });
      return foundData[dataLabel];
    }else{
      return null;
    }
  }

  ctrl.keywordFilter = function(faqIndex){
      var found = false;
      if ($scope.keywords){
        var keywordArray = $scope.keywords.split(",");
        for (var keywordIndex in keywordArray){
          if ($scope.sourceData[$scope.arrayName][faqIndex].keywords.indexOf(keywordArray[keywordIndex]) != -1){
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
