// searchInput.drv.js

'use strict';

function searchInputController (searchNote, searchNotesFilter, displayedNotes, pageService) {
  /*jshint validthis: true */
  var controller = this;
  controller.searchNote = searchNote;

  controller.applySearchNotes = function (searchTerm) {
    if (!searchNote.hasCacheEntry(searchTerm)) {
      searchNote.createCacheEntry(searchTerm);
    }
    displayedNotes.notes = searchNote.searchNotesCache[searchTerm];
    pageService.updatePages(displayedNotes.notes);
  };
}

function link (scope) {
  scope.$watch('ctrl.searchNote.searchTerm.$', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      scope.ctrl.applySearchNotes(newValue);
    }
  });
}

function searchInput () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/search-input.drv.html',
    scope: {},
    controller: searchInputController,
    controllerAs: 'ctrl',
    bindToController: true,
    link: link
  };
}

angular.module('simpleNote').directive('searchInput', searchInput);
