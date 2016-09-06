'use strict';
var util = require('util');

function OperationalError () {
  Error.call(this);
}

util.inherits(OperationalError, Error);

function BuildErrorType (messageStatic, code) {
  function ConcreteOperationalError (messageDynamic, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.message = messageDynamic || messageStatic;
    this.extra = extra;
  }
  util.inherits(ConcreteOperationalError, OperationalError);
  return ConcreteOperationalError;
}

module.exports = function (errors) {
  var result = {}, message;
  for(var code in errors) {
    message = errors[code];
    result[code] = BuildErrorType(message, code);
  }

  result.OperationalError = OperationalError;
  return result;
};
