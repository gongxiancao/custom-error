'use strict';

var operationalError = require('./index'),
  should = require('chai').should(),
  Promise = require('bluebird'),
  sinon = require('sinon');

/* globals
  describe: false,
  before: false,
  it: false
  */

describe('index', function() {
  var Errors;
  before(function (done) {
    var config = {
      InvalidInputError: 'invalid input',
      UserAlreadyExistError: 'user aready exist'
    };
    Errors = operationalError(config);
    done();
  });

  it('should create Errors', function () {
    should.exist(Errors.InvalidInputError);
    should.exist(Errors.OperationalError);
  });

  it('should work with Promise', function () {
    var errorSpy = sinon.spy();
    Promise.resolve(1)
    .then(function () {
      return Promise.reject(new Errors.InvalidInputError());
    })
    .catch(Errors.OperationalError, errorSpy)
    .then(function () {
      should.equal(errorSpy.callCount, 1);
    });
  });
});