// displayedNotes.srv.js

'use strict';

function displayedNotes () {
  return {
    notes: [],
    setDisplayedNotes: function (referencedNotes) {
      if (!angular.isArray(referencedNotes)) {
        throw new Error('Ivalid argument to setDisplayedNotes');
      }
      this.notes = referencedNotes.slice(); // clone array
    }
  };
}

angular.module('simpleNote').factory('displayedNotes', displayedNotes);
