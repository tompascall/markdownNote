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
      var tempSize = pageService.pageSize
      pageService.pageSize = 10;
      pageService.setNumberOfPages(noteData.notes);
      expect(pageService.numberOfPages).to.equal(4);
      pageService.pageSize = tempSize;
    });
  });

  describe('Updating', function () {
    it('should update number of pages and current page', function () {
      var tempNumberOfPages = pageService.numberOfPages;
      var tempCurrentPage = pageService.currentPage;
      var mockData = Array(100);
      pageService.updatePages(mockData);

      expect(pageService.currentPage).to.equal(0);
      expect(pageService.numberOfPages)
      .to.equal(Math.ceil(mockData.length / pageService.pageSize));

      pageService.numberOfPages = tempNumberOfPages;
      pageService.currentPage = tempCurrentPage;
    });
  });
});
