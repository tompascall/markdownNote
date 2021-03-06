// about.drv.js

'use strict';

function aboutDirective (messageService, externalLinkService) {

  function aboutController () {
    /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;
    controller.externalLinkService = externalLinkService;

    controller.toggleAboutMessage = function () {
      if (!controller.messageService.messages.showAboutMessage) {
        controller.messageService.clearExtrasModalMessages();
      }
      controller.messageService.messages.showAboutMessage = !controller.messageService.messages.showAboutMessage;
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

angular.module('markdownNote').directive('about', aboutDirective);
