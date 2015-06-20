// dropboxService.srv.spec.js

'use strict';

describe.only('Service: dropboxService', function () {
  var dropboxService;

  beforeEach(function () {
    module('markdownNote');
    module('templates');
  });

  beforeEach(inject(function ($injector) {
    dropboxService = $injector.get('dropboxService');
  }));

  describe('Check dropboxService initialization', function () {

    it('should have client object', function () {
      expect(dropboxService.client instanceof Dropbox.Client).to.equal(true);
    });

    it('should have the right app key', function () {
      expect(dropboxService.clientInitOptions.key).to.equal('pbqyznysf6jffyl');
    });

    // this test is really slow (about 2s), it should be rather an E2E test
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

  describe('Error handling', function () {
    it('should have INVALID_TOKEN handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.INVALID_TOKEN]
        .tokenNumber).to.equal(Dropbox.ApiError.INVALID_TOKEN);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.INVALID_TOKEN]
        .errorHandler).to.be.a('function');
    });

    it('should have NOT_FOUND handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.NOT_FOUND]
        .tokenNumber).to.equal(Dropbox.ApiError.NOT_FOUND);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.NOT_FOUND]
        .errorHandler).to.be.a('function');
    });

    it('should have OVER_QUOTA handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.OVER_QUOTA]
        .tokenNumber).to.equal(Dropbox.ApiError.OVER_QUOTA);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.OVER_QUOTA]
        .errorHandler).to.be.a('function');
    });

    it('should have RATE_LIMITED handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.RATE_LIMITED]
        .tokenNumber).to.equal(Dropbox.ApiError.RATE_LIMITED);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.RATE_LIMITED]
        .errorHandler).to.be.a('function');
    });

    it('should have NETWORK_ERROR handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.NETWORK_ERROR]
        .tokenNumber).to.equal(Dropbox.ApiError.NETWORK_ERROR);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.NETWORK_ERROR]
        .errorHandler).to.be.a('function');
    });

    it('should have INVALID_PARAM handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.INVALID_PARAM]
        .tokenNumber).to.equal(Dropbox.ApiError.INVALID_PARAM);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.INVALID_PARAM]
        .errorHandler).to.be.a('function');
    });

    it('should have OAUTH_ERROR handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.OAUTH_ERROR]
        .tokenNumber).to.equal(Dropbox.ApiError.OAUTH_ERROR);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.OAUTH_ERROR]
        .errorHandler).to.be.a('function');
    });

    it('should have INVALID_METHOD handler', function () {
      expect(dropboxService.errorHandlers[Dropbox.ApiError.INVALID_METHOD]
        .tokenNumber).to.equal(Dropbox.ApiError.INVALID_METHOD);
      expect(dropboxService.errorHandlers[Dropbox.ApiError.INVALID_METHOD]
        .errorHandler).to.be.a('function');
    });
  });

  describe('Authentication', function () {
    it('should start authentication process if not authenticated', function () {
      var stubAuthenticate = sinon.stub(dropboxService.client, 'authenticate');
      var stubIsAuthenicated = sinon.stub(dropboxService.client, 'isAuthenticated').returns(false);
      dropboxService.authentication();
      expect(stubAuthenticate.called).to.equal(true);
      stubAuthenticate.restore();
      stubIsAuthenicated.restore();
    });

    it('should give back dropboxService.client if use is already authenticated', function () {
      var stubIsAuthenicated = sinon.stub(dropboxService.client, 'isAuthenticated').returns(true);
      return dropboxService.authentication().then(function (client) {
        expect(client).to.equal(dropboxService.client);
      });
      stubIsAuthenicated.restore();
    });

    it('should call errorHandler if authentication fails', function () {
      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = {
        status: Dropbox.ApiError.INVALID_TOKEN,
      };
      var client = null;
      stub.yields(error, client); // will call callback from stub with these args
      var spy = sinon.spy(dropboxService.errorHandlers[error.status],
        'errorHandler');

      var promise = dropboxService.authentication();
      return promise.catch(function (message) {
        expect(spy.called).to.equal(true);
        expect(message).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
        stub.restore();
        spy.restore();
      });
    });

    it('should update client', function () {
      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = null;
      var client = {
        status: 'updated'
      };
      stub.yields(error, client); // will call callback from stub with these args

      return dropboxService.authentication()
      .then(function (dropClient) {
        expect(dropClient.status).to.equal('updated');
        expect(dropClient).to.deep.equal(dropboxService.client);
        stub.restore();
      });
    });
  });
});

