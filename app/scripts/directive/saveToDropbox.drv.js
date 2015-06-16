// saveToDropbox.drv.js

'use strict';

function saveToDropbox (dropboxService, $q) {

  function saveToDropboxController () {

   /*jshint validthis: true */
    var controller = this;
    //controller.messageService = messageService;

    // controller.setMessage = function (message) {
    //   $scope.$apply(function () {
    //     controller.messageService.saveMessage = message;
    //     controller.messageService.loadMessage = false;
    //   });
    // };
    controller.authentication = function () {
      return $q(function (resolve, reject) {
        dropboxService.client.authenticate(function (error, client) {
          if (error) {
            reject(error.status);
          }
          else {
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
      // if (fileService.deviceReady) {

      //   controller.onDeviceReady(fileService.rootDirectory);
      // }
      if (!controller.isAuthenticated()) {
        controller.authentication()
          .catch(function (error) {
            controller.dropErrorHandler(error);
          });
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
