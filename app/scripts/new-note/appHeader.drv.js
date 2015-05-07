// appHeader.drv.js

'use strict';

function appHeaderDirective () {

  function appHeaderController ($scope, $ionicModal, noteData) {
    /*jshint validthis: true */
    var controller = this;

    $ionicModal.fromTemplateUrl('scripts/new-note/new-note-modal.html', {
        scope: $scope,
        focusFirstInput: true
      })
    .then(function (modal) {
      controller.newNoteModal = modal;
    });

    controller.showModal = function (modal) {
      modal.show();
    };

    controller.hideModal = function (modal) {
      modal.hide();
    };

    controller.noteData = noteData;

    controller.addNewNote = function () {
      var newNote = {
        title: controller.title,
        text: controller.text,
        tags: controller.tags
      };

      newNote = noteData.prepareNote(newNote);
      noteData.addNote(newNote);
      controller.title = '';
      controller.text = '';
      controller.tags = '';
      controller.hideModal(controller.newNoteModal);
    };

    $scope.$on('$destroy', function() {
      controller.newNoteModal.remove();
    });
  }

  return {
    restrict: 'A',
    templateUrl: 'scripts/new-note/app-header.drv.html',
    controller: appHeaderController,
    controllerAs: 'ctrl',
    scope: {
    },
    bindToController: true
  };
}

angular.module('simpleNote').directive('appHeader', appHeaderDirective);
