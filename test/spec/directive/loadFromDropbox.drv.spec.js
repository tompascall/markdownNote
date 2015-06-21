// loadFromDropbox.drv.spec.js

'use strict';

describe('Directive: loadFromDropbox', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var messageService;
  var dropboxService;
  var ENV;
  var noteData;

  beforeEach(module('markdownNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      messageService = $injector.get('messageService');
      dropboxService = $injector.get('dropboxService');
      ENV = $injector.get('ENV');
      noteData = $injector.get('noteData');
    });

    element = $compile('<load-from-dropbox></load-from-dropbox>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {

    it('should have a button', function () {
      expect(element.find('button.loadFromDropboxButton').html()).to.contain('Load notes from your Dropbox');
    });
  });

  describe('authentication', function () {
    var mockConfirmation;

    beforeEach(function () {
      mockConfirmation = sinon.stub(isolated.ctrl, 'confirmLoadFromDropbox').returns(true);
    });

    afterEach(function () {
      mockConfirmation.restore();
    });

    it('should call load method if button is clicked', function () {
      sinon.stub(isolated.ctrl, 'load');
      element.find('button.loadFromDropboxButton').click();
      scope.$digest();
      expect(isolated.ctrl.load.called).to.equal(true);
      isolated.ctrl.load.restore();
    });

    it('should be true if it is confirmed', function () {
      var stub = sinon.stub(window, 'confirm').returns(true);
      var result = isolated.ctrl.confirmLoadFromDropbox();
      expect(result).to.equal(true);
      stub.restore();
    });

    it('should start authentication process if not authenticated', function () {
      var stub = sinon.stub(dropboxService, 'authentication');
      stub.returns(when(true));
      isolated.ctrl.load();
      expect(stub.called).to.equal(true);
      stub.restore();
    });

    it('should set dropbox message for informing the user', function (done) {
      var tempDropboxMessage = messageService.messages.dropboxLoadMessage;
      messageService.messages.dropboxLoadMessage = '';

      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = {
        status: Dropbox.ApiError.INVALID_TOKEN,
      };
      var client = null;
      stub.yields(error, client); // will call callback from stub with these args

      isolated.ctrl.load();
      setTimeout(function() {
        expect(messageService.messages.dropboxLoadMessage).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
        messageService.messages.dropboxLoadMessage = tempDropboxMessage;
        done();
      }, 10);
    });
  });

  describe('reading data from Dropbox', function () {

   var mockConfirmation;
   var stubUpdateLocalData;

    beforeEach(function () {
      mockConfirmation = sinon.stub(isolated.ctrl, 'confirmLoadFromDropbox').returns(true);
      stubUpdateLocalData = sinon.stub(isolated.ctrl, 'updateLocalData');
    });

    afterEach(function () {
      mockConfirmation.restore();
      stubUpdateLocalData.restore();
    });

    it('should call readDataFromDropbox', function (done) {
      sinon.stub(dropboxService, 'authentication')
      .returns(when(true));

      var stub = sinon.stub(isolated.ctrl, 'readDataFromDropbox')
      .returns(when(true));

      isolated.ctrl.load();

      setTimeout(function() {
        expect(stub.called).to.equal(true);
        dropboxService.authentication.restore();
        stub.restore();
        done();
      }, 10);
    });

    it('should call dropboxService.readFile with filename', function () {
      var stub = sinon.stub(dropboxService, 'readFile');
      stub.withArgs(ENV.fileName).returns(when(true));

      return isolated.ctrl.readDataFromDropbox()
      .then(function () {
        expect(stub.called).to.equal(true);
        stub.restore();
      });
    });

    it('should update local data', function () {
      stubUpdateLocalData.restore();
      var stub = sinon.stub(noteData, 'backupNotesFromBackupData');
      stub.withArgs('{test: data}');
      isolated.ctrl.updateLocalData('{test: data}');
      expect(stub.called).to.equal(true);
      stub.restore();
    });

    it('should call updateLocalData after fetching data', function (done) {
      sinon.stub(dropboxService, 'authentication')
      .returns(when(true));

      var stub = sinon.stub(isolated.ctrl, 'readDataFromDropbox')
      .returns(when('{test: data}'));

      stubUpdateLocalData.withArgs('{test: data}');

      isolated.ctrl.load();

      setTimeout(function() {
        expect(stubUpdateLocalData.called).to.equal(true);
        dropboxService.authentication.restore();
        stub.restore();
        done();
      }, 10);
    });
  });
});

