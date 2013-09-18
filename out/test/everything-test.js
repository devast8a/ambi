// Generated by CoffeeScript 1.6.3
var ambi, delay, expect, joe, wait;

expect = require('chai').expect;

joe = require('joe');

ambi = require('../lib/ambi');

wait = function(delay, fn) {
  return setTimeout(fn, delay);
};

delay = 100;

joe.describe('ambi', function(describe, it) {
  it('should handle result on successful synchronous functions', function(done) {
    var executedChecks, multiplySync, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    multiplySync = function(x, y) {
      ++executedChecks;
      return x * y;
    };
    ambi(multiplySync, 2, 5, function(err, result) {
      expect(err, 'error to be null').to.eql(null);
      expect(result, 'result to be set').to.eql(10);
      return ++executedChecks;
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      return done();
    });
  });
  it('should handle result on successful asynchronous functions', function(done) {
    var executedChecks, multiplyAsync, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    multiplyAsync = function(x, y, next) {
      wait(delay, function() {
        next(null, x * y);
        return ++executedChecks;
      });
      return 'async';
    };
    ambi(multiplyAsync, 2, 5, function(err, result) {
      expect(err, 'error to be null').to.eql(null);
      expect(result, 'result to be set').to.eql(10);
      return ++executedChecks;
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      return done();
    });
  });
  it('should handle returned errors on unsuccessful synchronous functions', function(done) {
    var errMessage, executedChecks, returnErrorSync, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    errMessage = 'my first error';
    returnErrorSync = function(x, y) {
      ++executedChecks;
      return new Error(errMessage);
    };
    ambi(returnErrorSync, 2, 5, function(err, result) {
      expect(err.message, 'error to be set').to.eql(errMessage);
      expect(result, 'result to be undefined').to.not.exist;
      return ++executedChecks;
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      return done();
    });
  });
  it('should handle callbacked errors on unsuccessful asynchronous functions', function(done) {
    var callbackErrorAsync, errMessage, executedChecks, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    errMessage = 'my first error';
    callbackErrorAsync = function(x, y, next) {
      wait(delay, function() {
        next(new Error(errMessage));
        return ++executedChecks;
      });
      return 'async';
    };
    ambi(callbackErrorAsync, 2, 5, function(err, result) {
      expect(err.message, 'error to be set').to.eql(errMessage);
      expect(result, 'result to be undefined').to.not.exist;
      return ++executedChecks;
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      return done();
    });
  });
  it('should ignore returned errors on successfull asynchronous functions', function(done) {
    var errMessage, executedChecks, returnErrorThenCompleteAsync, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    errMessage = 'my first error';
    returnErrorThenCompleteAsync = function(x, y, next) {
      wait(delay, function() {
        next(null, x * y);
        return ++executedChecks;
      });
      return new Error(errMessage);
    };
    ambi(returnErrorThenCompleteAsync, 2, 5, function(err, result) {
      expect(err, 'error to be null').to.eql(null);
      expect(result, 'result to be set').to.eql(10);
      return ++executedChecks;
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      return done();
    });
  });
  it('should ignore returned errors on unsuccessful asynchronous functions', function(done) {
    var errMessage, errMessage2, executedChecks, returnErrorThenCallbackErrorAsync, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    errMessage = 'my first error';
    errMessage2 = 'my second error';
    returnErrorThenCallbackErrorAsync = function(x, y, next) {
      wait(delay, function() {
        next(new Error(errMessage2));
        return ++executedChecks;
      });
      return new Error(errMessage);
    };
    ambi(returnErrorThenCallbackErrorAsync, 2, 5, function(err, result) {
      expect(err.message, 'error to be set').to.eql(errMessage2);
      expect(result, 'result to be undefined').to.not.exist;
      return ++executedChecks;
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      return done();
    });
  });
  it('should NOT handle thrown errors on unsuccessful synchronous functions', function(done) {
    var catchUncaughtException, err, errMessage, executedChecks, neverReached, throwErrorSyncUncaught, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    neverReached = false;
    errMessage = 'my first error';
    throwErrorSyncUncaught = function(x, y) {
      ++executedChecks;
      throw new Error(errMessage);
    };
    catchUncaughtException = function(err) {
      expect(err.message, 'error to be set').to.eql(errMessage);
      return ++executedChecks;
    };
    try {
      ambi(throwErrorSyncUncaught, 2, 5, function(err, result) {
        ++executedChecks;
        return neverReached = true;
      });
    } catch (_error) {
      err = _error;
      catchUncaughtException(err);
    }
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      expect(neverReached, 'never reached section should have never been reached').to.eql(false);
      return done();
    });
  });
  it('should NOT handle thrown errors on unsuccessful asynchronous functions', function(done) {
    var catchUncaughtException, err, errMessage, executedChecks, neverReached, throwErrorAsyncUncaught, totalChecks;
    executedChecks = 0;
    totalChecks = 2;
    neverReached = false;
    errMessage = 'my first error';
    throwErrorAsyncUncaught = function(x, y, next) {
      ++executedChecks;
      throw new Error(errMessage);
    };
    catchUncaughtException = function(err) {
      expect(err.message, 'error to be set').to.eql(errMessage);
      return ++executedChecks;
    };
    try {
      ambi(throwErrorAsyncUncaught, 2, 5, function(err, result) {
        ++executedChecks;
        return neverReached = true;
      });
    } catch (_error) {
      err = _error;
      catchUncaughtException(err);
    }
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      expect(neverReached, 'never reached section should have never been reached').to.eql(false);
      return done();
    });
  });
  return it('should NOT handle asynchronous thrown errors on unsuccessful asynchronous functions', function(done) {
    var catchUncaughtException, d, errMessage, executedChecks, neverReached, throwErrorAsyncUncaught, totalChecks;
    if (process.versions.node.substr(0, 3) === '0.8') {
      console.log('skip this test on node 0.8 because domains behave differently');
      return done();
    }
    executedChecks = 0;
    totalChecks = 2;
    neverReached = false;
    errMessage = 'my first error';
    throwErrorAsyncUncaught = function(x, y, next) {
      wait(delay, function() {
        ++executedChecks;
        throw new Error(errMessage);
      });
      return 'async';
    };
    catchUncaughtException = function(err) {
      expect(err.message, 'error to be set').to.eql(errMessage);
      return ++executedChecks;
    };
    d = require('domain').create();
    d.on('error', catchUncaughtException);
    d.run(function() {
      var err;
      try {
        return ambi(throwErrorAsyncUncaught, 2, 5, function(err, result) {
          ++executedChecks;
          return neverReached = true;
        });
      } catch (_error) {
        err = _error;
        return catchUncaughtException(err);
      }
    });
    return wait(delay * 2, function() {
      expect(executedChecks, 'special checks were as expected').to.eql(totalChecks);
      expect(neverReached, 'never reached section should have never been reached').to.eql(false);
      return done();
    });
  });
});