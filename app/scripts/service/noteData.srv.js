// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory(tagsFactory, markdown) {
  return {
    notes: [],

    prepareNote: function (noteInput) {
      var preparedNote = {};
      preparedNote.title = noteInput.title;
      preparedNote.text = noteInput.text;
      if (angular.isArray(noteInput.tags)) {
        noteInput.tags = noteInput.tags.join(',');
      }
      preparedNote.tags = tagsFactory.filterTagsString(noteInput.tags);
      this.setHtmlText(preparedNote);
      return preparedNote;
    },

    addNote: function (note) {
      if (angular.isObject(note)) {
        note = this.prepareNote(note);
        this.saveNewNoteToNoteData(note);
      }
      else {
        throw new Error('You are about to inject bad data format');
      }
      this.saveNotesToLocalStorage();
    },

    initNotes: function () {
      this.notes = this.loadNotesFromStorage();
      if (!this.notes) {
        this.notes = [];
        this.addNote(this.welcomeNote);
      }
    },

    saveNewNoteToNoteData: function (note) {
      this.notes.unshift({
        title: note.title,
        text: note.text,
        htmlText: note.htmlText,
        tags: note.tags,
        opened: false,
        id: this.createId()
      });
    },

    createId: function () {
      if (!this.notes.length) {
        return 0;
      }
      else {
        return this.notes[0].id + 1;
      }
    },

    saveNotesToLocalStorage: function () {
      window.localStorage.simpleNotes = angular.toJson(this.notes);
    },

    loadNotesFromStorage: function () {
      return angular.fromJson(window.localStorage.simpleNotes);
    },

    confirmDeleteNote: function () {
      return window.confirm('Are you sure you want to remove this note?');
    },

    deleteNote: function (note, event) {
      var index;
      if (this.confirmDeleteNote()) {
        index = this.getIndex(note);
        this.notes.splice(index, 1);
        this.saveNotesToLocalStorage();
      }
      if (event) {
        event.stopPropagation();
      }
    },

    getIndex: function (note) {
      var id = note.id;
      for (var i = 0, length = this.notes.length; i < length; i++) {
        if (this.notes[i].id === id) {
          return i;
        }
      }
    },

    updateNotes: function (note, editedNote) {
      editedNote = this.prepareNote(editedNote);
      var index = this.getIndex(note);
      this.notes[index].title = editedNote.title;
      this.notes[index].text = editedNote.text;
      this.notes[index].htmlText = editedNote.htmlText;
      this.notes[index].tags = editedNote.tags;
      this.saveNotesToLocalStorage();
    },

    setHtmlText: function (note) {
      note.htmlText = markdown.convertMarkdownToHTML(note.text);
    },

    welcomeNote: {
      title: 'Welcome!',
      text: '###Welcome to simpleNotes!\n\n'  +
        'This is a simple app ' +
        'to manage your notes.\n\n' +
        'You can **store** your notes, **edit** or ~~remove them~~' +
        ', and you can **filter** them by any keyword.\n\n' +
        'You can also use **markdown language** or **raw html** to style' +
        ' and structure the body of your notes.\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy'],
      opened: false
    }
  };
});


