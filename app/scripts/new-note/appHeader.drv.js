// appHeader.drv.js

'use strict';

function appHeaderDirective ($ionicModal) {

  function appHeaderController ($scope) {
    var controller = this;

    $ionicModal.fromTemplateUrl('scripts/new-note/new-note-modal.html', {
        scope: $scope,
        focusFirstInput: true
      })
    .then(function (modal) {
      controller.newNoteModal = modal;
    });

    controller.showModal = function (modal) {
      modal.show();
    };

    controller.hideModal = function (modal) {
      modal.hide();
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'scripts/new-note/app-header.drv.html',
    controller: appHeaderController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };
}

angular.module('simpleNote').directive('appHeader', appHeaderDirective);
