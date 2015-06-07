// fileService.srv.spec.js

'use strict';

var device;
var cordova = window.cordova || {};
cordova.file = { // mocking cordova global variables
  externalRootDirectory: 'externalRootDirectory',
  applicationStorageDirectory: 'applicationStorageDirectory'
};

describe('Service: fileService', function () {
  var fileService;

  beforeEach(function () {
    module('markdownNote');
    module('templates');
  });

  beforeEach(inject(function ($injector) {
    fileService = $injector.get('fileService');
  }));

  describe('Check fileService initialization', function () {

    beforeEach(function () {
      device = {};
    });

    it('deviceReady should be false at the beginning', function () {
      expect(fileService.deviceReady).to.equal(false);
    });

    it('should set deviceReady to true', function () {
      fileService.setDeviceReady();
      expect(fileService.deviceReady).to.equal(true);
    });

    it('should set platform using cordova device plugin', function () {
      fileService.setSupportedPlatforms();
      device.platform = 'Android';
      fileService.setPlatform();
      expect(fileService.platform).to.equal('Android');

      device.platform = 'iOS';
      fileService.setPlatform();
      expect(fileService.platform).to.equal('iOS');

      device.platform = 'notSupported';
      expect(fileService.setPlatform).to.throw(Error);
    });

    it('should set rootDirectory', function () {
      fileService.setSupportedPlatforms();
      device.platform = 'Android';
      fileService.setRootDirectory();
      expect(fileService.rootDirectory).to.equal('externalRootDirectory');

      device.platform = 'iOS';
      fileService.setRootDirectory();
      expect(fileService.rootDirectory).to.equal('applicationStorageDirectory');
    });

    it('should set file path', function () {
      fileService.setSupportedPlatforms();
      device.platform = 'Android';
      fileService.setFilePath();
      expect(fileService.filePath).to.equal('download/markdownNote.json');

      device.platform = 'iOS';
      fileService.setFilePath();
      expect(fileService.filePath).to.equal('Library/markdownNote.json');
    });

    it('should set up fileSevice', function () {
      device.platform = 'Android';
      sinon.spy(fileService, 'setDeviceReady');
      sinon.spy(fileService, 'setSupportedPlatforms');
      sinon.spy(fileService, 'setPlatform');
      sinon.spy(fileService, 'setRootDirectory');
      sinon.spy(fileService, 'setFilePath');

      fileService.setupFileService();

      expect(fileService.setDeviceReady.called).to.equal(true);
      expect(fileService.setSupportedPlatforms.called).to.equal(true);
      expect(fileService.setPlatform.called).to.equal(true);
      expect(fileService.setRootDirectory.called).to.equal(true);
      expect(fileService.setFilePath.called).to.equal(true);

      fileService.setDeviceReady.restore();
      fileService.setSupportedPlatforms.restore();
      fileService.setPlatform.restore();
      fileService.setRootDirectory.restore();
      fileService.setFilePath.restore();
    });

    it('should call setupFileService when device is ready', function () {
      device.platform = 'Android';
      sinon.spy(fileService, 'setDeviceReady');
      sinon.spy(fileService, 'setSupportedPlatforms');
      sinon.spy(fileService, 'setPlatform');
      sinon.spy(fileService, 'setRootDirectory');
      sinon.spy(fileService, 'setFilePath');

      $(document).trigger('deviceready');// cordova event

      expect(fileService.setDeviceReady.called).to.equal(true);
      expect(fileService.setSupportedPlatforms.called).to.equal(true);
      expect(fileService.setPlatform.called).to.equal(true);
      expect(fileService.setRootDirectory.called).to.equal(true);
      expect(fileService.setFilePath.called).to.equal(true);

      fileService.setDeviceReady.restore();
      fileService.setSupportedPlatforms.restore();
      fileService.setPlatform.restore();
      fileService.setRootDirectory.restore();
      fileService.setFilePath.restore();
    });
  });
});

