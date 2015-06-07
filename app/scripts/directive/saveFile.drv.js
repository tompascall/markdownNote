// saveFile.drv.js

'use strict';

function saveFile (fileService, noteData, messageService) {

  function saveFileController ($scope) {

    // only testing purpose to trigger deviceready event, must be delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //$(document).trigger('deviceready');

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.saveMessage = message;
        controller.messageService.loadMessage = false;
      });
    };

    controller.fail = function (error) {
      controller.setMessage('ERROR: ' + error.code);
      console.log('ERROR: ' + error.code);
    };

    controller.gotFileWriter = function (writer) {
      writer.write(noteData.loadStringNotesFromStorage());

      writer.onwrite = function(evt) {
        controller.setMessage('Write succeeded');
        console.log('write succeeded: ' + evt.toString());
      };
    };

    controller.gotFileEntry = function (fileEntry) {
      fileEntry.createWriter(controller.gotFileWriter, controller.fail);
    };

    controller.onResolveSuccess = function (directoryEntry) {
      directoryEntry.getFile(fileService.filePath,
        {create: true, exclusive: false}, controller.gotFileEntry, controller.fail);
    };

    controller.onDeviceReady = function (rootDirectory) {
      window.resolveLocalFileSystemURL(rootDirectory, controller.onResolveSuccess, controller.fail);
    };

    controller.saveText = function () {
      if (fileService.deviceReady) {
        // console.log('in saveText, calling onDeviceReady');
        // console.log('deviceready: ' + fileService.deviceReady);
        // console.log('platform: ' + fileService.platform);
        // console.log('root: ' + fileService.rootDirectory);
        // console.log('filePath: ' + fileService.filePath);
        controller.onDeviceReady(fileService.rootDirectory);
      }
    };
  }

  return {
    restrict: 'E',
    controller: saveFileController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/save-file.drv.html'
  };
}

angular.module('markdownNote').directive('saveFile', saveFile);
