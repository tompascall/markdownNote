// loadFile.drv.js

'use strict';

function loadFile (fileService) {

  function loadFileController ($scope) {

    // only testing purpose to trigger deviceready event, must be delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //$(document).trigger('deviceready');

   /*jshint validthis: true */
    var controller = this;

    controller.fail = function (error) {
      console.log('ERROR: ' + error.code);
    };

    controller.readAsText = function (file) {
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        $scope.$apply(function () {
          controller.loadedText = evt.target.result;
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

    controller.loadText = function () {
      if (fileService.deviceReady) {
        controller.onDeviceReady(fileService.rootDirectory);
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
