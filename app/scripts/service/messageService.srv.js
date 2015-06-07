// messageService.srv.js

'use strict';

function messageService () {
  return {
    showAboutMessage: false,
    loadMessage: false,
    saveMessage: false,
    clearExtrasModalMessages: function () {
      this.showAboutMessage = false;
      this.loadMessage = false;
      this.saveMessage = false;
    }
  };
}

angular.module('markdownNote').factory('messageService', messageService);
