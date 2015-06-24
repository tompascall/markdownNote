// messageService.srv.js

'use strict';

function messageService () {
  return {
    messages: {
      showAboutMessage: false,
      loadLocalFileMessage: false,
      saveLocalFileMessage: false,
      dropboxWriteMessage: false,
      dropboxReadMessage: false,

    },

    clearExtrasModalMessages: function () {
      this.messages.showAboutMessage = false;
      this.messages.loadLocalFileMessage = false;
      this.messages.saveLocalFileMessage = false;
      this.messages.dropboxWriteMessage = false;
      this.messages.dropboxReadMessage = false;
    }
  };
}

angular.module('markdownNote').factory('messageService', messageService);
