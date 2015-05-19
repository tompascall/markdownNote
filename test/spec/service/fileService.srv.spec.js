// fileService.srv.spec.js

'use strict';

describe('Service: fileService', function () {
  var fileService;

  beforeEach(function () {
    module('simpleNote');
    module('templates');
  });

  beforeEach(inject(function ($injector) {
    fileService = $injector.get('fileService');
  }));

  describe('Check fileService initialization', function () {
    it('deviceReady should be false at the beginning', function () {
      expect(fileService.deviceReady).to.equal(false);
    });
  });
});

