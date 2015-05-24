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

  describe('Add toggleSearchInput method', function () {

    it('should toggle searchInput state', function () {
      searchNote.opened = false;
      searchNote.toggleSearchInput();
      expect(searchNote.opened).to.equal(true);
      searchNote.toggleSearchInput();
      expect(searchNote.opened).to.equal(false);
    });
  });
});