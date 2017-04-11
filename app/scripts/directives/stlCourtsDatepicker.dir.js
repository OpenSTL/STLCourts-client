'use strict';
/*
    Usage: <stl-courts-datepicker></stl-courts-datepicker>
    <stl-courts-datepicker date-field="ctrl.dob" date-valid="ctrl.dobValid" date-over-18="ctrl.dobOver18"></stl-courts-datepicker>
*/

angular.module('yourStlCourts').directive('stlCourtsDatepicker', function($timeout,moment){
  return{
    restrict: 'E',
    scope:{
      isoDateString:'=?', //returns iso date string of date part only yyyy-MM-dd no Time
      dateObject:'=?',  //returns javascript Date
      dateField:'=?',  //returns date String formatted to "MM/dd/yyyy"
      dateValid:'=?',
      dateOver18:'=?'
    },
    templateUrl: 'views/stlCourtsDatepicker.html',
    controller: 'StlCourtsDatepicker as ctrl',
    link: function($scope,element,attrs){
      var keys = {
        backspace:8,
        delete:46,
        left_arrow:37,
        right_arrow:39,
        zero:48,
        nine:57
      };

      var datepickerCalendarOpen = false;
      var dateStringJustChangedUibDatePickerDate = false;
      var uibDatePickerDateJustChangedDateString = false;
      var initialDTSet = true;
      var dateFormat = "MM/DD/YYYY";

      $scope.ctrl.valid = false;

      $scope.ctrl.dateString = "";

      $(element).find(".stl-courts-datepicker-date-group").on('click',function(event){
        $scope.ctrl.openCloseDateCalendar("close");
      });

      $(element).find("input").each(function(index){
        var inputElement = this;

        $(inputElement).on('click',function(event){
          clearInputElement(inputElement);
        });

        $(inputElement).on('input',function(event){
          var inputString = $(inputElement).val();
          var keyCode = inputString.charCodeAt(inputString.length-1);
          if (keyCode >= keys.zero && keyCode <= keys.nine){
            var maxLength = $(event.target).attr("maxlength");
            var numberOfExistingDigits = $(event.target).val().length;
            updateDateString();
            if (numberOfExistingDigits === maxLength){
              //tab to the next field
              if ($(event.target).next("span") !== $()){
                clearInputElement($(event.target).next().next());
                $(event.target).next().next().focus();
              }
            }
          }else{
            //remove invalid key from display
            $(inputElement).val($(inputElement).val().slice(0,$(inputElement).val().length-1));
          }
        });
      });

      function clearInputElement(inputElement){
        $(inputElement).val("");
        updateDateString();
      }

      function updateDateString(){
        $timeout(function(){
          var dateString = "";
          $(element).find("input").each(function(index){
            dateString += $(this).val();
            if (index < 2){
              dateString += "/";
            }
          });
          $scope.ctrl.dateString = dateString;
        });
      }

      function isOver18(){
        if (isValidDate()) {
          moment(getISODateString());
          var years = moment(getISODateString()).diff(moment(getISODateString($scope.ctrl.dateString)),'years');
          return (years >= 18);
        }else{
          return false;
        }
      }

      function getISODateString(dateString){
        var jsDateString;
        if (dateString) {
          var dateParts = dateString.split("/");
          var jsDateString = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        }else{
          jsDateString = new Date();
        }
        return jsDateString.toISOString().split("T")[0];
      }


      function isValidDate(){
        //moment will still allow entries of 2/2/15 even if format is DD/MM/YYYY so check both
        //moment will check for a valid date so we need it. ie 2/31/15
        var validDate = false;
        if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test($scope.ctrl.dateString) && moment($scope.ctrl.dateString,dateFormat).isValid()){
          validDate = true;
        }
        return validDate;
      }

      $scope.$watch(function($scope){
        return $scope.ctrl.dateString;
      },function(){
        $scope.ctrl.valid = isValidDate();
        if ($scope.ctrl.valid) {
          $scope.ctrl.over18 = isOver18();
          //set hooks for external access
          $scope.dateObject = getDateObjectFromDateString();
          $scope.isoDateString = getISODateString($scope.ctrl.dateString);
          $scope.dateField = $scope.ctrl.dateString;
          $scope.dateOver18 = $scope.ctrl.over18;
          $scope.dateValid = $scope.ctrl.valid;

          if (!uibDatePickerDateJustChangedDateString) {
            if ($scope.ctrl.valid) {
              dateStringJustChangedUibDatePickerDate = true;
              $scope.ctrl.uibDatePickerDate = getDateObjectFromDateString();
            }
          } else {
            uibDatePickerDateJustChangedDateString = false;
          }
        }

      });

      $scope.$watch(function($scope){
        return $scope.ctrl.uibDatePickerDate;
      },function(){
        if (!dateStringJustChangedUibDatePickerDate) {
          if (!initialDTSet) {
            $scope.ctrl.openCloseDateCalendar();
            uibDatePickerDateJustChangedDateString = true;
            $scope.ctrl.dateString = formatDateObjToDateFormat();
            loadDateStringToElement();
          }else{
            initialDTSet = false;
          }
        }else{
          dateStringJustChangedUibDatePickerDate = false;
        }
      });

      function loadDateStringToElement(){
        var dateParts = $scope.ctrl.dateString.split("/");
        $(element).find("input").each(function(index){
            $(this).val(dateParts[index]);
        });
      }

      function formatDateObjToDateFormat(){
          return moment($scope.ctrl.uibDatePickerDate).format(dateFormat);
      }

      function getDateObjectFromDateString(){
          return moment(getISODateString($scope.ctrl.dateString)).clone().toDate();
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
        $(element).find(".stl-courts-datepicker-date-group").off("click");
        $(element).find("input").off("input").off("click");
      });
    }
  }
});
