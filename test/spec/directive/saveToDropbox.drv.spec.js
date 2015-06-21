// saveToDropbox.drv.spec.js

'use strict';

describe('Directive: saveToDropbox', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var dropboxService;
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
      expect(element.find('button.saveToDropboxButton').html()).to.contain('Save notes to your Dropbox');
    });
  });

  describe('authentication', function () {

    it('should call save method if button is clicked', function () {
      sinon.stub(isolated.ctrl, 'save');
      element.find('button.saveToDropboxButton').click();
      scope.$digest();
      expect(isolated.ctrl.save.called).to.equal(true);
      isolated.ctrl.save.restore();
    });

    it('should set dropbox message for informing the user', function (done) {
      var tempDropboxMessage = messageService.messages.dropboxSaveMessage;
      messageService.messages.dropboxSaveMessage = '';

      var stub = sinon.stub(dropboxService.client,'authenticate');
      var error = {
        status: Dropbox.ApiError.INVALID_TOKEN,
      };
      var client = null;
      stub.yields(error, client); // will call callback from stub with these args

      isolated.ctrl.save();
      setTimeout(function() {
        expect(messageService.messages.dropboxSaveMessage).to.equal('The authentication has been expired. Please try to authenticate yourself again.');
        messageService.messages.dropboxSaveMessage = tempDropboxMessage;
        done();
      }, 10);
    });

  });

  describe('saving data to dropbox', function () {

    it('should call writeDataToDropbox', function (done) {

      sinon.stub(dropboxService, 'authentication')
        .returns(when(true));

      var stub = sinon.stub(isolated.ctrl, 'writeDataToDropbox');
      isolated.ctrl.save();

      setTimeout(function() {
        expect(stub.called).to.equal(true);
        dropboxService.authentication.restore();
        stub.restore();
        done();
      }, 10);
    });

    it('writeDataToDropbox should call noteData.loadStringNotesFromStorage', function () {
      var stub = sinon.stub(noteData, 'loadStringNotesFromStorage');
      var stubWriteFile = sinon.stub(dropboxService, 'writeFile').returns(when(true));
      isolated.ctrl.writeDataToDropbox();
      expect(stub.called).to.equal(true);
      stub.restore();
      stubWriteFile.restore();
    });

    it('should call dropboxService.writeFile with filename and storage data', function () {
        var tempStorage;
        tempStorage = window.localStorage.markdownNote;
        window.localStorage.markdownNote = angular.toJson(['test data']);

        var stub = sinon.stub(dropboxService, 'writeFile');
        stub.withArgs(ENV.fileName, window.localStorage.markdownNote);

        isolated.ctrl.writeDataToDropbox();
        expect(stub.called).to.equal(true);
        stub.restore();
        window.localStorage.markdownNote = tempStorage;
    });
  });
});

