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

    it('should call toggleAboutMessage', function (done) {
      sinon.spy(isolated.ctrl, 'toggleAboutMessage');
      element.find('button.aboutButton').click();
      setTimeout(function () {
        expect(isolated.ctrl.toggleAboutMessage.called).to.equal(true);
        isolated.ctrl.toggleAboutMessage.restore();
        done();
      },0);
    });

    it('should show message when aboutButton is clicked', function (done) {
      var aboutMessage = element.find('div.aboutMessage');
      expect(aboutMessage).to.have.class('ng-hide');
      element.find('button.aboutButton').click();
      setTimeout(function () {
        expect(aboutMessage).to.not.have.class('ng-hide');
        done();
      }, 0);
    });
  });
});

