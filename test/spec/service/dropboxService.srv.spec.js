// dropboxService.srv.spec.js

'use strict';

describe('Service: dropboxService', function () {
  var dropboxService;
  var messageService;

  beforeEach(function () {
    module('markdownNote');
    module('templates');
  });

  beforeEach(inject(function ($injector) {
    dropboxService = $injector.get('dropboxService');
    messageService = $injector.get('messageService');
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
      .then(function () {
        expect(dropboxService.client.status).to.equal('updated');
        stub.restore();
      });
    });
  });

  describe('Write file to Dropbox', function () {

    it('should call client.writeFile with filename and data', function () {
      var stub = sinon.stub(dropboxService.client, 'writeFile');
      stub.withArgs('fileName', '{test: data}');
      dropboxService.writeFile('fileName', '{test: data}')
      expect(stub.called).to.equal(true);
      stub.restore();
    });

    it('should handle data writing via promise', function () {
      var stub = sinon.stub(dropboxService.client,'writeFile');
      var error = null;
      var stat = {
        path: 'filePath'
      };
      stub.yields(error, stat); // will call callback from stub with these args

      var promise = dropboxService.writeFile('fileName', '{test: data}');
      return promise.then(function (stat) {
        expect(stat.path).to.equal('filePath');
        stub.restore();
      });
    });

    it('should return error message if writing fails', function () {
      var stub = sinon.stub(dropboxService.client,'writeFile');
       var error = {
        status: Dropbox.ApiError.INVALID_TOKEN
      };
      var stat = null;
      stub.yields(error, stat); // will call callback from stub with these args
      var promise = dropboxService.writeFile('fileName', '{test: data}');
      return promise.catch(function (message) {
        expect(message).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
        stub.restore();
      });
    });
  });

  describe('read file from Dropbox', function () {
    it('should call client.readFile with fileName', function () {
      var stub = sinon.stub(dropboxService.client, 'readFile');
      stub.withArgs('fileName');
      dropboxService.readFile('fileName');
      expect(stub.called).to.equal(true);
      stub.restore();
    });

    it('should handle data reading via promise', function () {
      var stub = sinon.stub(dropboxService.client,'readFile');
      var error = null;
      var data = '{test: data}';
      stub.yields(error, data); // will call callback from stub with these args

      var promise = dropboxService.readFile('fileName');
      return promise.then(function (data) {
        expect(data).to.equal('{test: data}');
        stub.restore();
      });
    });

    it('should return error message if writing fails', function () {
      var stub = sinon.stub(dropboxService.client,'readFile');
       var error = {
        status: Dropbox.ApiError.INVALID_TOKEN
      };
      var data = null;
      stub.yields(error, data); // will call callback from stub with these args
      var promise = dropboxService.readFile('fileName');
      return promise.catch(function (message) {
        expect(message).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
        stub.restore();
      });
    });
  });

  describe('Progress indicator', function () {

    describe('Init progress indicator', function () {
      var stub;
      var tempDropboxReadMessage;
      var tempDropboxWriteMessage;

      beforeEach(function () {
        tempDropboxReadMessage = messageService.messages.dropboxReadMessage;
        tempDropboxWriteMessage = messageService.messages.dropboxWriteMessage;
      });

      afterEach(function () {
        messageService.messages.dropboxReadMessage = tempDropboxReadMessage;
        messageService.messages.dropboxWriteMessage = tempDropboxWriteMessage;
      });

      it('should call clearExtrasModalMessages', function () {
        stub = sinon.stub(messageService, 'clearExtrasModalMessages');
        dropboxService.initProgressIndicator('read');
        expect(stub.called).to.equal(true);
        stub.restore();
      });

      it('should init dropboxReadMessage', function () {
        dropboxService.initProgressIndicator('read');
        expect(messageService.messages.dropboxReadMessage).to.equal('Reading data from Dropbox');
      });

      it('should init dropboxWriteMessage', function () {
        dropboxService.initProgressIndicator('write');
        expect(messageService.messages.dropboxWriteMessage).to.equal('Writing data to Dropbox');
      });

      it('should report data process via setting dropbox read message', function () {
        dropboxService.initProgressIndicator('read');
        for (var i = 0; i < 5; i++) {
          dropboxService.reportProgress('read');
        }
        expect(messageService.messages.dropboxReadMessage)
          .to.equal('Reading data from Dropbox.....');
      });

      it('should report data process via setting dropbox write message', function () {
        dropboxService.initProgressIndicator('write');
        for (var i = 0; i < 5; i++) {
          dropboxService.reportProgress('write');
        }
        expect(messageService.messages.dropboxWriteMessage)
          .to.equal('Writing data to Dropbox.....');
      });

      it('should call initProgressIndicator with `read` when read file', function () {
        var spy = sinon.spy(dropboxService, 'initProgressIndicator');
        spy.withArgs('read');
        stub = sinon.stub(dropboxService.client, 'readFile');
        var error = null;
        var data = '{test: data}';
        stub.yields(error, data); // will call callback from stub with these args

        return dropboxService.readFile().then(function () {
          expect(spy.called).to.equal(true);
          stub.restore();
          spy.restore();
        });
      });

      it('should call initProgressIndicator with `write` when write file', function () {
        var spy = sinon.spy(dropboxService, 'initProgressIndicator');
        spy.withArgs('write');
        stub = sinon.stub(dropboxService.client, 'writeFile');
        var error = null;
        var stat = {
          path: 'filePath'
        };
        stub.yields(error, stat); // will call callback from stub with these args

        var promise = dropboxService.writeFile();
        return promise.then(function (stat) {
          expect(spy.called).to.equal(true);
          stub.restore();
          spy.restore();
        });
      });
    });

    describe('Indicate read progress', function () {

      it('should give back a XhrDownloadListener function that' +
        ' adds an event listener to xhr listening to `progress` event', function () {
        var xhrDownloadListener = dropboxService.getXhrDownloadListener();
        var mockDropboxXhr = {
          xhr: {
            addEventListener: function () {}
          }
        };
        var mockXhr = sinon.mock(mockDropboxXhr.xhr);
        mockXhr.expects('addEventListener').withArgs('progress');

          expect(xhrDownloadListener(mockDropboxXhr)).to.equal(true); // otherwise, the XMLHttpRequest is canceled
          expect(mockXhr.verify()).to.equal(true);
      });

      it('should call dropboxService.reportProgress', function () {
        var XhrDownloadListener = dropboxService.getXhrDownloadListener();
        var mockDropboxXhr = {
          xhr: {
            addEventListener: function (eventType, callback) {
              var mockEvent = {
                loaded: '100',
                total: '1000'
              };
              callback(mockEvent);
            }
          }
        };
        var stub = sinon.stub(dropboxService, 'reportProgress');
        stub.withArgs('read','100','1000');

        XhrDownloadListener(mockDropboxXhr);
        expect(stub.called).to.equal(true);
        stub.restore();
      });

      it('should call dropboxService.getXhrDownloadListener when read file', function () {
        var spyListenerFactory = sinon.spy(dropboxService, 'getXhrDownloadListener');
        var stub = sinon.stub(dropboxService.client,'readFile');
        var error = null;
        var data = '{test: data}';
        stub.yields(error, data); // will call callback from stub with these args

        return dropboxService.readFile().then(function () {
          expect(spyListenerFactory.called).to.equal(true);
          spyListenerFactory.restore();
          stub.restore();
        });
      });

      it('should add and remove event listener', function () {
        var stub = sinon.stub(dropboxService.client,'readFile');
        var error = null;
        var data = '{test: data}';
        stub.yields(error, data); // will call callback from stub with these args
        var stubAddListener = sinon.stub(dropboxService.client.onXhr, 'addListener');
        var stubRemoveListener = sinon.stub(dropboxService.client.onXhr, 'removeListener');
        return dropboxService.readFile().then(function () {
          expect(stubAddListener.called).to.equal(true);
          expect(stubRemoveListener.called).to.equal(true);
          stub.restore();
          stubAddListener.restore();
          stubRemoveListener.restore();
        });
      });
    });

    describe('Indicate write progress', function () {
      it('should give back a XhrUploadListener function that' +
        ' adds an event listener to xhr listening to `progress` event', function () {
        var xhrUploadListener = dropboxService.getXhrUploadListener();
        var mockDropboxXhr = {
          xhr: {
            upload: {
              addEventListener: function () {}
            }
          }
        };
        var mockXhr = sinon.mock(mockDropboxXhr.xhr.upload);
        mockXhr.expects('addEventListener').withArgs('progress');

        expect(xhrUploadListener(mockDropboxXhr)).to.equal(true); // otherwise, the XMLHttpRequest is canceled
        expect(mockXhr.verify()).to.equal(true);
      });

      it('should call dropboxService.reportProgress', function () {
        var XhrUploadListener = dropboxService.getXhrUploadListener();
        var mockDropboxXhr = {
          xhr: {
            upload: {
              addEventListener: function (eventType, callback) {
                var mockEvent = {
                  loaded: '100',
                  total: '1000'
                };
                callback(mockEvent);
              }
            }
          }
        };

        var stub = sinon.stub(dropboxService, 'reportProgress');
        stub.withArgs('write','100','1000');

        XhrUploadListener(mockDropboxXhr);
        expect(stub.called).to.equal(true);
        stub.restore();
      });

      it('should call dropboxService.getXhrUploadListener when write file', function () {
        var spyListenerFactory = sinon.spy(dropboxService, 'getXhrUploadListener');
        var stub = sinon.stub(dropboxService.client,'writeFile');
        var error = null;
        var stat = {
          path: 'filePath'
        };
        stub.yields(error, stat); // will call callback from stub with these args

        return dropboxService.writeFile().then(function () {
          expect(spyListenerFactory.called).to.equal(true);
          spyListenerFactory.restore();
          stub.restore();
        });
      });

      it('should add and remove event listener', function () {
        var stub = sinon.stub(dropboxService.client,'writeFile');
        var error = null;
        var stat = {
          path: 'filePath'
        };
        stub.yields(error, stat); // will call callback from stub with these args
        var stubAddListener = sinon.stub(dropboxService.client.onXhr, 'addListener');
        var stubRemoveListener = sinon.stub(dropboxService.client.onXhr, 'removeListener');
        return dropboxService.writeFile().then(function () {
          expect(stubAddListener.called).to.equal(true);
          expect(stubRemoveListener.called).to.equal(true);
          stub.restore();
          stubAddListener.restore();
          stubRemoveListener.restore();
        });
      });
    });
  });
});

