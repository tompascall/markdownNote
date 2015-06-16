// saveToDropbox.drv.spec.js

'use strict';

describe('Directive: saveToDropbox', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var dropboxService;
  var $q;
  var messageService

  beforeEach(module('markdownNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      dropboxService = $injector.get('dropboxService');
      $q = $injector.get('$q');
      messageService = $injector.get('messageService');
    });

    element = $compile('<save-to-dropbox></save-to-dropbox>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {
    it('should have a button', function () {
      expect(element.find('button.saveToDropboxButton').html()).to.contain('Save notes to Dropbox');
    });
  });

  describe('authentication', function () {
    it('should call save method if button is clicked', function () {
      sinon.spy(isolated.ctrl, 'save');
      element.find('button.saveToDropboxButton').click();
      scope.$digest();
      expect(isolated.ctrl.save.called).to.equal(true);
      isolated.ctrl.save.restore();
    });

    it('should check if client can perform Dropbox API calls on behalf of a user', function () {
      var stub = sinon.stub(dropboxService.client, 'isAuthenticated');
      stub.returns(false);
      expect(isolated.ctrl.isAuthenticated()).to.equal(false);
      stub.returns(true);
      expect(isolated.ctrl.isAuthenticated()).to.equal(true);
      stub.restore();
    });

    it('should start authentication process if not authenticated', function () {
      var stub = sinon.stub(dropboxService.client, 'isAuthenticated');
      stub.returns(false);
      sinon.spy(isolated.ctrl, 'authentication');
      isolated.ctrl.save();
      expect(isolated.ctrl.authentication.called).to.equal(true);
      stub.restore();
      isolated.ctrl.authentication.restore();
    });

    it('should call client.authenticate()', function () {
      sinon.stub(dropboxService.client, 'authenticate');
      isolated.ctrl.authentication();
      expect(dropboxService.client.authenticate.called).to.equal(true);
      dropboxService.client.authenticate.restore();
    });

    it('should call dropErrorHandler if authentication fails', function () {
      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = {
        status: Dropbox.ApiError.INVALID_TOKEN,
      };
      var client = null;
      stub.yields(error, client); // will call callback from stub with these args
      var spy = sinon.spy(isolated.ctrl,'dropErrorHandler');

      var promise = isolated.ctrl.authentication();
      promise.catch(function (error) {
        expect(spy.called).to.equal(true);
        stub.restore();
        spy.restore();
      });
    });

    it('should call INVALID_TOKEN errorhandler', function () {
      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = {
        status: Dropbox.ApiError.INVALID_TOKEN,
      };
      var client = null;
      stub.yields(error, client); // will call callback from stub with these args
      var spy = sinon.spy(dropboxService
        .errorHandlers[Dropbox.ApiError.INVALID_TOKEN],'errorHandler');

      var promise = isolated.ctrl.authentication();
      promise.catch(function (error) {
        expect(error.status).to.equal(Dropbox.ApiError.INVALID_TOKEN);
        expect(spy.called).to.equal(true);
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

      var promise = isolated.ctrl.authentication();
      promise.then(function (dropClient) {
        expect(dropClient.status).to.equal('updated');
        expect(dropClient).to.deep.equal(dropboxService.client);
        stub.restore();
      });
    });

    it('dropErrorHandler should set dropbox message for informing the user', function () {
      var tempDropboxMessage = messageService.dropboxMessage;
      messageService.dropboxMessage = '';
      isolated.ctrl.dropErrorHandler({status: Dropbox.ApiError.INVALID_TOKEN});
      expect(messageService.dropboxMessage).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
      messageService.dropboxMessage = tempDropboxMessage;
    });

  });
});

