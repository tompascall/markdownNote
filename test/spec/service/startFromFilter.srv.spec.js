// startFromFilter.srv.spec.js

'use strict';

describe('Service: startFromFilter', function () {
  var startFromFilter;

  beforeEach(function () {
    module('markdownNote');

    inject(function ($injector) {
      startFromFilter = $injector.get('startFromFilter');
    });
  });

  describe('test filter', function () {
    var testArray;

    beforeEach(function () {
      testArray = [0,1,2,3,4,5];
    });

    it('should give back a part of an array started from the given index', function () {
      var startIndex = 2;
      expect(startFromFilter(testArray, startIndex)).to.deep.equal([2,3,4,5]);
    });
  });
});
