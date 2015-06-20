// loadFromDropbox.drv.js

'use strict';

function loadFromDropbox (dropboxService) {

  function loadFromDropboxController () {

   /*jshint validthis: true */
    var controller = this;
    //controller.messageService = messageService;

    controller.isAuthenticated = function () {
      return dropboxService.client.isAuthenticated();
    };

    controller.confirmLoadFromDropbox = function () {
      return confirm('You are about to update your notes from your Dropbox. ' +
        'It can result in losing some data if local data are newer ' +
        'than the data in the backup file. Are you sure you want to load data?');
    };

    controller.authentication = function () {
      console.log('hey');
    };

    controller.load = function () {
      if (controller.confirmLoadFromDropbox()) {
        if (!controller.isAuthenticated()) {
          controller.authentication();
        }
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
