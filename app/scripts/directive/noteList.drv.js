// noteList.drv.js

'use strict';

function noteList () {


  function noteListCtrl (noteData, $ionicModal, $scope, searchNote) {

    /*jshint validthis: true */
    var controller = this;
    noteData.initNotes();
    controller.noteData = noteData;
    controller.searchNote = searchNote;

    controller.toggleNoteState = function (note) {
      note.opened = !note.opened;
    };

    $ionicModal.fromTemplateUrl('scripts/modal/edit-note-modal.html', {
        scope: $scope,
        focusFirstInput: false
      })
    .then(function (modal) {
      controller.editNoteModal = modal;
    });

    controller.showModal = function (modal) {
      modal.show();
    };

    controller.hideModal = function (modal) {
      modal.hide();
    };

    controller.cloneNote = function (note) {
      var cloneNote = {};
      for (var key in note) {
        cloneNote[key] = note[key];
      }
      return cloneNote;
    };

    controller.setEditedNote = function (note) {
      controller.editedNote = controller.cloneNote(note);
    };

    controller.editNote = function (note, event) {
      if (event) {
        event.stopPropagation();
      }
      controller.note = note;
      controller.setEditedNote(note);
      controller.showModal(controller.editNoteModal);
    };

    controller.updateNotes = function (note) {
      noteData.updateNotes(note, controller.editedNote);
      controller.editedNote.title = '';
      controller.editedNote.text = '';
      controller.editedNote.tags = '';
      controller.hideModal(controller.editNoteModal);
    };

    controller.getLinkTarget = function (linkElementString) {
      var matched = linkElementString.match(/href="(\S*?)"/);
      return matched ? matched[1] : '#';
    };

    controller.launchExternalLink = function (event) {
      var target;
      var targetString = event.target;
      if (targetString) {
        target = controller.getLinkTarget(event.target);
        window.open(target, '_system', 'location=yes');
      }
    };

    controller.handleLinkClicked = function (event) {
      if (event.target.nodeName === 'A') {
        event.preventDefault();
        event.stopPropagation();
        controller.launchExternalLink(event);
      }
    };

    $scope.$on('$destroy', function() {
      controller.editNoteModal.remove();
    });
  }


  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/note-list.drv.html',
    controller: noteListCtrl,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };
}

angular.module('simpleNote').directive('noteList', noteList);


