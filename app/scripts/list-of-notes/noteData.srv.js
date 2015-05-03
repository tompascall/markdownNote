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
          self.notes.push({
            title: data.title,
            text: data.text,
            tags: data.tags,
            opened: false
          });
        });
      }
      else if (angular.isObject(data)) {
        this.notes.push({
          title: data.title,
          text: data.text,
          tags: data.tags,
          opened: false
        });
      }
    },
    initStateOfNotes: function (notes) {
      this.notes = [];
      this.addNote(notes || this.welcomeNote);
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


