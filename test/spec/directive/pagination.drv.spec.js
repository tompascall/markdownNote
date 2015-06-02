// pagination.drv.spec.js

'use strict';

describe('Directive: pagination', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var pageService;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      pageService = $injector.get('pageService');
    });

    element = $compile('<pagination></pagination>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test backward and forward buttons', function () {

    it('should have four buttons', function () {
      expect(element.find('button').length).to.equal(4);
    });

    it('should call setCurrentPage with arg -1', function () {
      var mock = sinon.mock(isolated.ctrl.pageService);
      mock.expects('setCurrentPage').withExactArgs(-1);
      var backwardButton = element.find('button.backwardButton');
      backwardButton.click();
      expect(mock.verify()).to.equal(true);
    });

    it('should call setCurrentPage with arg +1', function () {
      var mock = sinon.mock(isolated.ctrl.pageService);
      mock.expects('setCurrentPage').withExactArgs(1);
      var forwardButton = element.find('button.forwardButton');
      forwardButton.click();
      expect(mock.verify()).to.equal(true);
    });

    it('should call pageService.forwardToEnd()', function () {
      sinon.spy(isolated.ctrl.pageService, 'forwardToEnd');
      var forwardToEndButton = element.find('button.forwardToEndButton');
      forwardToEndButton.click();
      expect(isolated.ctrl.pageService.forwardToEnd.called).to.equal(true);
      isolated.ctrl.pageService.forwardToEnd.restore();
    });

    it('should call pageService.backToStart()', function () {
      sinon.spy(isolated.ctrl.pageService, 'backToStart');
      var backToStartButton = element.find('button.backToStartButton');
      backToStartButton.click();
      expect(isolated.ctrl.pageService.backToStart.called).to.equal(true);
      isolated.ctrl.pageService.backToStart.restore();
    });
  });
});

