// saveToDropbox.drv.spec.js

'use strict';

describe('Directive: saveToDropbox', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var dropboxService;

  beforeEach(module('markdownNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      dropboxService = $injector.get('dropboxService');
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

    });
  });
});

