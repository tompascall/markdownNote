// mock-data.spec.js

'use strict';

describe('Service: noteData', function () {

  beforeEach(module('simpleNote'));
    var noteData;

  beforeEach(inject(function ($injector) {
    noteData = $injector.get('noteData');
  }));

  describe('Test noteData.notes and addNote method', function () {
    it('should get noteData service', function () {
      expect(noteData).to.not.equal(undefined);
      expect(noteData.notes).to.be.an('array');
    });

    it('should add note', function () {
      noteData.notes = [];
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

      var note2 = {
          title: 'Second note',
          text: 'Lorem ipsum dolor sit amet...',
          tags: ['second note']
        };

      noteData.addNote(note2);
      expect(noteData.notes.length).to.equal(2);
      expect(noteData.notes[0].title).to.equal('Second note');
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

    it('should save notes to storage', function () {
      noteData.addNote(note);
      noteData.saveNotesToLocalStorage();
      var notes = angular.fromJson(window.localStorage.simpleNotes);
      expect(notes[0].title).to.equal(note.title);
    });

    it('should save note to localStorage when add a new note', function () {
      window.localStorage.removeItem('simpleNotes');
      noteData.initNotes();
      noteData.addNote(note);
      var notes = angular.fromJson(window.localStorage.simpleNotes);
      expect(notes[0].title).to.equal(note.title);
    });

    it('should initialize localStorage if simleNote field does note exist', function () {
      window.localStorage.removeItem('simpleNotes');
      noteData.initNotes();
      var notes = angular.fromJson(window.localStorage.simpleNotes);
      expect(notes[0].title).to.equal('Welcome!');
    });

    it('should not put the Welcome note to the storage,' +
        ' if the simpleNote field exist', function () {
      window.localStorage.simpleNotes = angular.toJson([]);
      noteData.initNotes();
      noteData.addNote(note);
      var notes = angular.fromJson(window.localStorage.simpleNotes);
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

    it('should load notes from storage to notesData service', function () {
      window.localStorage.removeItem('simpleNotes');
      noteData.addNote(note);
      noteData.notes = noteData.loadNotesFromStorage();
      expect(noteData.notes[0].title).to.equal('Title for testing purpose');
    });

    it('should init noteData.notes from localStorage', function () {
      window.localStorage.simpleNotes = angular.toJson([]);
      noteData.notes = [];
      noteData.addNote(note);
      noteData.notes = [];
      noteData.initNotes();
      expect(noteData.notes[0].title).to.equal('Title for testing purpose');
    });
  });

});
