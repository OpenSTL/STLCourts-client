'use strict';

angular.module('yourStlCourts').factory('PageMessage', function ($rootScope) {
  var message = "";
  var stateLink = "";

  function setMessage(messageHtml){
    message = messageHtml;
  }

  function set(messageHtml,stateToGoTo){
    setMessage(messageHtml);
    stateLink = stateToGoTo;
  }

  function getMessage(){
    return message;
  }

  function getLink(){
    return stateLink;
  }

  function hasMessage(){
    return !!message;
  }

  function hasLink(){
    return !!stateLink;
  }

  function start(){
    $rootScope.$on('$stateChangeStart',function(){
      message = "";
      stateLink = "";
    });
  }

  var svc = {
    start: start,
    setMessage: setMessage,
    set:set,
    getMessage: getMessage,
    getLink: getLink,
    hasMessage:hasMessage,
    hasLink:hasLink
  };

  return svc;
});
