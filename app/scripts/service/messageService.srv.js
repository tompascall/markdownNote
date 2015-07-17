// messageService.srv.js

'use strict';

function messageService ($rootScope) {
  return {
    messages: {
      showAboutMessage: '',
      loadLocalFileMessage: '',
      saveLocalFileMessage: '',
      dropboxWriteMessage: '',
      dropboxReadMessage: '',

    },

    clearExtrasModalMessages: function () {
      this.messages.showAboutMessage = '';
      this.messages.loadLocalFileMessage = '';
      this.messages.saveLocalFileMessage = '';
      this.messages.dropboxWriteMessage = '';
      this.messages.dropboxReadMessage = '';
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
