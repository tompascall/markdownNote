// note-data.spec.js

'use strict';

describe('Service: noteData', function () {

  beforeEach(module('simpleNote'));
    var noteData;
    var markdown;
    var noteList;
    var scope;
    var displayedNotes;
    var searchNote;
    var pageService;

  beforeEach(inject(function ($injector) {
    noteData = $injector.get('noteData');
    markdown = $injector.get('markdown');
    scope = $injector.get('$rootScope');
    displayedNotes = $injector.get('displayedNotes');
    searchNote = $injector.get('searchNote');
    pageService = $injector.get('pageService');
  }));

  describe('Prepare note to add and edit', function () {
    var preparedNote;
    var note = {
      title: 'test title',
      text: 'test text',
      tags: 'test tag1, test tag2'
    };

    beforeEach(function () {
      preparedNote = noteData.prepareNote(note);
    });

    it('should give back an object with title', function () {
      expect(preparedNote.title).to.equal('test title');
    });

    it('should give back an object with text', function () {
      expect(preparedNote.text).to.equal('test text');
    });

    it('should give back tags array', function () {
      expect(preparedNote.tags).to.deep.equal(['test tag1', 'test tag2']);
    });
  });

  describe('Test noteData.notes and addNote method', function () {
    var tempNotes;
    var tempStorage;

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = [];
      noteData.updateDisplayedNotes();
      scope.$digest();
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });

    it('should get noteData service', function () {
      expect(noteData).to.not.equal(undefined);
      expect(noteData.notes).to.be.an('array');
    });

    it('should create unique id', function () {
      var note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose','gruff3']
      };
      expect(noteData.createId()).to.equal(0);
      noteData.addNote(note);
      expect(noteData.createId()).to.equal(1);
    });

    it('should add note', function () {
      var note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose']
      };
      noteData.addNote(note);
      expect(noteData.notes.length).to.equal(1);
      expect(noteData.notes[0].title).to.equal('Title for testing purpose');
      expect(noteData.notes[0].text).to.equal('Lorem ipsum dolor sit amet...');
      expect(noteData.notes[0].tags).to.deep.equal(['first note', 'testing purpose']);
      expect(noteData.notes[0].id).to.equal(0);

      var note2 = {
          title: 'Second note',
          text: 'Lorem ipsum dolor sit amet...',
          tags: ['second note']
        };

      noteData.addNote(note2);
      expect(noteData.notes.length).to.equal(2);
      expect(noteData.notes[0].title).to.equal('Second note');
      expect(noteData.notes[0].id).to.equal(1);
    });
  });

  describe('Add notesStatus object to noteData service to store opened/cosed status', function () {
    var note = {
      title: 'Title for testing purpose',
      text: 'Lorem ipsum dolor sit amet...',
      tags: ['first note', 'testing purpose', 'gruff5']
    };

    var tempNotes;
    var tempStorage;

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = [];
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });


    it('should set opened object', function () {
      noteData.addNote(note); // note.id = 0
      var id = '0';
      noteData.setNotesOpenedStatus(id, false);
      expect(noteData.opened['0']).to.equal(false);
    });

    it('should set opened object to false when add note', function () {
      noteData.addNote(note);
      expect(noteData.opened['0']).to.equal(true);
    });
  });

  describe('Save notes to windows.localStorage.notes', function () {
    var note;

    var tempNotes;
    var tempStorage;

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = [];
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);
      note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose','gruff1']
      };
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });

    it('should save notes to storage', function () {
      noteData.addNote(note);
      noteData.saveNotesToLocalStorage();
      var notes = angular.fromJson(window.localStorage.simpleNote);
      expect(notes[0].title).to.equal(note.title);
    });

    it('should save note to localStorage when add a new note', function () {
      window.localStorage.removeItem('simpleNote');
      noteData.initNotes();
      noteData.addNote(note);
      var notes = angular.fromJson(window.localStorage.simpleNote);
      expect(notes[0].title).to.equal(note.title);
    });

    it('should initialize localStorage if simpleNote field does note exist', function () {
      window.localStorage.removeItem('simpleNote');
      noteData.initNotes();
      var notes = angular.fromJson(window.localStorage.simpleNote);
      expect(notes[0].title).to.equal('Welcome!');
    });

    it('should not put the Welcome note to the storage,' +
        ' if the simpleNote field exist', function () {
      window.localStorage.simpleNote = angular.toJson([]);
      noteData.initNotes();
      noteData.addNote(note);
      var notes = angular.fromJson(window.localStorage.simpleNote);
      expect(notes.length).to.equal(1);
    });
  });

  describe('Load notes from windows.localStorage.notes', function () {
    var note;
    var tempNotes;
    var tempStorage;

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = [];
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);
      note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose','gruff2']
      };
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });


    it('should load notes from storage to notesData service', function () {
      window.localStorage.removeItem('simpleNote');
      noteData.addNote(note);
      noteData.notes = noteData.loadNotesFromStorage();
      expect(noteData.notes[0].title).to.equal('Title for testing purpose');
    });

    it('should init noteData.notes from localStorage', function () {
      window.localStorage.simpleNote = angular.toJson([]);
      noteData.notes = [];
      noteData.addNote(note);
      noteData.notes = [];
      noteData.initNotes();
      expect(noteData.notes[0].title).to.equal('Title for testing purpose');
    });
  });

  describe('Add `deleteNote` method to `noteData` directive.' +
    ' The method pop-up a confirm message', function () {

    var stub;
    var mockNote;
    var mockNote2;
    var mockNote3;
    var backupNotes;

    beforeEach(function () {
      stub = sinon.stub(window, 'confirm');
      noteData.notes = [];
      mockNote = {
        title: 'mockNote',
        text: 'mockText',
        tags: ['mockTag']
      };
      mockNote2 = {
        title: 'mockNote2',
        text: 'mockText2',
        tags: ['mockTag2']
      };
      mockNote3 = {
        title: 'mockNote3',
        text: 'mockText3',
        tags: ['mockTag3']
      };

      backupNotes = noteData.loadNotesFromStorage();
    });

    afterEach(function () {
      stub.restore();
      noteData.notes = backupNotes;
      noteData.saveNotesToLocalStorage();
    });

    it('should stub the a confirm', function () {
      stub.returns(true);
      expect(noteData.confirmDeleteNote()).to.equal(true);
    });

    it('should get note index', function () {
      noteData.addNote(mockNote);
      noteData.addNote(mockNote2);
      mockNote = noteData.notes[1];
      expect(noteData.getIndex(mockNote)).to.equal(1);
    });

    it('should not delete note if it is not confirmed', function () {
      stub.returns(false);
      var notesLength = 0;
      noteData.addNote(mockNote);
      mockNote = noteData.notes[0];
      noteData.deleteNote(mockNote); // trying to remove the last added note
      expect(noteData.notes.length).to.equal(notesLength + 1);
    });

    it('should delete note if it is confirmed', function () {
      stub.returns(true);
      var notesLength = 0;
      noteData.addNote(mockNote);
      noteData.addNote(mockNote2);
      var storageLengthAfterAddNote = noteData.loadNotesFromStorage().length;
      mockNote = noteData.notes[1];
      noteData.deleteNote(mockNote);
      expect(noteData.notes[0].title).to.equal('mockNote2');
      expect(noteData.notes.length).to.equal(notesLength + 1);

      var StorageLengthAfterDeleteNote = noteData.loadNotesFromStorage().length;
      expect(StorageLengthAfterDeleteNote).to.equal(storageLengthAfterAddNote - 1);
    });

    it('should call updateDisplayedNotes when deleting notes', function () {
      stub.returns(true);
      var notesLength = 0;
      noteData.addNote(mockNote);
      sinon.spy(noteData, 'updateDisplayedNotes');
      mockNote = noteData.notes[0];
      noteData.deleteNote(mockNote);
      expect(noteData.updateDisplayedNotes.called).to.equal(true);
      noteData.updateDisplayedNotes.restore();
    });
  });

  describe('Integrate markdown service to noteData service', function () {
    var note = {
      title: 'Test note',
      text: '##Test',
      tags: ['markdown']
    };
    var tempNotes;
    var tempStorage;

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = [];
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });

    it('should call markdown.convertMarkdownToHTML', function () {
      sinon.spy(markdown, 'convertMarkdownToHTML');
      noteData.setNoteHtmlText(note);
      expect(markdown.convertMarkdownToHTML.calledOnce).to.equal(true);
      markdown.convertMarkdownToHTML.restore();
    });

    it('should set HtmlText of note', function () {
      noteData.setNoteHtmlText(note);
      expect(note.htmlText).to.equal('<h2>Test</h2>');
    });

    it('should prepare note using setHtmlText', function () {
      var preparedNote = noteData.prepareNote(note);
      expect(preparedNote.htmlText).to.equal('<h2>Test</h2>');
    });

    it('should save htmlText property to noteData.notes array', function () {
      note = noteData.prepareNote(note);
      noteData.saveNewNoteToNoteData(note);
      expect(noteData.notes[0].htmlText).to.equal('<h2>Test</h2>');
    });

    it('should update htmlText property when update note', function () {
      note = noteData.prepareNote(note);
      noteData.saveNewNoteToNoteData(note);
      note.text = '###Updated text';
      noteData.updateNotes(noteData.notes[0], note);
      expect(noteData.notes[0].htmlText).to.equal('<h3>Updated text</h3>');
    });
  });

  describe('Save data to file from storage', function () {
    var backupData = angular.toJson([
      {
        title: 'mockNote',
        text: 'mockText',
        tags: ['mockTag']
      }
    ]);

    it('should load notes from storage as string', function () {
      var temp = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.fromJson(backupData);
      var stringNotes = noteData.loadStringNotesFromStorage();
      expect(stringNotes).to.equal(window.localStorage.simpleNote);
      window.localStorage.simpleNote = temp;
    });
  });

  describe('Backup data', function () {
    var backupData = angular.toJson([
      {
        title: 'mockNote',
        text: 'mockText',
        tags: ['mockTag']
      }
    ]);

    it('should save backup data to localStorage', function () {
      var temp = window.localStorage.simpleNote;
      noteData.saveBackupDataToStorage(backupData);
      expect(angular.fromJson(window.localStorage.simpleNote)[0].title)
        .to.equal('mockNote');
      window.localStorage.simpleNote = temp;
    });

    it('should backup Notes from backupData', function () {
      var tempStorage = window.localStorage.simpleNote;
      var tempNotes = noteData.notes;
      noteData.backupNotesFromBackupData(backupData);
      expect(noteData.notes[0].title).to.equal('mockNote');
      window.localStorage.simpleNote = tempStorage;
      noteData.notes = tempNotes;
    });
  });

  describe('Apply searchNote', function () {
    var tempNoteData;
    var tempDisplayedNotes;
    var tempCurrentPage;

    beforeEach(function () {
      tempNoteData = noteData.notes.slice();
      tempDisplayedNotes = displayedNotes.notes.slice();
      tempCurrentPage = pageService.currentPage;

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
    });

    afterEach(function () {
      noteData.notes = tempNoteData.slice();
      displayedNotes.notes = tempDisplayedNotes.slice();
      pageService.currentPage = tempCurrentPage;
    });

    it('applySearchNotes should update displayedNotes', function (done) {

      noteData.applySearchNotes('testTitle1');
      setTimeout(function () {
        expect(displayedNotes.notes.length).to.equal(1);
        expect(displayedNotes.notes[0].title).to.equal('testTitle1 testTitle');
        done();
      },0);
    });

    it('should recalculate number of pages when apply searching', function (done) {
      pageService.currentPage = 12;
      sinon.spy(pageService, 'updatePages');
      noteData.applySearchNotes('testTitle1');
      setTimeout(function () {
        expect(pageService.currentPage).to.equal(1);
        expect(pageService.updatePages.called).to.equal(true);
        pageService.updatePages.restore();
        done();
      },0);
    });
  });

  describe('Update displayedNotes when add or remove notes', function () {
    var tempNotes;
    var tempStorage;
    var stub;

    var testNote1 = {
        title: 'mockNote1 testUpdateWithFilter',
        text: 'mockText1',
        tags: ['mockTag1'],
        id: 12
    };
    var testNote2 = {
        title: 'mockNote2 testUpdateWithFilter',
        text: 'mockText2',
        tags: ['mockTag2'],
        id: 13
    };

    var testNote3 = {
        title: 'mockNote3',
        text: 'mockText3',
        tags: ['mockTag3'],
        id: 13
    };

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = [];
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);

      stub = sinon.stub(window, 'confirm');
      stub.returns(true); // confirm deleting
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;

      stub.restore();
    });

    it('should update displayedNotes after add note', function () {
      noteData.addNote(testNote1);
      expect(displayedNotes.notes[0].title).to.equal('mockNote1 testUpdateWithFilter');
    });

    it('should update displayedNotes after removing note', function () {
      noteData.addNote(testNote1);
      noteData.addNote(testNote2);
      expect(displayedNotes.notes[0].title).to.equal('mockNote2 testUpdateWithFilter');
      noteData.deleteNote(noteData.notes[0]);
      expect(displayedNotes.notes[0].title).to.equal('mockNote1 testUpdateWithFilter');
    });

    it('should take into account searchInput when updating displayNotes', function () {
      var tempSearchTerm = searchNote.searchTerm;
      noteData.addNote(testNote1);
      noteData.addNote(testNote2);
      noteData.addNote(testNote3);
      searchNote.searchTerm = 'testUpdateWithFilter';
      noteData.applySearchNotes(searchNote.searchTerm);
      expect(displayedNotes.notes.length).to.equal(2);
      expect(displayedNotes.notes[0].title).to.equal('mockNote2 testUpdateWithFilter');

      noteData.deleteNote(displayedNotes.notes[0]);

      expect(displayedNotes.notes.length).to.equal(1);
      expect(displayedNotes.notes[0].title).to.equal('mockNote1 testUpdateWithFilter');
      searchNote.searchTerm = tempSearchTerm;
    });
  });
});
