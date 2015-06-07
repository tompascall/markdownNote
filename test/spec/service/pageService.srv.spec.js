// pageService.srv.spec.js

'use strict';

describe('Service: page', function () {
  var pageService;
  var ENV;
  var noteData;
  var $ionicScrollDelegate;

  beforeEach(function () {
    module('markdownNote');

    inject(function ($injector) {
      pageService = $injector.get('pageService');
      ENV = $injector.get('ENV');
      noteData = $injector.get('noteData');
      $ionicScrollDelegate = $injector.get('$ionicScrollDelegate');
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
      expect(pageService.currentPage).to.equal(1);
    });

    it('should set number of pages', function () {
      var tempSize = pageService.pageSize
      pageService.pageSize = 10;
      pageService.setNumberOfPages(noteData.notes);
      expect(pageService.numberOfPages).to.equal(4);
      pageService.pageSize = tempSize;
    });
  });

  describe('Navigating between pages', function () {
    var tempCurrentPage;
    var tempNumberOfPages;

    beforeEach(function () {
      tempCurrentPage = pageService.currentPage;
      tempNumberOfPages = pageService.numberOfPages;
    });

    afterEach(function () {
      pageService.currentPage = tempCurrentPage;
      pageService.numberOfPages = tempNumberOfPages;
    });

    it('should decrement currentPage number if setCurrentPage was called with -1', function () {
      pageService.currentPage = 2;
      pageService.setCurrentPage(-1);
      expect(pageService.currentPage).to.equal(1);
    });

    it('should leave currentPage to 0 if currentPage is 0 and' +
      'setCurrentPage was called with -1', function () {
      pageService.currentPage = 1;
      pageService.setCurrentPage(-1);
      expect(pageService.currentPage).to.equal(1);
    });

    it('should increment currentPage number if setCurrentPage was called with 1', function () {
      pageService.currentPage = 1;
      pageService.numberOfPages = 4;
      pageService.setCurrentPage(1);
      expect(pageService.currentPage).to.equal(2);
    });

    it('should leave currentPage if currentPage is equal to numberOfPages and' +
      'setCurrentPage was called with 1', function () {
      pageService.currentPage = 1;
      pageService.numberOfPages = 1;
       pageService.setCurrentPage(1);
      expect(pageService.currentPage).to.equal(1);
    });

    it('should go back to the first page', function () {
      pageService.currentPage = 3;
      pageService.backToStart();
      expect(pageService.currentPage).to.equal(1);
    });

    it('should scroll bottom when calling pageService.backToStart', function () {
      sinon.spy($ionicScrollDelegate, 'scrollBottom');
      pageService.backToStart();
      expect($ionicScrollDelegate.scrollBottom.called).to.equal(true);
      $ionicScrollDelegate.scrollBottom.restore();
    });

    it('should scroll bottom when calling pageService.forwardToEnd', function () {
      sinon.spy($ionicScrollDelegate, 'scrollBottom');
      pageService.forwardToEnd();
      expect($ionicScrollDelegate.scrollBottom.called).to.equal(true);
      $ionicScrollDelegate.scrollBottom.restore();
    });

    it('should scroll bottom when calling pageService.setCurrentPage', function () {
      sinon.spy($ionicScrollDelegate, 'scrollBottom');
      pageService.setCurrentPage();
      expect($ionicScrollDelegate.scrollBottom.called).to.equal(true);
      $ionicScrollDelegate.scrollBottom.restore();
    });

    it('should go forward to the last page', function () {
      pageService.numberOfPages = 10;
      pageService.currentPage = 3;
      pageService.forwardToEnd();
      expect(pageService.currentPage).to.equal(pageService.numberOfPages);
    });

    it('should check if we are on the last page', function () {
      pageService.currentPage = 3;
      pageService.numberOfPages = 10;
      expect(pageService.onTheLastPage()).to.equal(false);
      pageService.currentPage = 10;
      expect(pageService.onTheLastPage()).to.equal(true);
    });

    it('should check if we are on the first page', function () {
      pageService.currentPage = 3;
      expect(pageService.onTheFirstPage()).to.equal(false);
      pageService.currentPage = 1;
      expect(pageService.onTheFirstPage()).to.equal(true);
    });
  });

  describe('Updating', function () {

    var tempCurrentPage;
    var tempNumberOfPages;

    beforeEach(function () {
      tempCurrentPage = pageService.currentPage;
      tempNumberOfPages = pageService.numberOfPages;
    });

    afterEach(function () {
      pageService.currentPage = tempCurrentPage;
      pageService.numberOfPages = tempNumberOfPages;
    });


    it('should update number of pages and current page', function () {
      var mockData = Array(100);
      pageService.updatePages(mockData);

      expect(pageService.currentPage).to.equal(1);
      expect(pageService.numberOfPages)
      .to.equal(Math.ceil(mockData.length / pageService.pageSize));
    });
  });
});
