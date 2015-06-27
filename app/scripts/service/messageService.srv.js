// messageService.srv.js

'use strict';

function messageService ($rootScope) {
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
    },

    applyMessage: function (options) {
      var self = this;
      $rootScope.$apply(function () {
        self.messages[options.messageType] = options.message;
      });
    },

    getMessage: function (options) {
      return this.messages[options.messageType];
    },

    setMessage: function (options) {
      this.messages[options.messageType] = options.message;
    }
  };
}

angular.module('markdownNote').factory('messageService', messageService);
