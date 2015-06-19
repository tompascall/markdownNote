// saveFile.drv.spec.js

'use strict';

describe('Directive: loadFile', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var fileService;
  var noteData;

  beforeEach(module('markdownNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      fileService = $injector.get('fileService');
      noteData = $injector.get('noteData');
    });

    element = $compile('<load-file></load-file>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {

    it('should call loadText', function (done) {
      sinon.spy(isolated.ctrl, 'loadText');
      element.find('button.backupFromDeviceButton').click();
      setTimeout(function () {
        expect(isolated.ctrl.loadText.called).to.equal(true);
        isolated.ctrl.loadText.restore();
        done();
      },0);
    });

    it('should call onDeviceReady() if device is ready ' +
      'and backuping has been confirmed', function () {
      fileService.deviceReady = false;
      sinon.stub(isolated.ctrl, 'onDeviceReady');
      isolated.ctrl.loadText();
      expect(isolated.ctrl.onDeviceReady.called).to.equal(false);

      fileService.deviceReady = true;
      sinon.stub(isolated.ctrl, 'confirmBackuping', function () {
        return true;
      });
      isolated.ctrl.loadText();
      expect(isolated.ctrl.onDeviceReady.called).to.equal(true);
      isolated.ctrl.onDeviceReady.restore();
      isolated.ctrl.confirmBackuping.restore();
    });

    it('should call onDeviceReady with fileService.rootDirectory', function () {
      fileService.deviceReady = true;
      sinon.stub(isolated.ctrl, 'confirmBackuping', function () {
        return true;
      });
      var mock = sinon.mock(isolated.ctrl);
      fileService.rootDirectory = 'root';
      mock.expects('onDeviceReady').withExactArgs('root');
      isolated.ctrl.loadText();
      expect(mock.verify()).to.equal(true);
      isolated.ctrl.confirmBackuping.restore();
    });

    it('onDeviceReady should call window.resolveLocalFileSystemURL with ' +
      'rootDirectory, controller.onResolveSuccess, controller.fail', function () {
        window.resolveLocalFileSystemURL = function () {}; // mock this function
        var mock = sinon.mock(window);
        mock.expects('resolveLocalFileSystemURL').withExactArgs('root',
          isolated.ctrl.onResolveSuccess, isolated.ctrl.fail);
        isolated.ctrl.onDeviceReady('root');
        expect(mock.verify()).to.equal(true);
        window.resolveLocalFileSystemURL = undefined;
    });

    it('onResolveSuccess should call  directoryEntry.getFile with ' +
      'fileService.filePath + fileService.fileName, null, ' +
      'controller.gotFileEntry, controller.fail', function () {
        var directoryEntry = { // mock object
          getFile: function () {}
        };
        var mock = sinon.mock(directoryEntry);
        mock.expects('getFile').withExactArgs(fileService.filePath + fileService.fileName,
          null, isolated.ctrl.gotFileEntry,
          isolated.ctrl.fail);
        isolated.ctrl.onResolveSuccess(directoryEntry);
        expect(mock.verify()).to.equal(true);
    });

    it('gotFileEntry should call fileEntry.file with' +
      'controller.readAsText, controller.fail', function () {
      var fileEntry = {
        file: function () {} // mock
      };
      var mock = sinon.mock(fileEntry);
      mock.expects('file').withExactArgs(isolated.ctrl.readAsText,
        isolated.ctrl.fail);
      isolated.ctrl.gotFileEntry(fileEntry);
      expect(mock.verify()).to.equal(true);
    });

    it('should call readAsText mehod of a FileReader instance', function () {
      window.FileReader = function () {};
      window.FileReader.prototype = {
        readAsText: function () {}
      };
      var file = {};
      var mock = sinon.mock(window.FileReader.prototype);
      mock.expects('readAsText').withArgs(file);
      isolated.ctrl.readAsText(file);
      expect(mock.verify()).to.equal(true);
      window.FileReader = undefined;
    });

    it('readAsText method of FileReader instance should call ' +
      'onloadend method, and the latter one should call ' +
      'noteData.backupNotesFromBackupData(backupData) method', function () {

      window.FileReader = function () {};

      var evt = {
        target: {
          result: 'text from file'
        }
      };

      window.FileReader.prototype = {
        onloadend: function () {}, // it will be overwritten by the instance
        readAsText: function () {
          this.onloadend(evt);
        }
      };

      var file = {};
      var mock = sinon.mock(noteData);
      mock.expects('backupNotesFromBackupData').withExactArgs(evt.target.result);
      isolated.ctrl.readAsText(file);
      expect(mock.verify()).to.equal(true);
      window.FileReader = undefined;
    });

    it('setMessage should set fileService.messages.loadLocalFileMessage', function () {
      var temp = isolated.ctrl.messageService.messages.loadLocalFileMessage;
      var message = 'Hey there!';
      isolated.ctrl.setMessage(message);
      expect(isolated.ctrl.messageService.messages.loadLocalFileMessage).to.equal(message);
      isolated.ctrl.messageService.messages.loadLocalFileMessage = temp;
    });

    it('controller.fail should log error', function () {
      var error = {
        code: 42
      };
      var mock = sinon.mock(isolated.ctrl);
      mock.expects('setMessage').withArgs('ERROR: ' + error.code);
      isolated.ctrl.fail(error);
      expect(mock.verify()).to.equal(true);
    });
  });
});

