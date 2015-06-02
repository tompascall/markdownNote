// pageService.srv.js

'use strict';

function pageService (ENV, $ionicScrollDelegate) {
  /*jshint -W004 */  // to skip 'pageService is already defined' jshint message
  var pageService = {
    currentPage: 1,
    pageSize: ENV.pageSize,
  };
  pageService.setNumberOfPages = function (displayedItems) {
    // console.log(noteData.notes.length, pageService.pageSize);
    pageService.numberOfPages = Math.ceil(displayedItems.length / pageService.pageSize);
  };

  pageService.setCurrentPage = function (offset) {
    if (offset > 0) {
      if (this.currentPage < this.numberOfPages) {
        this.currentPage = this.currentPage + offset;
      }
    }
    else {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage + offset;
      }
    }
    // console.log('current page: ' + this.currentPage);
    // console.log('number of pages: ' + this.numberOfPages);
    // console.log('displayedNotes.notes.length: ' + displayedNotes.notes.length);
    $ionicScrollDelegate.scrollBottom();
  };

  pageService.updatePages = function (displayedItems) {
    this.setNumberOfPages(displayedItems);
    this.currentPage = 1;
  };

  pageService.backToStart = function () {
    this.currentPage = 1;
    $ionicScrollDelegate.scrollBottom();
  };

  pageService.forwardToEnd = function () {
    this.currentPage = this.numberOfPages;
    $ionicScrollDelegate.scrollBottom();
  };

  pageService.onTheFirstPage = function () {
    return this.currentPage === 1;
  };

  pageService.onTheLastPage = function () {
    return this.currentPage === this.numberOfPages;
  };

  return pageService;
}

angular.module('simpleNote').factory('pageService', pageService);
