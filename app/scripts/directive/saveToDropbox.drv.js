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

    controller.authentication = function () {
      return new Promise(function (resolve, reject) {
        dropboxService.client.authenticate(function (error, client) {
          if (error) {
            reject(error);
          }
          else {
            resolve(client);
            dropboxService.client = client;
            console.log('resolve authentication');
          }
        });
      });
    };

    controller.writeDataToDropbox = function (client) {
      var localData = noteData.loadStringNotesFromStorage();
      if (client) {
        return new Promise(function (resolve, reject) {
          client.writeFile(ENV.fileName, localData, function (error, stat) {
            if (error) {
              console.log(error.toString());
              reject(error);
            }
            else {
              console.log('Writing data to Dropbox has succeeded.');
              controller.setMessage('Writing data to Dropbox has succeeded.');
              resolve(stat);
            }
          });
        });
      }
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
        controller.writeDataToDropbox(dropboxService.client);
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
