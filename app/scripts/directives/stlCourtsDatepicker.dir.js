'use strict';
/*
    Usage: <stl-courts-datepicker date-format="some format string"></stl-courts-datepicker>

 */

angular.module('yourStlCourts').directive('stlCourtsDatepicker', function(){
  return{
    restrict: 'E',
    scope:{},
    templateUrl: 'views/stlCourtsDatepicker.html',
    controller: 'StlCourtsDatepicker as ctrl',
    link: function(scope,element,attrs,ctrl){
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


      ctrl.dateFormat = ("dateFormat" in attrs)?attrs.dateFormat:"mm/dd/yyyy";
      ctrl.dateString = wrapEachLetterWith(ctrl.dateFormat,'<span class="dim">','</span>');
      scope.$watch(function(){
        return ctrl.dateString
      }, function(){
        ctrl.setCaretPos();
      });

      element.on('click',function(event){
        var el = getElement(event.toElement);
        var position = getCaretPos(el);
        setCaretPos(el,position);
        insertUnderscoreAtCursor(el,position);
      });

      element.on('keypress',function(event){
        ctrl.keyCode = event.keyCode;
        var el = getElement(event.target);
        var position = getCaretPos(el);
        setCaretPos(el,position);

        //this code is needed, above is for labeling currently
        if (ctrl.keyCode >= keys.zero || ctrl.keyCode <= keys.nine) {
          keyDirection = direction.forward;
          event.preventDefault();
          insertDateDigitAtCursor(el, position,String.fromCharCode(ctrl.keyCode));
          //insertDateDigitAtCursor(String.fromCharCode(ctrl.keyCode));
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
        var position = getCaretPos(el);
        setCaretPos(el,position);
        event.preventDefault();
        var keycode = event.keyCode;
        switch(keycode){
          case keys.backspace:
            ctrl.keyCode = keycode;
            keyDirection = direction.backwards;
            deleteDateDigit(el,position);
            break;
          case keys.left_arrow:
            keyDirection = direction.backwards;
            insertUnderscoreAtCursor(el,position);
            break;
          case keys.delete:
            ctrl.keyCode = keycode;
            keyDirection = direction.forward;
            deleteDateDigit(el,position);
            break;
          case keys.right_arrow:
            keyDirection = direction.forward;
            insertUnderscoreAtCursor(el,position);
            break;
        }
      });

      function insertUnderscoreAtCursor(el, position){
        resetUnderline(el);
        var dateElement = getDateElementFromCaretPos(el,position);
        if (dateElement){
          var dateElementChar = dateElement.innerText;
          if (/[0-9mdy]/i.test(dateElementChar)){
            $(dateElement).addClass("underline");
            setCaretPos(el,position);
          }else{
            if (keyDirection == direction.forward) {
              insertUnderscoreAtCursor(el, ++position);
            }else {
              insertUnderscoreAtCursor(el, --position);
            }
          }
        }else{
          setCaretPos(el,position);
        }
      }

      function insertDateDigitAtCursor(el, position, dateDigit){
          var dateElement = getDateElementFromCaretPos(el,position);
          if (dateElement){
            $(dateElement).removeClass("dim");
            dateElement.innerText = dateDigit;
            insertUnderscoreAtCursor(el, ++position);
          }
      }

      function deleteDateDigit(el,position){
        var dateElement;
        if (keyDirection == direction.forward) {
          dateElement = getDateElementFromCaretPos(el, position);
        }else {
          dateElement = getDateElementFromCaretPos(el, --position);
        }

        if (dateElement){
          var dateElementChar = dateElement.innerText;
          if (/[0-9mdy]/i.test(dateElementChar)) {
            $(dateElement).addClass("dim");
            var templateChar = ctrl.dateFormat.charAt(position);
            dateElement.innerText = templateChar;
            if (keyDirection == direction.forward) {
              insertUnderscoreAtCursor(el, ++position);
            } else {
              insertUnderscoreAtCursor(el, position);
            }
          }else{
            if (keyDirection == direction.forward) {
              deleteDateDigit(el, ++position);
            }else{
              deleteDateDigit(el, position);
            }
          }
        }
      }

      function getFormattedDateString(el){
        var dateString = getDateStringFromInput(el);
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

      function getDateStringFromInput(el){
        return el.innerText.replace("p","");
      }

      function wrapEachLetterWith(stringToWrap, frontElement, backElement){
        //have to place a non visible span at the beginning because selection range shows as 0 position before and after 1st span
        var  newString = '<span class="noShow">p</span>';
        for(var i = 0; i < stringToWrap.length; i++){
          newString += frontElement + stringToWrap[i] + backElement;
        }
        return newString;
      }

      function setCaretPos(el,position){
        if (ctrl.dateFormat.length < position)
          position -= 1;
        var mySel = window.getSelection();
        var range = document.createRange();
        range.setStart(el,position+1);
        //range.setEnd(el,5);
        range.collapse(true);
        mySel.removeAllRanges();
        mySel.addRange(range);
      }

      function getCaretPos(el){
        var mySel = window.getSelection();
        var fn = mySel.focusNode;
        var selectedElement = $(fn).parent().get(0);
        var position = 0;
        $(el).children().each(function(index){
          if (this == selectedElement){
            position = index;
            return false;
          }
        });
        ctrl.caretPos = position;
        scope.$digest();
        return position;
      }

      function getDateElementFromCaretPos(el,position){
        var positionToGet = position + 1;
        var dataElement = $(el).children().get(positionToGet);
        return dataElement;
      }

      function resetUnderline(el){
        $(el).children().removeClass("underline");
      }
    }
  }
});
