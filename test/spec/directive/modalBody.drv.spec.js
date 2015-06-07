// modalBody.drv.spec.js

'use strict';

describe('Directive: modalBody', function () {
  var $compile;
  var scope;
  var element;

  beforeEach(function () {
    module('markdownNote');
    module('templates');
    inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      scope = _$rootScope_.$new();
      element = $compile('<edit-note-modal-body></edit-note-modal-body>')(scope);
      scope.$digest();
      angular.element(document).find('body').append(element); // for rendering css
    });
  });

  describe('Testing elements', function () {
    it('should have input fields', function () {
      var inputList = element.find('div.list label');
      expect(inputList.children('input'))
        .to.have.attr('placeholder', 'Title of your note');
      expect(inputList.children('textarea'))
        .to.have.attr('placeholder', 'Enter your note here');
       expect(inputList.children('input').eq(1))
        .to.have.attr('placeholder', 'Tags (separated by commas)');
    });
  });
});
