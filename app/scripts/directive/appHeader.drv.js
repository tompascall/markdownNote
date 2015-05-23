// appHeader.drv.js

'use strict';

function appHeaderDirective () {

  function appHeaderController ($scope, $ionicModal, noteData, searchNote, fileService) {
    /*jshint validthis: true */
    var controller = this;
    controller.fileService = fileService;

    $ionicModal.fromTemplateUrl('scripts/modal/new-note-modal.html', {
        scope: $scope,
        focusFirstInput: true
      })
    .then(function (modal) {
      controller.newNoteModal = modal;
    });

    $ionicModal.fromTemplateUrl('scripts/modal/extras-modal.html', {
        scope: $scope
      })
    .then(function (modal) {
      controller.extrasModal = modal;
    });

    controller.showModal = function (modal) {
      modal.show();
    };

    controller.hideModal = function (modal) {
      //if (modal === controller.extrasModal) {
        controller.fileService.loadMessage = '';
      //}
      modal.hide();
    };

    controller.noteData = noteData;

    controller.searchNote = searchNote;

    controller.addNewNote = function () {
      var newNote = {
        title: controller.title,
        text: controller.text,
        tags: controller.tags
      };

      noteData.addNote(newNote);
      controller.title = '';
      controller.text = '';
      controller.tags = '';
      controller.hideModal(controller.newNoteModal);
    };

    $scope.$on('$destroy', function() {
      controller.newNoteModal.remove();
      controller.extrasModal.remove();
    });
  }

  return {
    restrict: 'A',
    templateUrl: 'scripts/directive/app-header.drv.html',
    controller: appHeaderController,
    controllerAs: 'ctrl',
    scope: {
    },
    bindToController: true
  };
}

angular.module('simpleNote').directive('appHeader', appHeaderDirective);
