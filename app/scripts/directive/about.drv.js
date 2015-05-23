// about.drv.js

'use strict';

function aboutDirective () {

  function aboutController () {

    var controller = this;
    controller.showMessage = false;

    controller.toggleAboutMessage = function () {
      controller.showMessage = !controller.showMessage;
    };
  }

  return {
    restrict: 'E',
    controller: aboutController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/about.drv.html'
  };
}

angular.module('simpleNote').directive('about', aboutDirective);
