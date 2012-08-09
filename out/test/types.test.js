// Generated by CoffeeScript 1.3.3
(function() {
  var assert, balUtil, joe, util;

  assert = require('assert');

  joe = require('joe');

  balUtil = require(__dirname + '/../lib/balutil');

  util = require('util');

  joe.describe('types', function(describe, it) {
    var testType, typeActual, typeExpected, typeTestData, value, _i, _len, _ref, _results;
    typeTestData = [[false, 'boolean'], [true, 'boolean'], ['', 'string'], [{}, 'object'], [(function() {}), 'function'], [new Date(), 'date'], [new Error(), 'error'], [[], 'array'], [null, 'null'], [void 0, 'undefined'], [/a/, 'regexp'], [1, 'number']];
    testType = function(value, typeExpected, typeActual) {
      return it("should detect " + (util.inspect(value)) + " is of type " + typeExpected, function() {
        return assert.equal(typeActual, typeExpected);
      });
    };
    _results = [];
    for (_i = 0, _len = typeTestData.length; _i < _len; _i++) {
      _ref = typeTestData[_i], value = _ref[0], typeExpected = _ref[1];
      typeActual = balUtil.getType(value);
      _results.push(testType(value, typeExpected, typeActual));
    }
    return _results;
  });

}).call(this);