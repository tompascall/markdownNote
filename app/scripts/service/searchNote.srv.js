// searchNote.srv.js

'use strict';

function searchNote() {
  return {
    searchTerm: ''
  };
}

angular.module('simpleNote').factory('searchNote', searchNote);
