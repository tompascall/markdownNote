// appHeader.drv.js

'use strict';

function appHeaderDirective () {

  function appHeaderController ($scope, $ionicModal, noteData, tagsFactory) {
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

    controller.prepareNewNote = function () {
      var note = {};
      note.title = controller.title;
      note.text = controller.text;
      note.tags = tagsFactory.filterTagsString(controller.tags);
      return note;
    };

    controller.noteData = noteData;

    controller.addNewNote = function () {
      var note = controller.prepareNewNote();
    }
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
