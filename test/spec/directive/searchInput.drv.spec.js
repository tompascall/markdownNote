// searchInput.drv.spec.js

'use strict';

describe('Directive: searchInput', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var searchNote;
  var displayedNotes;
  var searchNotesFilter;
  var noteData;
  var pageService;

  beforeEach(function () {
    module('markdownNote');
    module('templates');

    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      searchNote = $injector.get('searchNote');
      displayedNotes = $injector.get('displayedNotes');
      searchNotesFilter = $injector.get('searchNotesFilter');
      noteData = $injector.get('noteData');
      pageService = $injector.get('pageService');
    });

    element = $compile('<search-input></search-input>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  describe('Testing input element', function () {

    it('should have bar-subheader item-input-inset class', function () {
      expect(element.find('ion-header-bar')).to.have.class('bar-subheader item-input-inset');
    });

    it('should have item item-input class', function () {
      expect(element.find('label')).to.have.class('item item-input-wrapper')
    });

    it('should have input field', function () {
      var input = element.find('input');
      expect(input).to.have.attr('placeholder', 'search');
    });
  });

  describe('Bind `searchNote.searchTerm` property to `searchInput` directive', function () {

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

    it('should call noteData.applySearchNotes with searchTerm if inputfield value is changed', function () {
      var mock = sinon.mock(noteData);
      var searchTerm = 'Test';
      mock.expects('applySearchNotes').withArgs(searchTerm);
      scope.$apply(function () {
        element.find('input')
          .val(searchTerm).trigger('input');
      });
      expect(mock.verify()).to.equal(true);
    });
  });
});
