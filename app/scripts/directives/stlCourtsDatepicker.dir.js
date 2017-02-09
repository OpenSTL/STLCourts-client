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

      element.on('click',function(event){
        var el = getElement(event.toElement);
        keyDirection = direction.forward;
        saveCaretPos(el);
        moveCaretPos(el);
        insertUnderscoreAtCursor(el);
      });

      element.on('keypress',function(event){
        var keyCode = event.keyCode;
        var el = getElement(event.target);
        saveCaretPos(el);
        moveCaretPos(el);
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
        saveCaretPos(el);
        moveCaretPos(el);
        event.preventDefault();
        var keycode = event.keyCode;
        switch(keycode){
          case keys.backspace:
            keyDirection = direction.backwards;
            deleteDateDigit(el);
            break;
          case keys.left_arrow:
            keyDirection = direction.backwards;
            insertUnderscoreAtCursor(el);
            break;
          case keys.delete:
            keyDirection = direction.forward;
            deleteDateDigit(el);
            break;
          case keys.right_arrow:
            keyDirection = direction.forward;
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
            if (keyDirection == direction.forward) {
              caretPosition++;
            }else {
              caretPosition--;
            }
            insertUnderscoreAtCursor(el);
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

      function deleteDateDigit(el){
        var dateElement;
        if (keyDirection == direction.backwards) {
          caretPosition--;
        }
        dateElement = getDateElementFromCaretPos(el);

        if (dateElement){
          var dateElementChar = dateElement.innerText;
          if (/[0-9mdy]/i.test(dateElementChar)) {
            $(dateElement).addClass("dim");
            var templateChar = $scope.ctrl.dateFormat.charAt(caretPosition);
            dateElement.innerText = templateChar;
            updateDateString();
            if (keyDirection == direction.forward) {
              caretPosition++;
            }
            insertUnderscoreAtCursor(el);
          }else{
            if (keyDirection == direction.forward) {
              caretPosition++;
            }
            deleteDateDigit(el);
          }
        }
      }

      function initializeElement(){
        $(element).find(".stl-courts-datepicker-input").html(wrapEachLetter($scope.ctrl.dateFormat));
        updateDateString();
      }

      function updateDateString(){
        $timeout(function(){
          $scope.ctrl.dateString = $(element).find(".stl-courts-datepicker-input").get(0).innerText.replace("p","");
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
        for(var i = 0; i < stringToWrap.length; i++){
          if (/[mdy]/i.test(stringToWrap[i])) {
            newString += '<span class="dim">' + stringToWrap[i] + '</span>';
          }else{ //a divider character or valid date numeric
            newString += '<span>' + stringToWrap[i] + '</span>';
          }
        }
        return newString;
      }

      function moveCaretPos(el){
        if ($scope.ctrl.dateFormat.length < caretPosition)
          caretPosition -= 1;
        var mySel = window.getSelection();
        mySel.collapse(el,caretPosition+1);
      }

      function saveCaretPos(el){
        var mySel = window.getSelection();
        var fn = mySel.focusNode;
        var selectedElement = $(fn).parent().get(0);
        caretPosition = 0;
        $(el).children().each(function(index){
          if (this == selectedElement){
            caretPosition = index;
            return false;
          }
        });
      }

      function getDateElementFromCaretPos(el){
        return $(el).children().get(caretPosition + 1);
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
        element.off('keydown');
        element.off('keyup');
        element.off('keypress');
        element.off('click');
      });
    }
  }
});
