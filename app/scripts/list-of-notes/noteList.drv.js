// noteList.drv.js

'use strict';

function noteList ($ionicModal) {


  function noteListCtrl (noteData, $scope) {

    /*jshint validthis: true */
    var controller = this;
    noteData.initStateOfNotes();
    controller.noteData = noteData;
    controller.notes = noteData.notes;
    controller.stateOfNotes = noteData.stateOfNotes;

    $ionicModal.fromTemplateUrl('scripts/new-note/new-note-modal.html', {
        scope: $scope,
        focusFirstInput: true
      })
    .then(function (modal) {
      controller.newNoteModal = modal;
    });

    controller.toggleNoteState = function (note) {
      noteData.stateOfNotes[note.id].opened = !noteData.stateOfNotes[note.id].opened;
    };

    controller.showNewNoteModal = function () {
      controller.newNoteModal.show();
    };

    controller.hideNewNoteModal = function () {
      controller.newNoteModal.hide();
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


