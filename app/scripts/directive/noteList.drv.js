// noteList.drv.js

'use strict';

function noteList () {


  function noteListCtrl (noteData, $ionicModal, $scope, searchNote, $ionicScrollDelegate, externalLinkService) {

    /*jshint validthis: true */
    var controller = this;
    noteData.initNotes();
    controller.noteData = noteData;
    controller.searchNote = searchNote;
    controller.externalLinkService = externalLinkService;

    $ionicModal.fromTemplateUrl('scripts/modal/edit-note-modal.html', {
        scope: $scope,
        focusFirstInput: false
      })
    .then(function (modal) {
      controller.editNoteModal = modal;
    });

    controller.toggleNoteState = function (note) {
      note.opened = !note.opened;
      $ionicScrollDelegate.resize();
    };

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

    controller.setNoteInput = function (note) {
      controller.noteInput = controller.cloneNote(note);
    };

    controller.editNote = function (note, event) {
      if (event) {
        event.stopPropagation();
      }
      controller.note = note;
      controller.setNoteInput(note);
      controller.showModal(controller.editNoteModal);
    };

    controller.updateNotes = function (note) {
      noteData.updateNotes(note, controller.noteInput);
      controller.noteInput.title = '';
      controller.noteInput.text = '';
      controller.noteInput.tags = '';
      controller.hideModal(controller.editNoteModal);
    };

    // controller.launchExternalLink = function (event) {
    //   var linkElementString = event.target.toString();
    //   if (linkElementString) {
    //     window.open(linkElementString, '_system', 'location=yes');
    //   }
    // };

    // controller.handleLinkClicked = function (event) {
    //   if (event.target.nodeName === 'A') {  // target is a link
    //     event.preventDefault();
    //     event.stopPropagation();
    //     controller.launchExternalLink(event);
    //   }
    // };

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


