// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory(tagsFactory, markdown,
    displayedNotes, pageService, searchNotesFilter, searchNote) {
  return {
    notes: [],
    opened: {},

    prepareNote: function (noteInput) {
      var preparedNote = {};
      preparedNote.title = noteInput.title;
      preparedNote.text = noteInput.text || '';
      if (angular.isArray(noteInput.tags)) {
        noteInput.tags = noteInput.tags.join(',');
      }
      preparedNote.tags = tagsFactory.filterTagsString(noteInput.tags);
      this.setNoteHtmlText(preparedNote);
      return preparedNote;
    },

    setNotesOpenedStatus: function (id, openedStatus) {
      if (openedStatus === 'opened') {openedStatus = true;}
      if (openedStatus === 'closed') {openedStatus = false;}
      this.opened[id] = openedStatus;
    },

    addNote: function (note, opened) {
      if (angular.isObject(note)) {
        note = this.prepareNote(note);
        this.saveNewNoteToNoteData(note);
        this.updateDisplayedNotes();
        this.setNotesOpenedStatus(this.notes[0].id, opened || true);
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
        this.addNote(this.markdownNote, 'closed');
        this.addNote(this.welcomeNote, 'opened');
      }
      this.updateDisplayedNotes();
    },

    saveNewNoteToNoteData: function (note) {
      this.notes.unshift({
        title: note.title,
        text: note.text,
        htmlText: note.htmlText,
        tags: note.tags,
        id: this.createId()
      });
    },

    updateDisplayedNotes: function () {
      if (searchNote.searchTerm) {
        this.applySearchNotes(searchNote.searchTerm);
      }
      else {
        displayedNotes.notes = this.notes.slice();
      }
      pageService.updatePages(displayedNotes.notes);
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
      window.localStorage.simpleNote = angular.toJson(this.notes);
    },

    loadNotesFromStorage: function () {
      return angular.fromJson(window.localStorage.simpleNote);
    },

    loadStringNotesFromStorage: function () {
      return window.localStorage.simpleNote;
    },

    confirmDeleteNote: function () {
      return window.confirm('Are you sure you want to remove this note?');
    },

    deleteNote: function (note, event) {
      var index;
      if (this.confirmDeleteNote()) {
        index = this.getIndex(note);
        this.notes.splice(index, 1);
        this.updateDisplayedNotes();
        this.saveNotesToLocalStorage();
      }
      if (event) {
        event.stopPropagation();
      }
    },

    applySearchNotes: function (searchTerm) {
      displayedNotes.notes = searchNotesFilter(this.notes, searchTerm);
      console.log(displayedNotes.notes);
      pageService.updatePages(displayedNotes.notes);
    },

    getIndex: function (note) {
      var id = note.id;
      for (var i = 0, length = this.notes.length; i < length; i++) {
        if (this.notes[i].id === id) {
          return i;
        }
      }
    },

    updateNotes: function (note, noteInput) {
      noteInput = this.prepareNote(noteInput);
      var index = this.getIndex(note);
      this.notes[index].title = noteInput.title;
      this.notes[index].text = noteInput.text;
      this.notes[index].htmlText = noteInput.htmlText;
      this.notes[index].tags = noteInput.tags;
      this.saveNotesToLocalStorage();
    },

    setNoteHtmlText: function (note) {
      note.htmlText = markdown.convertMarkdownToHTML(note.text);
    },

    saveBackupDataToStorage: function (backupData) {
      window.localStorage.simpleNote = backupData;
    },

    backupNotesFromBackupData: function (backupData) {
      this.saveBackupDataToStorage(backupData);
      this.initNotes();
    },

    welcomeNote: {
      title: 'Welcome!',
      text: '###Welcome to simpleNote!\n\n'  +
        'This is a lightweight, simple app ' +
        'to manage your notes.\n\n' +
        'You can **store** your notes locally, you can **update** of their content' +
        ', and you can **filter** them by any keyword.\n\n' +
        'You can also use **markdown language** to style' +
        ' and structure the body of your notes.\n\n' +
        'If you **tap on simpleNote** in the header, you can **save your notes** ' +
        'to your file system and you can **backup your data** or sync with another device.\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy']
    },

    markdownNote: {
      title: 'Markdown tools for styling the body of your note',
      text: '###Headers\n\n' +
            '#Organize your ideas\n' +
            '##Find your tools\n' +
            '###Keep it simple\n' +
            '####Use simpleNote\n' +
            '#####Structure the text\n' +
            '######Use markdown\n\n' +
            '---\n\n' +
            '###Link\n\n' +
            '[Markdown](http://en.wikipedia.org/wiki/Markdown)\n\n' +
            '###Bold\n\n' +
            '**bold**\n\n' +
            '---\n\n' +
            '###Italic\n\n' +
            '*italic*\n\n' +
            '---\n\n' +
            '###Code\n\n' +
            '```\n' +
            'it("should call toggleSearchInput method", function () {\n' +
            '  sinon.spy(searchNote, "toggleSearchInput");\n' +
            '  element.find("button#search-button").click();\n' +
            '  expect(searchNote.toggleSearchInput.calledOnce).to.equal(true);\n' +
            '  searchNote.toggleSearchInput.restore();\n' +
            '});\n' +
            '```\n\n' +
            '---\n\n' +
            '###Strike through\n\n' +
            '~~Deleted~~\n\n' +
            '---\n\n' +
            '###Definiton\n\n' +
            'Term 1\n' +
            ':   Definition 1\n\n' +
            'Term 2\n' +
            ':   Definition 2\n\n' +
            '---\n\n' +
            '###Tables\n\n' +

            '| Fruit     | Value | Qty |\n' +
            '| --------- | ----- | --  |\n' +
            '| Orange    | $0.50 | 5   |\n' +
            '| Apple     | $0.30 | 4   |\n' +
            '| Pear      | $0.40 | 3   |\n' +


            '###Images\n\n' +
            '![colibri](images/colibri.jpg)\n\n',
      tags: 'markdown, keep it simple'
    }
  };
});


