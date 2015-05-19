// fileService.srv.js

'use strict';

function fileService () {
  var fileService = {
    deviceReady: false,
    supportedPlatforms: ['Android', 'iOS']
  };

  fileService.setDeviceReady = function () {
    fileService.deviceReady = true;
  };

  fileService.setPlatform = function () {
    if (fileService.supportedPlatforms.indexOf(device.platform) !== -1) {
      fileService.platform = device.platform;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setRootDirectory = function () {
    switch (fileService.platform) {
      case 'Android':
        fileService.rootDirectory = cordova.file.externalRootDirectory;
        break;
      case 'iOS':
        fileService.rootDirectory = cordova.file.applicationStorageDirectory;
        break;
      default:
        fileService.rootDirectory = 'platform not supported'
    }
  };

  fileService.setFilePath = function () {
    switch (fileService.platform) {
      case 'Android':
        fileService.filePath = 'download/simpleNotes.json';
        break;
      case 'iOS':
        fileService.filePath = 'Library/simpleNotes.json';
        break;
      default:
        fileService.filePath = 'platform not supported'
    }
  };

  fileService.setupFileService = function () {
    fileService.setDeviceReady();
    fileService.setPlatform();
    fileService.setRootDirectory();
    fileService.setFilePath();
  };

  $(document).on('deviceready', fileService.setupFileService);

  return fileService;
}

angular.module('simpleNote').factory('fileService', fileService);
