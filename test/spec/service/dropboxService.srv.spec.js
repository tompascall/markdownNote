// dropboxService.srv.spec.js

'use strict';

// var device;
// var cordova = window.cordova || {};
// cordova.file = { // mocking cordova global variables
//   externalRootDirectory: 'externalRootDirectory',
//   applicationStorageDirectory: 'applicationStorageDirectory'
// };

describe('Service: dropboxService', function () {
  var fileService;

  beforeEach(function () {
    module('markdownNote');
    module('templates');
  });

  beforeEach(inject(function ($injector) {
    dropboxService = $injector.get('dropboxService');
  }));

  describe('Check dropboxService initialization', function () {

    // beforeEach(function () {
    //   device = {};
    // });

    it('should have client object', function () {
      expect(dropboxService.client instanceof Dropbox.Client).to.equal(true);
    });

    it('should have the right app key', function () {
      expect(dropboxService.clientInitOptions.key).to.equal('pbqyznysf6jffyl');
    });

    // this test is really slow, about 2s, it should be rather an E2E test
    // it('should be called with the right app key', function (done) {
    //   dropboxService.client.appInfo(function (error, info) {
    //     if (error) {
    //       throw error;
    //     }
    //     expect(info.key).to.equal(dropboxService.clientInitOptions.key);
    //     done();
    //   })
    // });
  });
});

