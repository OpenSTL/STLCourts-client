'use strict';
/*
    Usage: <stl-courts-datepicker date-format="some format string"></stl-courts-datepicker>
    <stl-courts-datepicker date-field="ctrl.dob" date-valid="ctrl.dobValid" date-over-18="ctrl.dobOver18" date-format="MM/DD/YYYY"></stl-courts-datepicker>
*/

angular.module('yourStlCourts').directive('stlCourtsDatepicker', function($timeout,moment){
  return{
    restrict: 'E',
    scope:{
      dateField:'=',
      dateValid:'=',
      dateOver18:'='
    },
    templateUrl: 'views/stlCourtsDatepicker.html',
    controller: 'StlCourtsDatepicker as ctrl',
    link: function($scope,element,attrs){
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
      var keyDirection = keys.none;
      var caretPosition = 0;
      var datepickerCalendarOpen = false;
      var dateStringJustChangedDt = false;
      var dtJustChangedDateString = false;
      var initialDTSet = true;

      $scope.ctrl.valid = false;

      $scope.ctrl.dateFormat = ("dateFormat" in attrs)?attrs.dateFormat:"mm/dd/yyyy";
      $scope.ctrl.dateString = "";
      initializeElement();

      $(element).find(".stl-courts-datepicker-input").on('blur',function(event){
        resetUnderline(event.target);
      });

      $(element).find(".stl-courts-datepicker-input").on('click',function(event){
        $scope.ctrl.openCloseDateCalendar("close");
      });

      $(element).find(".stl-courts-datepicker-input").children().each(function(index){
          $(this).attr("click-index",index);
          $(this).on('click',function(event){
            keyDirection = direction.forward;
            event.stopPropagation(); //keep event from triggering the whole div's click handler
            var el = getElement(event.target);
            caretPosition = $(event.target).attr("click-index");
            moveCaretPos(el);
            insertUnderscoreAtCursor(el);
          });
      });

      element.on('click',function(event){
        var el = getElement(event.target);
        //handle case where user clicks on the containing div element and not a date digit
        var sel = window.getSelection();
        var fn = sel.anchorNode;
        caretPosition = 1; //set to beginning after p as default;
        if (fn){
          if (fn.nodeType == 3){  //for browsers like chrome -- returns a text node
            caretPosition = $(fn).parent().attr("click-index");
            if (caretPosition == 0) //if caret at beginning move to first char, end condition is ok by default
              caretPosition = 1;
          }
          if (fn.nodeType == 1){ //for browsers like edge -- returns the whole div ie an element node
            //since we don't know if it was clicked at the beginning or end just set cursor at beginning
            caretPosition = 1;
          }
        }
        moveCaretPos(el);
        insertUnderscoreAtCursor(el);
      });

      element.on('keypress',function(event){
        var keyCode = event.keyCode;
        var el = getElement(event.target);
        event.preventDefault();
        if (keyCode >= keys.zero && keyCode <= keys.nine) {
          keyDirection = direction.forward;
          insertDateDigitAtCursor(el,String.fromCharCode(keyCode));
        }
      });

      element.on('keydown',function(event){
        var keycode = event.keyCode;
        if (keycode == keys.delete || keycode == keys.backspace){
          event.preventDefault();
        }
      });

      element.on('keyup',function(event){
        var el = getElement(event.target);
        event.preventDefault();
        var keycode = event.keyCode;
        switch(keycode){
          case keys.backspace:
            keyDirection = direction.backwards;
            caretPosition--;
            moveCaretPos(el);
            deleteDateDigit(el);
            break;
          case keys.left_arrow:
            keyDirection = direction.backwards;
            caretPosition--;
            moveCaretPos(el);
            insertUnderscoreAtCursor(el);
            break;
          case keys.delete:
            keyDirection = direction.forward;
            deleteDateDigit(el);
            break;
          case keys.right_arrow:
            keyDirection = direction.forward;
            caretPosition++;
            moveCaretPos(el);
            insertUnderscoreAtCursor(el);
            break;
        }
      });

      function insertUnderscoreAtCursor(el){
        resetUnderline(el);
        var dateElement = getDateElementFromCaretPos(el);
        if (dateElement){
          var dateElementChar = dateElement.innerText;
          if (/[0-9mdy]/i.test(dateElementChar)){
            $(dateElement).addClass("underline");
            moveCaretPos(el);
          }else{
            if (dateElementChar != "p") {
              if (keyDirection == direction.forward) {
                caretPosition++;
              } else {
                caretPosition--;
              }
              insertUnderscoreAtCursor(el);
            }else{
              moveCaretPos(el);
            }
          }
        }else{
          moveCaretPos(el);
        }
      }

      function insertDateDigitAtCursor(el,dateDigit){
          var dateElement = getDateElementFromCaretPos(el);
          if (dateElement){
            $(dateElement).removeClass("dim");
            dateElement.innerText = dateDigit;
            updateDateString();
            caretPosition++;
            insertUnderscoreAtCursor(el);
          }
      }

      function deleteDateDigit(el){  //delete digit at cursor
        var dateElement;
        dateElement = getDateElementFromCaretPos(el);

        if (dateElement){
          var dateElementChar = dateElement.innerText;
          if (/[0-9mdy]/i.test(dateElementChar)) {
            $(dateElement).addClass("dim");
            var templateChar = $scope.ctrl.dateFormat.charAt(Number(caretPosition)-1); //template is 1 off because of beginning p element
            dateElement.innerText = templateChar;
            updateDateString();
            if (keyDirection == direction.forward) {
              caretPosition++;
              moveCaretPos(el);
            }
            insertUnderscoreAtCursor(el);
          }else{
            if (dateElementChar != "p") {
              if (keyDirection == direction.forward) {
                caretPosition++;
              }else{
                if (keyDirection == direction.backwards){
                  caretPosition--;
                }
              }
              moveCaretPos(el);
              deleteDateDigit(el);
            }
          }
        }
      }

      function initializeElement(){
        $(element).find(".stl-courts-datepicker-input").html(wrapEachLetter($scope.ctrl.dateFormat));
        updateDateString();
      }

      function updateDateString(){
        $timeout(function(){
          $scope.ctrl.dateString = $(element).find(".stl-courts-datepicker-input").get(0).innerText.replace(/p/g,"");
        });
      }

      function isOver18(){
        if (isValidDate()) {
          var years = moment().diff($scope.ctrl.dateString, 'years');
          return (years >= 18);
        }else{
          return false;
        }
      }
      function isValidDate(){
        //moment will still allow entries of 2/2/15 even if format is DD/MM/YYYY so check both
        //moment will check for a valid date so we need it. ie 2/31/15
        var validDate = false;
        if (/^[0-9\/-]+$/.test($scope.ctrl.dateString) && moment($scope.ctrl.dateString,$scope.ctrl.dateFormat).isValid()){
          validDate = true;
        }
        return validDate;
      }

      $scope.$watch(function($scope){
        return $scope.ctrl.dateString;
      },function(){
        $scope.ctrl.valid = isValidDate();
        $scope.ctrl.over18 = isOver18();
        //set hooks for external access
        $scope.dateField = $scope.ctrl.dateString;
        $scope.dateOver18 = $scope.ctrl.over18;
        $scope.dateValid = $scope.ctrl.valid;
        if (!dtJustChangedDateString) {
          if ($scope.ctrl.valid) {
            dateStringJustChangedDt = true;
            $scope.ctrl.dt = getDateObjectFromDateString();
          }
        }else{
          dtJustChangedDateString = false;
        }

      });

      $scope.$watch(function($scope){
        return $scope.ctrl.dt;
      },function(){
        if (!dateStringJustChangedDt) {
          if (!initialDTSet) {
            $scope.ctrl.openCloseDateCalendar();
            dtJustChangedDateString = true;
            $scope.ctrl.dateString = formatDateObjToDateFormat();
            loadDateToElement($scope.ctrl.dateString);
          }else{
            initialDTSet = false;
          }
        }else{
          dateStringJustChangedDt = false;
        }
      });

      function formatDateObjToDateFormat(){
          return moment($scope.ctrl.dt).format($scope.ctrl.dateFormat);
      }

      function getDateObjectFromDateString(){
          return moment($scope.ctrl.dateString).clone().toDate();
      }

      function getElement(el){
        var foundElement = el;
        if (!$(el).hasClass("stl-courts-datepicker-input")) {
          if (!$(el).parent().hasClass("stl-courts-datepicker-input")) {
            foundElement = $(el).parentsUntil(".stl-courts-datepicker-input").parent().get(0);
          } else {
            foundElement = $(el).parent().get(0);
          }
        }
        return foundElement;
      }

      function loadDateToElement(){
        $(element).find(".stl-courts-datepicker-input").html(wrapEachLetter($scope.ctrl.dateString));
        updateDateString();
      }

      function wrapEachLetter(stringToWrap){
        //have to place a non visible span at the beginning because selection range shows as 0 position before and after 1st span
        var  newString = '<span class="noShow">p</span>';
        //var newString = "";
        for(var i = 0; i < stringToWrap.length; i++){
          if (/[mdy]/i.test(stringToWrap[i])) {
            newString += '<span class="dim">' + stringToWrap[i] + '</span>';
          }else{ //a divider character or valid date numeric
            newString += '<span>' + stringToWrap[i] + '</span>';
          }
        }
        newString += '<span class="noShow">p</span>';
        return newString;
      }

      function getCharAtCaretPos(){
        return $(element).find(".stl-courts-datepicker-input").children("span[click-index ='"+caretPosition+"']").html();
      }

      function moveCaretPos(el){
        var char = getCharAtCaretPos();
        if (char) {
          if (char == "p") {
            if (caretPosition == 0)
              caretPosition++;
          }
        }else{
          //arrow keys moved the caratPosition to an illegal position
          if (caretPosition <= 0){ //move caratePosition back to first character
            caretPosition = 1;
          }else{//caratPosition is to far to right so move it back to end of end character
            caretPosition--;
          }
        }
        var mySel = window.getSelection();
        mySel.collapse(el,caretPosition);
      }

      function saveCaretPos(el){
        var mySel = window.getSelection();
        var fn = mySel.focusNode;
        caretPosition = $(fn).attr("click-index");
      }

      function getDateElementFromCaretPos(el){
        return $(el).children().get(caretPosition);
      }

      function resetUnderline(el){
        $(el).children().removeClass("underline");
      }

      $scope.ctrl.openCloseDateCalendar = function(openClose){
        if (openClose){
          if (openClose == "close"){
            datepickerCalendarOpen = true;
          }else{
            datepickerCalendarOpen = false;
          }
        }
        var calendarDiv = $(element).find(".stl-courts-datepicker-calendar").get(0);
        if (datepickerCalendarOpen){
          datepickerCalendarOpen = false;
          $(calendarDiv).addClass("stl-courts-datepicker-hidden");
        }else{
          datepickerCalendarOpen = true;
          $(calendarDiv).removeClass("stl-courts-datepicker-hidden");
        }
      };

      element.on('$destroy',function(){
        $(element).find(".stl-courts-datepicker-input").off('blur');
        $(element).find(".stl-courts-datepicker-input").off('click');
        $(element).find(".stl-courts-datepicker-input").children().off('click');
        element.off('keydown');
        element.off('keyup');
        element.off('keypress');
        element.off('click');
      });
    }
  }
});
