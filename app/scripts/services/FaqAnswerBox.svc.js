'use strict';

angular.module('yourStlCourts').factory('FaqAnswerBox', function ($rootScope) {
  var _question = "";
  var _answer = "";

  function set(question,answer){
    setAnswer(answer);
    setQuestion(question);
    revealAnswer();
  }

  function setAnswer(answer){
    _answer = answer;
  }

  function setQuestion(question) {
    _question = question
  }

  function revealAnswer(){
    $rootScope.$emit('faqAnswerBoxReveal',_question,_answer);
  }

  function hideAnswer(){

  }



  var svc = {
    set:set,
    setAnswer: setAnswer,
    setQuestion: setQuestion,
    revealAnswer: revealAnswer,
    hideAnswer: hideAnswer
  };

  return svc;
});
