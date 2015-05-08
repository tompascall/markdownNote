// searchInput.drv.js

'use strict';

function searchInput () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/search-input.drv.html'
  };
}

angular.module('simpleNote').directive('searchInput', searchInput);
