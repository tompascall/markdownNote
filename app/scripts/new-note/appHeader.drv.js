// appHeader.drv.js

'use strict';

function appHeaderDirective () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/new-note/app-header.drv.html'
  };
}

angular.module('simpleNote').directive('appHeader', appHeaderDirective);
