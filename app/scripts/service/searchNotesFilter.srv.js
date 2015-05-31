// searchNotesFilter.srv.js

'use strict';

function searchNotesFilter ($filter) {
  return function(input, searchTerm) {
    return $filter('filter')(input, searchTerm);
  };
}

angular.module('simpleNote').filter('searchNotes', searchNotesFilter);
