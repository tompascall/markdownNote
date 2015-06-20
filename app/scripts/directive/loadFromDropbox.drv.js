// loadFromDropbox.drv.js

'use strict';

function loadFromDropbox (dropboxService, messageService) {

  function loadFromDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.clearExtrasModalMessages();
        controller.messageService.messages.dropboxLoadMessage = message;
      });
    };

    controller.confirmLoadFromDropbox = function () {
      return confirm('You are about to update your notes from your Dropbox. ' +
        'It can result in losing some data if local data are newer ' +
        'than the data in the backup file. Are you sure you want to load data?');
    };

    controller.load = function () {
      if (controller.confirmLoadFromDropbox()) {
        dropboxService.authentication()
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
