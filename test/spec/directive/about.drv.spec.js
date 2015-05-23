// about.drv.spec.js

'use strict';

describe('Directive: about', function () {
  var $compile;
  var scope;
  var element;
  var isolated;


  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
    });

    element = $compile('<about></about>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {

    it('should call showAboutMessage', function (done) {
      sinon.spy(isolated.ctrl, 'showAboutMessage');
      element.find('button.aboutButton').click();
      setTimeout(function () {
        expect(isolated.ctrl.showAboutMessage.called).to.equal(true);
        isolated.ctrl.showAboutMessage.restore();
        done();
      },0);
    });
  });
});

