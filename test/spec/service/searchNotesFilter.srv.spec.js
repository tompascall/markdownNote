// searchNotesFilter.srv.spec.js

'use strict';

describe('Service: searchNotesFilter', function () {
  var searchNotesFilter;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      searchNotesFilter = $injector.get('searchNotesFilter');
    });
  });

  describe('test filter', function () {
    var testArray;

    beforeEach(function () {
      testArray = ['apple1','orange1','pear1','apple2','orange2','pear2'];
    });

    it('should', function () {
      expect(searchNotesFilter(testArray,'apple')).to.deep.equal(['apple1','apple2']);
    });
  });
});
