// aboutService.srv.js

'use strict';

function aboutService () {
  return {
    showAboutMessage: false
  };
}

angular.module('simpleNote').factory('aboutService', aboutService);
