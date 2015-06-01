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
    module('simpleNote');
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

    it('should call applySearchNotes with searchTerm if inputfield value is changed', function () {
      var mock = sinon.mock(isolated.ctrl);
      var searchTerm = 'Test';
      mock.expects('applySearchNotes').withArgs(searchTerm);
      scope.$apply(function () {
        element.find('input')
          .val(searchTerm).trigger('input');
      });
      expect(mock.verify()).to.equal(true);
    });

    it('applySearchNotes should update displayedNotes', function () {
      var tempNoteData = noteData.notes.slice();
      var tempDisplayedNotes = displayedNotes.notes.slice();
      noteData.notes = [
        {
          title: 'testTitle1 testTitle',
          text: 'Text1',
          tags: ['testTag1']
        },
        {
          title: 'testTitle2 testTitle',
          text: 'Text2 testText',
          tags: ['testTag2']
        },
        {
          title: 'testTitle3 testTitle',
          text: 'Text3 testText',
          tags: ['testTag3']
        }
      ];
      displayedNotes.notes = noteData.notes.slice();

      isolated.ctrl.applySearchNotes('testTitle1');
      expect(displayedNotes.notes.length).to.equal(1);
      expect(displayedNotes.notes[0].title).to.equal('testTitle1 testTitle');

      isolated.ctrl.applySearchNotes('');
      expect(displayedNotes.notes.length).to.equal(3);

      noteData.notes = tempNoteData.slice();
      displayedNotes.notes = tempDisplayedNotes.slice();
    });

    it('should recalculate number of pages when apply searching', function () {
      var tempCurrentPage = pageService.currentPage;
      pageService.currentPage = 12;
      var mock = sinon.mock(pageService);
      mock.expects('setNumberOfPages').withArgs(displayedNotes.notes);
      isolated.ctrl.applySearchNotes('testTitle1');
      expect(pageService.currentPage).to.equal(0);
      expect(mock.verify()).to.equal(true);
    });
  });
});
