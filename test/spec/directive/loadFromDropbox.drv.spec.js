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
});

