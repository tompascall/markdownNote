// noteList.drv.js

'use strict';

function noteList () {


  function noteListCtrl (noteData) {

    /*jshint validthis: true */
    var controller = this;
    noteData.initNotes();
    controller.noteData = noteData;
    controller.notes = noteData.notes;

    controller.toggleNoteState = function (note) {
      //noteData.stateOfNotes[note.id].opened = !noteData.stateOfNotes[note.id].opened;
      note.opened = !note.opened;
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


