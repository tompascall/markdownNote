// saveFile.drv.spec.js

'use strict';

describe('Directive: saveFile', function () {
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

    element = $compile('<save-file></save-file>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Test element components', function () {

    it('should call saveText', function (done) {
      sinon.spy(isolated.ctrl, 'saveText');
      element.find('button.saveToDeviceButton').click();
      setTimeout(function () {
        expect(isolated.ctrl.saveText.called).to.equal(true);
        isolated.ctrl.saveText.restore();
        done();
      },0);
    });
  });
});

