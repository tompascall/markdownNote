// saveFile.drv.spec.js

'use strict';

describe('Directive: loadFile', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var fileService;
  var noteData;

  beforeEach(module('simpleNote'));

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

    it('should call onDeviceReady() if device is ready', function () {
      fileService.deviceReady = false;
      sinon.stub(isolated.ctrl, 'onDeviceReady');
      isolated.ctrl.loadText();
      expect(isolated.ctrl.onDeviceReady.called).to.equal(false);
      fileService.deviceReady = true;
      isolated.ctrl.loadText();
      expect(isolated.ctrl.onDeviceReady.called).to.equal(true);
      isolated.ctrl.onDeviceReady.restore();
    });

    it('should call onDeviceReady with fileService.rootDirectory', function () {
      fileService.deviceReady = true;
      var mock = sinon.mock(isolated.ctrl);
      fileService.rootDirectory = 'root';
      mock.expects('onDeviceReady').withExactArgs('root');
      isolated.ctrl.loadText();
      expect(mock.verify()).to.equal(true);
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
      'fileService.filePath, null, ' +
      'controller.gotFileEntry, controller.fail', function () {
        var directoryEntry = { // mock object
          getFile: function () {}
        };
        var mock = sinon.mock(directoryEntry);
        mock.expects('getFile').withExactArgs(fileService.filePath,
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

    it('controller.fail should log error', function () {
      var error = {
        code: 42
      };
      var mock = sinon.mock(window.console);
      mock.expects('log').withArgs('ERROR: ' + error.code);
      isolated.ctrl.fail(error);
      expect(mock.verify()).to.equal(true);
    });
  });
});

