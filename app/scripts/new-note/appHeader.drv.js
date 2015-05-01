// appHeader.drv.js

'use strict';

function appHeaderDirective () {

  function appHeaderController ($scope, $ionicModal) {
    /*jshint validthis: true */
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
    restrict: 'A',
    templateUrl: 'scripts/new-note/app-header.drv.html',
    controller: appHeaderController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };
}

angular.module('simpleNote').directive('appHeader', appHeaderDirective);
