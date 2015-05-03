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

    it('should add Welcome note if simpleNote localstorage data does not exist', function () {
      window.localStorage.removeItem('simpleNotes');
      noteData.initNotes();
      expect(noteData.notes[0].title).to.equal('Welcome!');
      noteData.addNote(note);
      noteData.saveNotesToLocalStorage();
      noteData.initNotes();
      expect(noteData.notes[0].title).to.equal('Title for testing purpose');
    });
  });
});
