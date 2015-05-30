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

    it('should have two buttons', function () {
      expect(element.find('button').length).to.equal(2);
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

    it('should decrement currentpage number if setCurrentPage was called with -1', function () {
      pageService.currentPage = 1;
      var backwardButton = element.find('button.backwardButton');
      backwardButton.click();
        expect(pageService.currentPage).to.equal(0);
    });

    it('should leave currentPage to 0 if currentpage is 0 and' +
      'setCurrentPage was called with -1', function () {
      pageService.currentPage = 0;
      var backwardButton = element.find('button.backwardButton');
      backwardButton.click();
      expect(pageService.currentPage).to.equal(0);
    });

    it('should increment currentpage number if setCurrentPage was called with 1', function () {
      pageService.currentPage = 0;
      pageService.numberOfPages = 4;
      var forwardButton = element.find('button.forwardButton');
      forwardButton.click();
      expect(pageService.currentPage).to.equal(1);
    });

    it('should leave currentPage if currentpage is equal to numberOfPages and' +
      'setCurrentPage was called with 1', function () {
      pageService.currentPage = 4;
      pageService.numberOfPages = 4;
      var forwardButton = element.find('button.forwardButton');
      forwardButton.click();
      expect(pageService.currentPage).to.equal(4);
    });
  });
});

