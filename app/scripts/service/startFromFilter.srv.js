// startFromFilter.srv.js

'use strict';

function startFromFilter () {
  return function(input, start) {
    return input.slice(start);
  };
}

angular.module('simpleNote').filter('startFrom', startFromFilter);
