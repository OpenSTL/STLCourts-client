'use strict';

angular.module('yourStlCourts').service('Error', function () {
  var err = {
    code:"",
    message:""
  }
  /*this.errorObject = function(errorCode,errorMessage){
    return {code:errorCode,message:errorMessage};
  }
  */
  this.errorObject = function(errorCode,errorMessage){
    err.code = errorCode;
    err.message = errorMessage;
    return err;
  }

  this.getError = function(){
    return err;
  }
});

var ErrorCode = {
  BAD_REQUEST:400,
  NOT_FOUND:404
}
