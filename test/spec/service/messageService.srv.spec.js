// messageService.srv.spec.js

'use strict';

describe('Service: messageService', function () {
  var messageService;
  var ENV;

  beforeEach(function () {
    module('markdownNote');
    module('templates');
  });

  beforeEach(inject(function ($injector) {
    messageService = $injector.get('messageService');
  }));

  describe('Check messageService initialization', function () {

    it('should init all messages to empty string', function () {
      expect(messageService.messages['showAboutMessage']).to.equal(false);
      expect(messageService.messages['loadLocalFileMessage']).to.equal(false);
      expect(messageService.messages['saveLocalFileMessage']).to.equal(false);
      expect(messageService.messages['dropboxWriteMessage']).to.equal(false);
      expect(messageService.messages['dropboxReadMessage']).to.equal(false);
    });
  });

  describe('clearing messages', function () {
    var tempMessages = {};

    beforeEach(function () {
      tempMessages = angular.copy(messageService.messages);
    });

    afterEach(function () {
      messageService.messages = tempMessages;
    });

    it('should clear clearExtrasModalMessages', function () {
      messageService.messages['showAboutMessage'] = 'test string';
      messageService.messages['loadLocalFileMessage'] = 'test string';
      messageService.messages['saveLocalFileMessage'] = 'test string';

      messageService.clearExtrasModalMessages();

      expect(messageService.messages['showAboutMessage']).to.equal(false);
      expect(messageService.messages['loadLocalFileMessage']).to.equal(false);
      expect(messageService.messages['saveLocalFileMessage']).to.equal(false);
      expect(messageService.messages['dropboxWriteMessage']).to.equal(false);
      expect(messageService.messages['dropboxReadMessage']).to.equal(false);
    });
  });
});

