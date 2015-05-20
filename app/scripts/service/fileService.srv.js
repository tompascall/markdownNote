// fileService.srv.js

'use strict';

function fileService () {
  var fileService = {
    deviceReady: false,
    supportedPlatforms: {
      'Android' : {
        rootDirectory: cordova.file.externalRootDirectory,
        filePath: 'download/simpleNotes.json'
      },
      'iOS': {
        rootDirectory: cordova.file.applicationStorageDirectory,
        filePath: 'Library/simpleNotes.json'
      }
    }
  };

  fileService.setDeviceReady = function () {
    fileService.deviceReady = true;
  };

  fileService.setPlatform = function () {
    var platform = fileService.supportedPlatforms[device.platform]
    if (platform) {
      fileService.platform = device.platform;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setRootDirectory = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.rootDirectory = platform.rootDirectory;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setFilePath = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.filePath = platform.filePath;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
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
