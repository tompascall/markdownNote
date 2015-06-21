// messageService.srv.js

'use strict';

function messageService () {
  return {
    messages: {
      showAboutMessage: false,
      loadLocalFileMessage: false,
      saveLocalFileMessage: false,
      dropboxSaveMessage: false,
      dropboxLoadMessage: false,

    },

    clearExtrasModalMessages: function () {
      this.messages.showAboutMessage = false;
      this.messages.loadLocalFileMessage = false;
      this.messages.saveLocalFileMessage = false;
      this.messages.dropboxSaveMessage = false;
      this.messages.dropboxLoadMessage = false;
    }
  };
}

angular.module('markdownNote').factory('messageService', messageService);
