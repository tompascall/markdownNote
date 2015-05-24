// about.drv.js

'use strict';

function aboutDirective (messageService, externalLinkService) {

  function aboutController () {
    /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;
    controller.externalLinkService = externalLinkService;

    controller.toggleAboutMessage = function () {
      controller.messageService.showAboutMessage = !controller.messageService.showAboutMessage;
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
