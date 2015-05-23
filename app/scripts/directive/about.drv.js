// about.drv.js

'use strict';

function aboutDirective (aboutService, externalLinkService) {

  function aboutController () {

    var controller = this;
    controller.aboutService = aboutService;
    controller.externalLinkService = externalLinkService;

    controller.toggleAboutMessage = function () {
      controller.aboutService.showAboutMessage = !controller.aboutService.showAboutMessage;
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
