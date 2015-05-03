// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [],

    addNote: function (data) {
      if (angular.isArray(data)) {
        var self = this;
        data.forEach(function (note) {
          self.notes.unshift({
            title: note.title,
            text: note.text,
            tags: note.tags,
            opened: false
          });
        });
      }
      else if (angular.isObject(data)) {
        this.notes.unshift({
          title: data.title,
          text: data.text,
          tags: data.tags,
          opened: false
        });
      }
      else {
        throw new Error('You are about to inject bad data format');
      }
    },

    initNotes: function (notes) {
      this.notes = [];
      this.addNote(notes || this.welcomeNote);
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


