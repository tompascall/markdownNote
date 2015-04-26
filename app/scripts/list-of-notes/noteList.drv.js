// noteList.drv.js

'use strict';

angular.module('simpleNote').directive('noteList', noteList);

function noteList () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/list-of-notes/note-list.drv.html',
    controller: noteListCtrl,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };

  function noteListCtrl (noteData) {
    this.notes = noteData.notes;
    this.opened = false;
  }
}


