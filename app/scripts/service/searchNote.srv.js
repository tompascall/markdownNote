// searchNote.srv.js

'use strict';

function searchNote() {
  return {
    searchTerm: '',
    opened: false,
    toggleSearchInput: function () {
      this.opened = !this.opened;
    }
  };
}

angular.module('simpleNote').factory('searchNote', searchNote);
