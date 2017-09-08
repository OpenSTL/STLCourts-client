'use strict';

angular.module('yourStlCourts').factory('LegalRights', function ($window) {
  function openLegalRightsLink(court){
    $window.open(legalRightsLink(court));
  }

  function legalRightsLink(court) {
    var rightsLink = "";
    if (court.rights_type == "PDF"){
      if (court.rights_value) {
        rightsLink += "/data/court_rights/" + court.rights_value;
      }else{
        rightsLink += "/data/court_rights/Default.pdf";
      }
    }else{
      rightsLink = court.rights_value;
    }

    return rightsLink;
  }

  var svc = {
    openLegalRightsLink: openLegalRightsLink
  };

  return svc;
});
