// loadFile.drv.js

'use strict';

function loadFile (fileService, noteData) {

  function loadFileController ($scope) {

    // only testing purpose to trigger deviceready event, must be delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //$(document).trigger('deviceready');

   /*jshint validthis: true */
    var controller = this;
    controller.fileService = fileService;

    controller.fail = function (error) {
      console.log('ERROR: ' + error.code);
    };

    controller.readAsText = function (file) {
      var reader = new FileReader();

      reader.onloadend = function (evt) {
        $scope.$apply(function () {
          controller.fileService.loadMessage = 'Your notes has been updated from simpleNotes.json file';
          noteData.backupNotesFromBackupData(evt.target.result);
        });
      };

      reader.readAsText(file);
    };

    controller.gotFileEntry = function (fileEntry) {
      fileEntry.file(controller.readAsText, controller.fail);
    };

    controller.onResolveSuccess = function (directoryEntry) {
      directoryEntry.getFile(fileService.filePath,
        null, controller.gotFileEntry, controller.fail);
    };

    controller.onDeviceReady = function (rootDirectory) {
      window.resolveLocalFileSystemURL(rootDirectory, controller.onResolveSuccess, controller.fail);
    };

    controller.confirmBackuping = function () {
      return confirm('You are about to update your notes from simpleNotes.json file. ' +
        'It can result in losing some data if data of your notes are newer ' +
        'than the data in the backup file. Are you sure you want to backup data?');
    };

    controller.loadText = function () {
      if (fileService.deviceReady) {
        if (controller.confirmBackuping()) {
          controller.onDeviceReady(fileService.rootDirectory);
        }
      }
    };
  }

  return {
    restrict: 'E',
    controller: loadFileController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/load-file.drv.html'
  };
}

angular.module('simpleNote').directive('loadFile', loadFile);
