// fileService.srv.spec.js

'use strict';

var device;

beforeEach(function () {
  device = '';
});

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

    it('should set deviceReady to true', function () {
      fileService.setDeviceReady();
      expect(fileService.deviceReady).to.equal(true);
    });

    it('should set platform using cordova device plugin', function () {
      device = {platform: 'Android'}; // mocking cordova global object
      fileService.setPlatform();
      expect(fileService.platform).to.equal('Android');
    });
  });
});

