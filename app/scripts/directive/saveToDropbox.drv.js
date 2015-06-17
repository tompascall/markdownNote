// saveToDropbox.drv.js

'use strict';

function saveToDropbox (dropboxService, $q, messageService, noteData) {

  function saveToDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      controller.messageService.dropboxMessage = message;
    };

    controller.authentication = function () {
      return $q(function (resolve, reject) {
        dropboxService.client.authenticate(function (error, client) {
          if (error) {
            reject(error);
          }
          else {
            resolve(client);
          }
        });
      });
    };

    controller.writeDataToDropbox = function (client) {
      var localData = noteData.loadStringNotesFromStorage();
    };

    controller.isAuthenticated = function () {
      return dropboxService.client.isAuthenticated();
    };

    controller.dropErrorHandler = function (error) {
      var message = dropboxService.errorHandlers[error.status].errorHandler();
      controller.setMessage(message);
    };

    controller.save = function () {
      if (!controller.isAuthenticated()) {
        controller.authentication()
          .then(function (client) {
            controller.setMessage('Dropbox authentication succeeded');
            return client;
          })
          .then(function (client) {
            controller.writeDataToDropbox(client);
          })
          .catch(function (error) {
            controller.dropErrorHandler(error);
          });
      }
      else {
        console.log('already authenticated');
      }
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
