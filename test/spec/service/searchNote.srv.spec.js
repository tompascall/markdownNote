// searchNote.srv.spec.js

'use strict';

describe('Service: searchNote', function () {
  var searchNote;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      searchNote = $injector.get('searchNote');
    });
  });

  describe('Test searchTerm', function () {
    it('should have searchTerm', function () {
      expect(searchNote.searchTerm).to.not.equal(undefined);
    });
  });
});
