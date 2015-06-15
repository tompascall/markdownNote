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

    // it('should call INVALID_TOKEN errorhandler', function () {
    //   var stub = sinon.stub(dropboxService.dropErrorHandlers,
    //     Dropbox.ApiError.INVALID_TOKEN.toString());
    //   var error = {
    //     status: Dropbox.ApiError.INVALID_TOKEN,
    //     authenticated: false
    //   };
    //   var client = {
    //     authenticated: true
    //   };
    //   stub.yields(error, client);

    //   stub.restore();
    // });
  });
});

