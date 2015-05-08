// searchInput.drv.spec.js

'use strict';

describe('Directive: searchInput', function () {
  var $compile;
  var scope;
  var element;

  beforeEach(function () {
    module('simpleNote');
    module('templates');
    inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      scope = _$rootScope_.$new();
      element = $compile('<search-input></search-input>')(scope);
      scope.$digest();
      angular.element(document).find('body').append(element); // for rendering css
    });
  });

  describe('Testing input element', function () {

    it('should have item item-input class', function () {
      expect(element.find('div label')).to.have.class('item item-input')
    });

    it('should have input field', function () {
      var input = element.find('input');
      expect(input).to.have.attr('placeholder', 'search');
    });
  });
});
