// searchNote.srv.spec.js

'use strict';

describe('Service: searchNote', function () {
  var searchNote;
  var noteData;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      searchNote = $injector.get('searchNote');
      noteData = $injector.get('noteData');
    });
  });

  describe('Test searchTerm', function () {
    it('should have searchTerm', function () {
      expect(searchNote.searchTerm).to.not.equal(undefined);
    });
  });

  describe('Add toggleSearchInput method', function () {

    it('should toggle searchInput state', function () {
      searchNote.opened = false;
      searchNote.toggleSearchInput();
      expect(searchNote.opened).to.equal(true);
      searchNote.toggleSearchInput();
      expect(searchNote.opened).to.equal(false);
    });
  });

  describe('searchNotesCache', function () {
    it('should have searchNotesCache object', function () {
      expect(searchNote.searchNotesCache).to.be.an('object');
    });

    it('should check cache entry', function () {
      var tempSearchNotesCatche = angular.copy(searchNote.searchNotesCache);
      searchNote.searchNotesCache = {'cached1': ['apple', 'pear']};
      expect(searchNote.hasCacheEntry('cached1')).to.equal(true);
      expect(searchNote.hasCacheEntry('cached2')).to.equal(false);
      searchNote.searchNotesCache = tempSearchNotesCatche;
    });

    it('should create cache entry by filtering noteData.notes', function () {
      var tempSearchNotesCatche = angular.copy(searchNote.searchNotesCache);
      var tempNotes = noteData.notes.slice();

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

      searchNote.searchNotesCache = {
        'testTitle1': [{
          title: 'testTitle1 testTitle',
          text: 'Text1',
          tags: ['testTag1']
        }]
      };

      searchNote.createCacheEntry('testTitle');
      expect(searchNote.searchNotesCache['testTitle'].length).to.equal(3);

      searchNote.createCacheEntry('testTitle2');
      expect(searchNote.searchNotesCache['testTitle2'].length).to.equal(1);

      searchNote.searchNotesCache = tempSearchNotesCatche;
      noteData.notes = tempNotes;
    });
  });
});
