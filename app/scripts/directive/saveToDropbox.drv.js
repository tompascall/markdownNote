// saveToDropbox.drv.js

'use strict';

function saveToDropbox (dropboxService, messageService, noteData, ENV) {

  function saveToDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.clearExtrasModalMessages();
        controller.messageService.messages.dropboxSaveMessage = message;
      });
    };

    controller.writeDataToDropbox = function (client) {
      var localData = noteData.loadStringNotesFromStorage();
      return dropboxService.writeFile(ENV.fileName, localData);
    };

    controller.save = function () {
      dropboxService.authentication()
      .then(function () {
        return controller.writeDataToDropbox();
      })
      .then(function (message) {
        controller.setMessage('Writing data to Dropbox has succeeded.');
      })
      .catch(function (errorMessage) {
        controller.setMessage(errorMessage);
      });
    };
  }

  return {
    restrict: 'E',
    controller: saveToDropboxController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/save-to-dropbox.drv.html'
  };
}

angular.module('markdownNote').directive('saveToDropbox', saveToDropbox);
