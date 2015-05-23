// fileService.srv.js

'use strict';

function fileService () {
  var fileService = {
    deviceReady: false,
  };

  fileService.setDeviceReady = function () {
    fileService.deviceReady = true;
  };

  fileService.setSupportedPlatforms = function () {
    fileService.supportedPlatforms = {
      'Android' : {
        rootDirectory: cordova.file.externalRootDirectory,
        filePath: 'download/simpleNote.json'
      },
      'iOS': {
        rootDirectory: cordova.file.applicationStorageDirectory,
        filePath: 'Library/simpleNote.json'
      }
    };
  };

  fileService.setPlatform = function () {
    var platform = fileService.supportedPlatforms[device.platform];
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
    fileService.setSupportedPlatforms();
    fileService.setPlatform();
    fileService.setRootDirectory();
    fileService.setFilePath();
    // console.log('deviceready: ' + fileService.deviceReady);
    // console.log('platform: ' + fileService.platform);
    // console.log('root: ' + fileService.rootDirectory);
    // console.log('filePath: ' + fileService.filePath);
  };

  $(document).on('deviceready', fileService.setupFileService);
  return fileService;
}

angular.module('simpleNote').factory('fileService', fileService);
