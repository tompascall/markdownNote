// searchInput.drv.spec.js

'use strict';

describe('Directive: searchInput', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var searchNote;

  beforeEach(function () {
    module('simpleNote');
    module('templates');

    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      searchNote = $injector.get('searchNote');
    });

    element = $compile('<search-input></search-input>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
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

  describe('Bind `searchNote.searchTerm` property to `searchInput` directive', function () {
    beforeEach(function () {
      searchNote.searchTerm = 'hey';
    });

    it('should bind searchNote service to searchInput directive', function () {
      expect(isolated.ctrl.searchNote.searchTerm).to.equal(searchNote.searchTerm);
    });
  });

  describe('Test watching inputfield', function () {
    it('should call applySearchNotes if inputfield value is changed', function () {
      sinon.spy(isolated.ctrl, 'applySearchNotes');
      scope.$apply(function () {
        element.find('input')
          .val('Test').trigger('input');
      });
      expect(isolated.ctrl.applySearchNotes.called).to.equal(true);
      isolated.ctrl.applySearchNotes.restore();
    });
  });
});
