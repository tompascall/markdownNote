// noteList.drv.js

'use strict';

function noteList () {

  function noteListCtrl (noteData) {
    /*jshint validthis: true */
    var controller = this;
    noteData.initStateOfNotes();
    controller.noteData = noteData;
    controller.notes = noteData.notes;
    controller.stateOfNotes = noteData.stateOfNotes;
    controller.toggleNoteState = function (note) {
      noteData.stateOfNotes[note.id].opened = !noteData.stateOfNotes[note.id].opened;
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


