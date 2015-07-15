// appHeader.drv.js

'use strict';

function appHeaderDirective () {

  function appHeaderController ($scope,
    $ionicModal, noteData, searchNote, fileService, messageService, ENV) {
    /*jshint validthis: true */
    var controller = this;
    controller.fileService = fileService;
    controller.messageService = messageService;

    switch (ENV.name) {
      case 'development':
        controller.environment = {
          development: true
        };
        break;
      case 'production':
        controller.environment = {
          production: true
        };
        break;
      case 'productionOnline':
        controller.environment = {
          productionOnline: true
        };
        break;
      case 'developmentOnline':
        controller.environment = {
	  developmentOnline: true
	};	
      default:
        throw new Error('Unknown environment');
    };

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
      if (modal === controller.extrasModal) {
        controller.messageService.clearExtrasModalMessages();
      }
      else if (modal === controller.newNoteModal) {
        controller.title = '';
        controller.text = '';
        controller.tags = '';
      }
      modal.hide();
    };

    controller.noteData = noteData;

    controller.searchNote = searchNote;

    controller.addNewNote = function () {
      var newNote = {
        title: controller.title,
        text: controller.text,
        tags: controller.tags,
      };

      noteData.addNote(newNote);
      controller.hideModal(controller.newNoteModal);
    };

    /* just for testing purpose - add amount of welcomeNote to noteData */
    controller.addTestNotes = function (amount) {
      $scope.$applyAsync(function () {
        for (var i = 0; i < amount; i++) {
         controller.noteData.addNote(controller.noteData.welcomeNote);
        }
      });
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

angular.module('markdownNote').directive('appHeader', appHeaderDirective);
