// loadFromDropbox.drv.js

'use strict';

function loadFromDropbox (dropboxService, messageService, ENV, noteData) {

  function loadFromDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      messageService.clearExtrasModalMessages();
      messageService.applyMessage({
        messageType: 'dropboxReadMessage',
        message: message
      });
    };

    controller.confirmLoadFromDropbox = function () {
      return confirm('You are about to update your notes from your Dropbox. ' +
        'It can result in losing some data if local data are newer ' +
        'than the data in the backup file. Are you sure you want to load data?');
    };

    controller.readDataFromDropbox = function () {
      return dropboxService.readFile(ENV.fileName);
    };

    controller.updateLocalData = function (data) {
      noteData.backupNotesFromBackupData(data);
    };

    controller.load = function () {
      if (controller.confirmLoadFromDropbox()) {
        dropboxService.authentication()
        .then(function () {
          return controller.readDataFromDropbox();
        })
        .then(function (data) {
          controller.updateLocalData(data);
          controller.setMessage('Fetching data from Dropbox has succeeded.');
        })
        .catch(function (errorMessage) {
          controller.setMessage(errorMessage);
        });
      }
    };
  }

  return {
    restrict: 'E',
    controller: loadFromDropboxController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/load-from-dropbox.drv.html'
  };
}

angular.module('markdownNote').directive('loadFromDropbox', loadFromDropbox);
