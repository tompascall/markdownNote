// loadFromDropbox.drv.spec.js

'use strict';

describe('Directive: loadFromDropbox', function () {
  var $compile;
  var scope;
  var element;
  var isolated;

  beforeEach(module('markdownNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
    });

    element = $compile('<load-from-dropbox></load-from-dropbox>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {

    it('should have a button', function () {
      expect(element.find('button.loadFromDropboxButton').html()).to.contain('Load notes from Dropbox');
    });
  });

  describe('authentication', function () {
    var mockIsAuthenticated;
    var mockConfirmation;

    beforeEach(function () {
      mockIsAuthenticated = sinon.stub(isolated.ctrl,'isAuthenticated');
      mockIsAuthenticated.returns(false);

      mockConfirmation = sinon.stub(isolated.ctrl, 'confirmLoadFromDropbox').returns(true);
    });

    afterEach(function () {
      mockIsAuthenticated.restore();
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
      sinon.stub(isolated.ctrl, 'authentication');
      isolated.ctrl.load();
      expect(isolated.ctrl.authentication.called).to.equal(true);
      isolated.ctrl.authentication.restore();
    });


  });
});

