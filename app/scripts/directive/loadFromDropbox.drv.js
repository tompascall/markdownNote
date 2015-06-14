// loadFromDropbox.drv.js

'use strict';

function loadFromDropbox () {

  function loadFromDropboxController () {

   /*jshint validthis: true */
    var controller = this;
    //controller.messageService = messageService;

    // controller.setMessage = function (message) {
    //   $scope.$apply(function () {
    //     controller.messageService.saveMessage = message;
    //     controller.messageService.loadMessage = false;
    //   });
    // };

    controller.saveText = function () {
      // if (fileService.deviceReady) {

      //   controller.onDeviceReady(fileService.rootDirectory);
      // }
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
