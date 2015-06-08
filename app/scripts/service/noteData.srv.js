// noteData.srv.js

'use strict';

angular.module('markdownNote')

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
      window.localStorage.markdownNote = angular.toJson(this.notes);
    },

    loadNotesFromStorage: function () {
      return angular.fromJson(window.localStorage.markdownNote);
    },

    loadStringNotesFromStorage: function () {
      return window.localStorage.markdownNote;
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
      window.localStorage.markdownNote = backupData;
    },

    backupNotesFromBackupData: function (backupData) {
      this.saveBackupDataToStorage(backupData);
      this.initNotes();
    },

    welcomeNote: {
      title: 'Welcome!',
      text: '###Welcome to Markdown Note!\n\n'  +
        'This is a lightweight, simple app ' +
        'to manage your notes.\n\n' +
        'You can \n\n' +
        '- **store** your notes locally\n' +
        '- easily **tag** your notes\n' +
        '- **filter** them by any keyword.\n\n' +
        'You can also use **markdown language** to style' +
        ' and structure the body of your notes.\n\n' +
        'If you **tap on Markdown Note** in the header, you can **save your notes** ' +
        'to your file system and you can **backup your data** or sync with another device.\n\n' +
        'Enjoy it!',
      tags: ['Welcome note', 'enjoy']
    },

    markdownNote: {
      title: 'Markdown tools for styling your note',
      text: 'Just tap on the **edit button** at the bottom of this note,' +
            ' and you can see how easy to form the text with markdown.\n\n' +
            '###Headers\n\n' +
            '#Organize your ideas\n' +
            '##Find your tools\n' +
            '###Keep it simple\n' +
            '####Use Markdown Note\n' +
            '#####Structure the text\n' +
            '######Use markdown\n\n' +
            '---\n\n' +

            '###Smart lists\n\n' +
            '* plants\n' +
            '* animals\n' +
            '  1. Parazoa\n' +
            '  2. Eumetazoa\n' +
            '    * Radiata\n' +
            '    * Bilateralia\n' +
            '      1. Protostomia\n' +
            '      2. Deuterostomia\n' +
            '        * Chaetognatha\n' +
            '        * Hemichordata\n' +
            '        * Echinodermata\n' +
            '        * Chordata\n' +
            '           1. Urochordata\n' +
            '           2. Cephalochordata\n' +
            '           3. Vertebrata\n\n' +
            '---\n\n' +

            '###Link\n\n' +
            '[Markdown](http://en.wikipedia.org/wiki/Markdown)\n\n' +
            'http://en.wikipedia.org/wiki/Markdown\n\n' +
            '---\n\n' +

            '###Bold\n\n' +
            '**bold**\n\n' +

            '---\n\n' +
            '###Italic\n\n' +
            '*italic*\n\n' +

            '---\n\n' +
            '###Blockquote\n\n' +

            '> Markdown is a text-to-HTML conversion tool for web writers.' +
            ' Markdown allows you to write using an easy-to-read, easy-to-write' +
            ' plain text format, then convert it to structurally valid XHTML (or HTML).\n\n' +
            'http://daringfireball.net/projects/markdown/\n\n' +

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

            '###Tables\n\n' +
            '| Fruit     | Value | Qty |\n' +
            '| --------- | ----- | --  |\n' +
            '| Orange    | $0.50 | 5   |\n' +
            '| Apple     | $0.30 | 4   |\n' +
            '| Pear      | $0.40 | 3   |\n' +
            '---\n\n' +

            '###Images\n\n' +
            '![colibri](images/colibri.jpg)\n\n',
      tags: 'markdown, keep it simple'
    }
  };
});


