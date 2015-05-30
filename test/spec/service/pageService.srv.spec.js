// pageService.srv.spec.js

'use strict';

describe('Service: page', function () {
  var pageService;
  var ENV;
  var noteData;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      pageService = $injector.get('pageService');
      ENV = $injector.get('ENV');
      noteData = $injector.get('noteData');
    });
  });

  describe('Initialization', function () {
    var tempNotes;
    var tempPageSize;

    beforeEach(function () {
      tempPageSize = ENV.pageSize;
      tempNotes = noteData.notes.slice();
      for(var i = 0; i < 35; i++) {
        noteData.notes[i] = {id: i};
      }
      pageService.setNumberOfPages(noteData.notes);
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      ENV.pageSize = tempPageSize;
    });

    it('should init pageSize and currentPage value', function () {
      expect(pageService.pageSize).to.equal(ENV.pageSize);
      expect(pageService.currentPage).to.equal(0);
    });

    it('should count numberOfPages', function () {
      ENV.pageSize = 10;
      expect(pageService.numberOfPages).to.equal(4);
    });
  });
});
