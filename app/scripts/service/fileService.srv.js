// fileService.srv.js

'use strict';

function fileService (ENV) {
  /*jshint -W004 */  // to skip 'fileService is already defined' jshint message
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
        fileName: ENV.fileName,
        filePath: ENV.Android.filePath
      },
      'iOS': {
        rootDirectory: cordova.file.applicationStorageDirectory,
        fileName: ENV.fileName,
        filePath: ENV.iOS.filePath
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

  fileService.setFileName = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.fileName = platform.fileName;
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
    fileService.setFileName();
    // console.log('deviceready: ' + fileService.deviceReady);
    // console.log('platform: ' + fileService.platform);
    // console.log('root: ' + fileService.rootDirectory);
    // console.log('filePath: ' + fileService.filePath);
    // console.log('fileName: ' + fileService.fileName);
  };

  $(document).on('deviceready', fileService.setupFileService);
  return fileService;
}

angular.module('markdownNote').factory('fileService', fileService);
