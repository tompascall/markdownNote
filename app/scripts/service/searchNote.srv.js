// searchNote.srv.js

'use strict';

function searchNote($ionicScrollDelegate, searchNotesFilter, noteData) {
  return {
    searchTerm: '',
    opened: false,
    searchNotesCache: {},

    toggleSearchInput: function () {
      this.opened = !this.opened;
      $ionicScrollDelegate.scrollTop();
    },

    hasCacheEntry: function (entryName) {
      return !!this.searchNotesCache[entryName];
    },

    createCacheEntry: function (searchTerm) {
      this.searchNotesCache[searchTerm] = searchNotesFilter(noteData.notes, searchTerm);
    }
  };
}

angular.module('simpleNote').factory('searchNote', searchNote);
