// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [],

    addNote: function (data) {
      var self = this;
      if (angular.isArray(data)) {
        data.forEach(function (note) {
          self.saveNoteToNoteData(note);
        });
      }
      else if (angular.isObject(data)) {
        this.saveNoteToNoteData(data);
      }
      else {
        throw new Error('You are about to inject bad data format');
      }
      this.saveNotesToLocalStorage();
    },

    initNotes: function (notes) {
      this.notes = [];
      if (!angular.fromJson(window.localStorage.simpleNotes)) {
        this.addNote(notes || this.welcomeNote);
      }
      else {
        notes = {
          title: 'title',
          text: 'text',
          tags: ['tag'],
          opened: false
        };
        this.addNote(notes);
      }
    },

    saveNoteToNoteData: function (note) {
      this.notes.unshift({
        title: note.title,
        text: note.text,
        tags: note.tags,
        opened: false
      });
    },

    saveNotesToLocalStorage: function () {
      window.localStorage.simpleNotes = angular.toJson(this.notes);
    },

    welcomeNote: {
      title: 'Welcome!',
      text: 'Welcome to simpleNotes! This is a simple app ' +
        'to manage your notes.\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy'],
      opened: false
    }
  };
});


