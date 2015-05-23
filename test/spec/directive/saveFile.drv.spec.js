// saveFile.drv.spec.js

'use strict';

describe('Directive: saveFile', function () {
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

    element = $compile('<save-file></save-file>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {
    var backupDeviceReady;

    it('should call saveText', function (done) {
      sinon.spy(isolated.ctrl, 'saveText');
      element.find('button.saveToDeviceButton').click();
      setTimeout(function () {
        expect(isolated.ctrl.saveText.called).to.equal(true);
        isolated.ctrl.saveText.restore();
        done();
      },0);
    });

    it('should call onDeviceReady() if device is ready', function () {
      fileService.deviceReady = false;
      sinon.stub(isolated.ctrl, 'onDeviceReady');
      isolated.ctrl.saveText();
      expect(isolated.ctrl.onDeviceReady.called).to.equal(false);
      fileService.deviceReady = true;
      isolated.ctrl.saveText();
      expect(isolated.ctrl.onDeviceReady.called).to.equal(true);
      isolated.ctrl.onDeviceReady.restore();
    });

    it('should call onDeviceReady with fileService.rootDirectory', function () {
      fileService.deviceReady = true;
      var mock = sinon.mock(isolated.ctrl);
      fileService.rootDirectory = 'root';
      mock.expects('onDeviceReady').withExactArgs('root');
      isolated.ctrl.saveText();
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
      'fileService.filePath, {create: true, exclusive: false}, ' +
      'controller.gotFileEntry, controller.fail', function () {
        var directoryEntry = { // mock object
          getFile: function () {}
        };
        var mock = sinon.mock(directoryEntry);
        mock.expects('getFile').withExactArgs(fileService.filePath,
          {create: true, exclusive: false}, isolated.ctrl.gotFileEntry,
          isolated.ctrl.fail);
        isolated.ctrl.onResolveSuccess(directoryEntry);
        expect(mock.verify()).to.equal(true);
    });

    it('gotFileEntry should call fileEntry.createWriter with' +
      'controller.gotFileWriter, controller.fail', function () {
      var fileEntry = {
        createWriter: function () {} // mock
      };
      var mock = sinon.mock(fileEntry);
      mock.expects('createWriter').withExactArgs(isolated.ctrl.gotFileWriter,
        isolated.ctrl.fail);
      isolated.ctrl.gotFileEntry(fileEntry);
      expect(mock.verify()).to.equal(true);
    });

    it('gotFileWriter should call  writer.write', function () {

      var backupData = angular.toJson([
        {
          title: 'mockNote',
          text: 'mockText',
          tags: ['mockTag']
        }
      ]);

      var temp = window.localStorage.simpleNotes;
      var writer = {
        write: function () {}
      };
      var mock = sinon.mock(writer);
      window.localStorage.simpleNotes = angular.fromJson(backupData);
      var notesString = noteData.loadStringNotesFromStorage();
      mock.expects('write').once().withExactArgs(notesString);
      isolated.ctrl.gotFileWriter(writer);
      expect(mock.verify()).to.equal(true);
      window.localStorage.simpleNotes = temp;
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

