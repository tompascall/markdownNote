// pageService.srv.js

'use strict';

function pageService (ENV, noteData) {
  var pageService = {
    currentPage: 0,
    pageSize: ENV.pageSize,
  };
  pageService.setNumberOfPages = function (displayedItems) {
    // console.log(noteData.notes.length, pageService.pageSize);
    pageService.numberOfPages = Math.ceil(displayedItems.length / pageService.pageSize);
  };
  pageService.setNumberOfPages(noteData.notes);
  return pageService;
}

angular.module('simpleNote').factory('pageService', pageService);
