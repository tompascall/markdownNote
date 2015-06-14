// saveToDropbox.drv.js

'use strict';

function saveToDropbox () {

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

    controller.saveText = function () {
      // if (fileService.deviceReady) {

      //   controller.onDeviceReady(fileService.rootDirectory);
      // }
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
