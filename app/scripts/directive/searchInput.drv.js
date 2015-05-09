// searchInput.drv.js

'use strict';

function searchInputController (searchNote) {
  this.searchNote = searchNote;
}

function searchInput () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/search-input.drv.html',
    scope: {},
    controller: searchInputController,
    controllerAs: 'ctrl',
    bindToController: true
  };
}

angular.module('simpleNote').directive('searchInput', searchInput);
