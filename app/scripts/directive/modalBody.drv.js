'use strict';

function editNoteModalBody () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/edit-note-modal-body.drv.html'
  };
}

angular.module('markdownNote').directive('editNoteModalBody', editNoteModalBody);
