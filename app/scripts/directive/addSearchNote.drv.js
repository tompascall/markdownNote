// addSearchNote.drv.js

'use strict';

function addSearchNoteController (searchNote) {
  /*jshint validthis: true */
  this.searchNote = searchNote;
}

function addSearchNote () {
  return {
    restrict: 'A',
    controller: addSearchNoteController,
    controllerAs: 'addSearchNoteCtrl'
  };
}

angular.module('simpleNote').directive('addSearchNote', addSearchNote);
