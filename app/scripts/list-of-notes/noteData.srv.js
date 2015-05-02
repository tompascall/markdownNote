// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [],
    stateOfNotes: [],

    addNote: function (data) {
      var id = this.notes.length;
      if (angular.isArray(data)) {
        var self = this;

        data.forEach(function (note) {
          self.notes.push({
            id: id,
            title: data.title,
            text: data.text,
            tags: data.tags
          });
          self.stateOfNotes.push({
            id: note.id,
            opened: false
          });
          id++;
        });
      }
      else if (angular.isObject(data)) {
        this.notes.push({
          id: id,
          title: data.title,
          text: data.text,
          tags: data.tags
        });

        this.stateOfNotes.push({
          id: id,
          opened: false
        });
      }
    },
    initStateOfNotes: function (notes) {
      this.stateOfNotes = [];
      this.notes = [];
      this.addNote(notes || this.welcomeNote);
    },
    welcomeNote: {
      title: 'Welcome!',
      text: 'Welcome to simpleNotes! This is a simple app ' +
        'to manage your notes.\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy']
    }
  };
});


