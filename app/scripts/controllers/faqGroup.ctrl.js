'use strict';
angular.module('yourStlCourts').controller('FaqGroupCtrl', function () {
  var ctrl = this;
  ctrl.faqName = camelize(ctrl.groupTitle);
  ctrl.autolinker = new Autolinker({stripPrefix:false});

  for(var faqSection in ctrl.sourceData){
    for(var faq in ctrl.sourceData[faqSection]){
      var fillIn = ctrl.sourceData[faqSection][faq]["fill-in"];
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
            ctrl.sourceData[faqSection][faq]["a"] += "<br><br>" + supportedMuniList;
          }
          break;
      }
    }
  }

  function findAdditionalData(dataLabel){
    if (ctrl.additionalData){
      var foundData = _.find(ctrl.additionalData,function(obj){
        return (dataLabel in obj);
      });
      return foundData[dataLabel];
    }else{
      return null;
    }
  }

  ctrl.keywordFilter = function(faqItem){
      var found = false;
      if (ctrl.keywords){
        var keywordArray = ctrl.keywords.split(",");
        for (var keywordIndex in keywordArray){
          if (faqItem.keywords.indexOf(keywordArray[keywordIndex]) != -1){
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
