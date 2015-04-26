// noteList.drv.js

'use strict';

function noteList () {

  function noteListCtrl (noteData) {
    /*jshint validthis: true */
    var isolated = this;
    isolated.notes = noteData.notes;
    isolated.opened = false;
    isolated.toggleNoteState = function () {
      isolated.opened = !isolated.opened;
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'scripts/list-of-notes/note-list.drv.html',
    controller: noteListCtrl,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };
}

angular.module('simpleNote').directive('noteList', noteList);


