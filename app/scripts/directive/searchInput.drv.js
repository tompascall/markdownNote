// searchInput.drv.js

'use strict';

function searchInputController (searchNote) {
  /*jshint validthis: true */
  var controller = this;
  controller.searchNote = searchNote;

  controller.applySearchNotes = function () {
    console.log('in applySearchNotes');
  };
}

function link (scope) {
  scope.$watch('ctrl.searchNote.searchTerm', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      scope.ctrl.applySearchNotes();
    }
    else {console.log('nothing is changed');}
  });
}

function searchInput () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/search-input.drv.html',
    scope: {},
    controller: searchInputController,
    controllerAs: 'ctrl',
    bindToController: true,
    link: link
  };
}

angular.module('simpleNote').directive('searchInput', searchInput);
