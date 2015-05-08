'use strict';

describe('Sample test for setting up development framework', function () {
  it('should be ok', function () {
    expect(true).to.equal(true);
  });

  describe('Directive: sample-directive', function () {
    var $compile;
    var scope;
    var element;

    beforeEach(module('simpleNote'));

    beforeEach(module('templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      scope = _$rootScope_.$new();
      element = $compile('<sample-directive></sample-directive>')(scope);
      scope.$digest();
    }));

    it('gets the appropriate content', function () {
      expect(element.html()).to.contain('<h1>Sample</h1>');
    });

    it('should get button element and check its css class', function () {
      var buttons = element.find('button');
      expect(buttons.eq(0)).to.have.class('sample-class');
    });
  });
});
