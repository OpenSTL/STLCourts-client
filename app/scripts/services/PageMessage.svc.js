'use strict';

angular.module('yourStlCourts').factory('PageMessage', function ($rootScope, SMSInfo) {
  var message = "";
  var stateLink = "";
  var hideMessage = false;

  function setMessage(messageHtml){
    message = messageHtml;
  }

  function set(messageHtml,stateToGoTo){
    setMessage(messageHtml);
    stateLink = stateToGoTo;
  }

  function setSMSInformationalMessage(){
    SMSInfo.getPhoneNumber().then(function(phoneNumber){
      var message = 'Get Court Date Reminders on your<br>phone. Text "HELP" to <b>'+phoneNumber+'</b>';
      setMessage(message);
    });
  }

  function hideGlobalMessage(){
    hideMessage = true;
  }

  function getMessage(){
    return message;
  }

  function getLink(){
    return stateLink;
  }

  function hasMessage(){
    if (hideMessage){
      return false;
    }else {
      return !!message;
    }
  }

  function hasLink(){
    return !!stateLink;
  }

  function start(useLocalMessages){

    if (useLocalMessages) {
      $rootScope.$on('$stateChangeStart', function () {
        setMessage("");
        stateLink = "";
      });
    }else{
      //using global message so allow page to hide message
      $rootScope.$on('$stateChangeStart', function () {
        hideMessage = false;
      });
    }
  }

  var svc = {
    start: start,
    setMessage: setMessage,
    set:set,
    getMessage: getMessage,
    getLink: getLink,
    hasMessage:hasMessage,
    hasLink:hasLink,
    setSMSInformationalMessage:setSMSInformationalMessage,
    hideGlobalMessage:hideGlobalMessage
  };

  return svc;
});
