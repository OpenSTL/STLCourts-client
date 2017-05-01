'use strict';

angular.module('yourStlCourts').factory('PageMessage', function ($rootScope, SMSInfo) {
  var message = "";
  var link = "";
  var pageMessage = "";
  var stateLink = "";
  var hidden = false;

  function setPageMessage(messageHtml){
    pageMessage = messageHtml;
  }

  function set(messageHtml,stateToGoTo){
    setPageMessage(messageHtml);
    stateLink = stateToGoTo;
  }

  function setSMSInformationalMessage(){
    SMSInfo.getPhoneNumber().then(function(phoneNumber){
      var message = 'Get Court Date Reminders on your<br>phone. Text "HELP" to <b>'+phoneNumber+'</b>';
      setPageMessage(message);
    });
  }

  function hide(){
    hidden = true;
  }

  function getMessage(){
    if (pageMessage) {
      return pageMessage;
    }else{
      return message;
    }
  }

  function getLink(){
    if (stateLink) {
      return stateLink;
    }else{
      return link;
    }
  }

  function hasMessage(){
    if (hidden){
      return false;
    }else {
      return !!message || !!pageMessage;
    }
  }

  function hasLink(){
    return !!link || !!stateLink;
  }

  function start(defaultMessage,defaultLink){
    if (defaultMessage){
      message = defaultMessage;
    }
    if (defaultLink){
      link = defaultLink;
    }
    $rootScope.$on('$stateChangeStart', function () {
      hidden = false;
      setPageMessage("");
      stateLink = "";
    });
  }

  var svc = {
    start: start,
    message: setPageMessage,
    set:set,
    getMessage: getMessage,
    getLink: getLink,
    hasMessage:hasMessage,
    hasLink:hasLink,
    setSMSInformationalMessage:setSMSInformationalMessage,
    hide:hide
  };

  return svc;
});
