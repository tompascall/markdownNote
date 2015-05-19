// fileService.srv.js

'use strict';

function fileService () {
  var fileService = {
    deviceReady: false
  };

  fileService.setDeviceReady = function () {
    fileService.deviceReady = true;
  };

  fileService.setPlatform = function () {
    fileService.platform = device.platform;
  };

  return fileService;
}

angular.module('simpleNote').factory('fileService', fileService);
