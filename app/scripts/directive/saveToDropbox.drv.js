// saveToDropbox.drv.js

'use strict';

function saveToDropbox (dropboxService, $q, messageService) {

  function saveToDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      //$scope.$apply(function () {
        controller.messageService.dropBoxMessage = message;
      //});
    };

    controller.authentication = function () {
      return $q(function (resolve, reject) {
        dropboxService.client.authenticate(function (error, client) {
          if (error) {
            reject(error);
          }
          else {
            console.log('from promise, succeeded');
            resolve(client);
          }
        });
      });
    };

    controller.isAuthenticated = function () {
      return dropboxService.client.isAuthenticated();
    };

    controller.dropErrorHandler = function (error) {
      dropboxService.errorHandlers[error.status].errorHandler();
    };

    controller.save = function () {
      if (!controller.isAuthenticated()) {
        controller.authentication()
          .then(function (client) {
            console.log('authentication succeeded');
            controller.setMessage('authentication succeeded');
            client.signOut();
          })
          .catch(function (error) {
            controller.setMessage(error.status);
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
