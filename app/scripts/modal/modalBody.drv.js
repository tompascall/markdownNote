'use strict';

function modalBody () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/modal/modal-body.drv.html'
  };
}

angular.module('simpleNote').directive('modalBody', modalBody);
