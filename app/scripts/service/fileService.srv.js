// fileService.srv.js

'use strict';

function fileService () {
  var fileService = {
    deviceReady: false
  };

  return fileService;
}

angular.module('simpleNote').factory('fileService', fileService);
