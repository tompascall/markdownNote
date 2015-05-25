// mock-data.spec.js

'use strict';

describe('Service: noteData', function () {

  beforeEach(module('simpleNote'));
    var noteData;
    var markdown;

  beforeEach(inject(function ($injector) {
    noteData = $injector.get('noteData');
    markdown = $injector.get('markdown');
  }));

  describe('Prepare note to add and edit', function () {
    var preparedNote;
    var note = {
      title: 'test title',
      text: 'test text',
      tags: 'test tag1, test tag2'
    };

    it('should give back an object with title', function () {
      preparedNote = noteData.prepareNote(note);
      expect(preparedNote.title).to.equal('test title');
    });

    it('should give back an object with text', function () {
      preparedNote = noteData.prepareNote(note);
      expect(preparedNote.text).to.equal('test text');
    });

    it('should give back tags array', function () {
      preparedNote = noteData.prepareNote(note);
      expect(preparedNote.tags).to.deep.equal(['test tag1', 'test tag2']);
    });
  });

  describe('Test noteData.notes and addNote method', function () {

    beforeEach(function () {
      noteData.notes = [];
    });

    afterEach(function () {
      noteData.notes = [];
    });

    it('should get noteData service', function () {
      expect(noteData).to.not.equal(undefined);
      expect(noteData.notes).to.be.an('array');
    });

    it('should create unique id', function () {
      var note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose']
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
      expect(noteData.notes[0].opened).to.equal(false);
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

  describe('Save notes to windows.localStorage.notes', function () {
    var note;

    beforeEach(function () {
      noteData.notes = [];
      note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose']
      };
    });

    afterEach(function () {
      noteData.notes = [];
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

    it('should initialize localStorage if simleNote field does note exist', function () {
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

    beforeEach(function () {
      noteData.notes = [];
      note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose']
      };
    });

    afterEach(function () {
      noteData.notes = [];
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
  });

  describe('Integrate markdown service to noteData service', function () {
    var note = {
      title: 'Test note',
      text: '##Test',
      tags: ['markdown']
    };

    beforeEach(function () {
      noteData.notes = [];
    });

    afterEach( function () {
      noteData.notes = [];
    });

    it('should call markdown.convertMarkdownToHTML', function () {
      sinon.spy(markdown, 'convertMarkdownToHTML');
      noteData.setHtmlText(note);
      expect(markdown.convertMarkdownToHTML.calledOnce).to.equal(true);
      markdown.convertMarkdownToHTML.restore();
    });

    it('should set HtmlText of note', function () {
      noteData.setHtmlText(note);
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
});
