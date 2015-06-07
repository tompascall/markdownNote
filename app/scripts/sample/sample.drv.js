// sample.drv.js

'use strict';

angular.module('markdownNote').directive('sampleDirective', function () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/sample/sample.drv.html'
  };
});
