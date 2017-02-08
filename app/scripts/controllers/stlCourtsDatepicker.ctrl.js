'use strict';
angular.module('yourStlCourts').controller('StlCourtsDatepicker', function () {
  var ctrl = this;
  var unformattedDateChars = new Array();
  var currentIndex = 0;
  //ctrl.dateFormat = "mm/dd/yyyy";
  //ctrl.dateString = ctrl.dateFormat;
  var direction = {
    forward:'forward',
    backwards:'backward',
    none:'none'
  };

  var keys = {
    backspace:8,
    delete:46,
    left_arrow:37,
    right_arrow:39,
    zero:48,
    nine:57
  };

  var keyDirection = direction.none;
  ctrl.stringPositionValue = -1;
  var stringPosition;
  ctrl.caretPos = -1;

  function spliceString(orgString, start, delCount, newSubStr) {
    return orgString.slice(0, start) + newSubStr + orgString.slice(start + Math.abs(delCount));
  };

  function insertUnderscoreAtCursor(){
    eraseUnderscores();
    //place an insertion point
    var underscoreFormatted = ctrl.dateFormat;
    getCaretPos();
    var position = ctrl.caretPos;
    var templateChar = ctrl.dateFormat[position];
    var validUnderscoreChars = /[mdy]/i;
    if (validUnderscoreChars.test(templateChar)){
      underscoreFormatted = spliceString(ctrl.dateFormat,position,1,"<u>"+templateChar+"</u>");
      stringPosition = position;
      ctrl.dateString = underscoreFormatted;
    }else{
      //position is at a date separator field so move cursor past
      if (keyDirection == direction.forward)
        stringPosition = position+1;
      else
        stringPosition = position-1;
      ctrl.setCaretPos();
      insertUnderscoreAtCursor();
    }
  }

  function eraseUnderscores(){
      //maybe needed???
  }

  function insertDateDigitAtCursor(dateDigit){
    var insertIndex = ctrl.dateString.indexOf("_");
    var newDateString = spliceString(ctrl.dateString,insertIndex,1,dateDigit);
    ctrl.dateString = newDateString;
    //update cursor position
    //call insertUnderscoreAtCursor
    //merge newDateString with cursor dateString
  }

  function format2(){
    for(var dateStringIndex = 0; dateStringIndex < ctrl.dateFormat.length; dateStringIndex++){
      var templateChar = ctrl.dateFormat[dateStringIndex];
      var dateStringChar = "";
      if (dateStringIndex < ctrl.dateString.length) {
        dateStringChar = ctrl.dateString[dateStringIndex];
      }
      if (!dateStringMatchesTemplate(dateStringChar,templateChar)){

      }
    }
  }

  function dateStringMatchesTemplate(dateStringChar, templateChar){
    var matches = false;
    var dateField = /[mdy]/i;
    if (dateField.test(templateChar)){
      var numeric = /[0-9]/;
      matches = numeric.test(dateStringChar);
    }
    return matches;
  }

  ctrl.keypress = function($event){
    ctrl.keyCode = $event.keyCode;
    var myEl = $event.target;

    //this code is needed, above is for labeling currently
    if (ctrl.keyCode >= keys.zero || ctrl.keyCode <= keys.nine) {
      keyDirection = direction.forward;
      insertDateDigitAtCursor(String.fromCharCode(ctrl.keyCode));
    }
  };

  ctrl.click = function ($event){
    getCaretPos();
    //insertUnderscoreAtCursor();
  };

  ctrl.keyup = function($event){
    var keycode = $event.keyCode;
    switch(keycode){
      case keys.backspace:
        ctrl.keyCode = keycode;
        keyDirection = direction.backwards;
        break;
      case keys.left_arrow:
        keyDirection = direction.backwards;
        break
      case keys.delete:
        ctrl.keyCode = keycode;
        keyDirection = direction.forward;
        break;
      case keys.right_arrow:
        keyDirection = direction.forward;
        break;
    }

    insertUnderscoreAtCursor();
  };

  ctrl.keyToChar = function(){
    var s = String.fromCharCode(ctrl.keyCode);
    if (ctrl.keyCode == 8)
      s = "bs";
    if (ctrl.keyCode == 46)
      s = "del";

    return s;
  };

  ctrl.setCaretPos = function(){
    if (stringPosition) {
      ctrl.stringPositionValue = stringPosition;
      var baseOffsetPos = 0;
      var position = baseOffsetPos + stringPosition;
      var mySel = window.getSelection();
      var myRange = (mySel).getRangeAt(0);
      myRange.setStart(mySel.anchorNode, position);
      myRange.collapse(true);
      mySel.removeAllRanges();
      mySel.addRange(myRange);

      if (ctrl.dateString.indexOf("_") == -1){
        insertUnderscoreAtCursor();
      }
    }
  };

  function getCaretPos(){
    var baseOffsetPos = 0;

    var mySel = window.getSelection();
    /*var myRange = (mySel).getRangeAt(0);
    var position = myRange.startOffset;
    ctrl.caretPos = position - baseOffsetPos;*/
    var fn = mySel.focusNode;
    var an = mySel.anchorNode;
    var p = 0;
    //var range = document.createRange();
    //range.setStart()

  }



});
