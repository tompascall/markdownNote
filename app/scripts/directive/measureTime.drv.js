// measureTime.drv.js

'use strict';

function measureTime ($timeout, $log) {
  var start;
  return function(scope) {
    if (scope.$first) {
      start = new Date();
    }
    if (scope.$last) {
       $timeout(function () {
          var end = new Date();
          $log.debug('## DOM rendering list took: ' + (end - start) + ' ms');
       });
     }
  };
}

angular.module('simpleNote').directive('measureTime', measureTime);
