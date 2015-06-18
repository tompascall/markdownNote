// saveToDropbox.drv.spec.js

'use strict';

describe('Directive: saveToDropbox', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var dropboxService;
  var $q;
  var messageService;
  var noteData;
  var ENV;

  beforeEach(module('markdownNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      dropboxService = $injector.get('dropboxService');
      $q = $injector.get('$q');
      messageService = $injector.get('messageService');
      noteData = $injector.get('noteData');
      ENV = $injector.get('ENV');
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
    var mockIsAuthenticated;

    beforeEach(function () {
      mockIsAuthenticated = sinon.stub(isolated.ctrl,'isAuthenticated');
      mockIsAuthenticated.returns(false);
    });

    afterEach(function () {
      mockIsAuthenticated.restore();
    });

    it('should call save method if button is clicked', function () {
      sinon.spy(isolated.ctrl, 'save');
      element.find('button.saveToDropboxButton').click();
      scope.$digest();
      expect(isolated.ctrl.save.called).to.equal(true);
      isolated.ctrl.save.restore();
    });

    it('should check if client can perform Dropbox API calls on behalf of a user', function () {
      mockIsAuthenticated.returns(false);
      expect(isolated.ctrl.isAuthenticated()).to.equal(false);
      mockIsAuthenticated.returns(true);
      expect(isolated.ctrl.isAuthenticated()).to.equal(true);
    });

    it('should start authentication process if not authenticated', function () {
      mockIsAuthenticated.returns(false);
      sinon.spy(isolated.ctrl, 'authentication');
      isolated.ctrl.save();
      expect(isolated.ctrl.authentication.called).to.equal(true);
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

    it.only('should update client', function () {
      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = null;
      var client = {
        status: 'updated'
      };
      stub.yields(error, client); // will call callback from stub with these args

      return isolated.ctrl.authentication()
      .then(function (dropClient) {
        expect(dropClient.status).to.equal('updated');
        expect(dropClient).to.deep.equal(dropboxService.client);
        console.log('heeeeeeeey');
        stub.restore();

      })
      .catch();
    });

    it('dropErrorHandler should set dropbox message for informing the user', function () {
      var tempDropboxMessage = messageService.dropboxMessage;
      messageService.dropboxMessage = '';
      isolated.ctrl.dropErrorHandler({status: Dropbox.ApiError.INVALID_TOKEN});
      expect(messageService.dropboxMessage).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
      messageService.dropboxMessage = tempDropboxMessage;
    });

  });

  describe('saving data to dropbox', function () {
    var mockIsAuthenticated;

    beforeEach(function () {
      mockIsAuthenticated = sinon.stub(isolated.ctrl,'isAuthenticated');
      mockIsAuthenticated.returns(false);
    });

    afterEach(function () {
      mockIsAuthenticated.restore();
    });

    it('should call writeDataToDropbox with client arg', function (done) {
      var client = 'authenticated';

      sinon.stub(isolated.ctrl, 'authentication')
        .returns(when(client));

      var mock = sinon.mock(isolated.ctrl);
      mock.expects('writeDataToDropbox').withArgs(client);

      isolated.ctrl.save();

      setTimeout(function() {
        expect(mock.verify()).to.equal(true);
        isolated.ctrl.authentication.restore();
        done();
      }, 10);
    });

    it('writeDataToDropbox should call noteData.loadStringNotesFromStorage', function () {
      var spy = sinon.spy(noteData, 'loadStringNotesFromStorage');
      isolated.ctrl.writeDataToDropbox();
      expect(spy.called).to.equal(true);
      spy.restore();
    });

    it('should call client.writeFile with filename and storage data', function () {
      var tempStorage;
      tempStorage = window.localStorage.markdownNote;
      window.localStorage.markdownNote = angular.toJson(['test data']);

      var stub = sinon.stub(dropboxService.client, 'writeFile');
      stub.withArgs(ENV.fileName, tempStorage);

      isolated.ctrl.writeDataToDropbox(dropboxService.client);
      expect(stub.called).to.equal(true);
      stub.restore();
      window.localStorage.markdownNote = tempStorage;
    });

    it('should set dropbox message after writing data to dropbox', function () {
      var stub = sinon.stub(dropboxService.client,'writeFile');
      var error = null;
      var stat = {
        path: 'filePath'
      };
      stub.yields(error, stat); // will call callback from stub with these args

      var promise = isolated.ctrl.writeDataToDropbox(dropboxService.client);
      promise.then(function (stat) {
        expect(stat.path).to.equal('filePath');
        stub.restore();
        console.log('hey');
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  });
});

