angular.module('markdownNote.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('scripts/directive/about.drv.html',
    '<!-- about.drv.html -->\n' +
    '\n' +
    '<button class="item aboutButton button button-full button-royal" ng-click="ctrl.toggleAboutMessage()">About Markdown Note</button>\n' +
    '<div class="aboutMessage card" ng-show="ctrl.messageService.messages.showAboutMessage">\n' +
    '  <div class="item item-text-wrap" ng-click="ctrl.externalLinkService.handleLinkClicked($event)">\n' +
    '    <h3>Markdown Note v0.1.3</h3>\n' +
    '    <p>This is a sample project, using <a href="http://ionicframework.com/">Ionic framework</a>, developing in test driven way.</p>\n' +
    '    <p>On Android platform you can save your notes to the sdcard/download folder. On iOS platform you can save your notes to the application folder, and they will be synced on iCloud.</p>\n' +
    '    <p>You can check the project in my github: <a href="https://github.com/tompascall/markdownNote">https://github.com/tompascall/markdownNote</a>.</p>\n' +
    '    <p>The markdown feature is based on the\n' +
    '      <a href="https://github.com/chjj/marked">marked</a> project.</p>\n' +
    '    <p>Created by <a href="https://hu.linkedin.com/in/tompascall">tompascall</a>.</p>\n' +
    '    <br/>\n' +
    '    <h3>LICENSE</h3>\n' +
    '\n' +
    '    <p>Copyright 2015-present Tamas G. Toth</p>\n' +
    '\n' +
    '    <p>MIT License</p>\n' +
    '\n' +
    '    <p>Permission is hereby granted, free of charge, to any person obtaining\n' +
    '    a copy of this software and associated documentation files (the\n' +
    '    "Software"), to deal in the Software without restriction, including\n' +
    '    without limitation the rights to use, copy, modify, merge, publish,\n' +
    '    distribute, sublicense, and/or sell copies of the Software, and to\n' +
    '    permit persons to whom the Software is furnished to do so, subject to\n' +
    '    the following conditions:</p>\n' +
    '\n' +
    '    <p>The above copyright notice and this permission notice shall be\n' +
    '    included in all copies or substantial portions of the Software.</p>\n' +
    '\n' +
    '    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,\n' +
    '    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n' +
    '    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\n' +
    '    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\n' +
    '    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\n' +
    '    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION\n' +
    '    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/directive/app-header.drv.html',
    '<!-- app-header.drv.html -->\n' +
    '<button id="search-button" class="button button-icon" ng-click="ctrl.searchNote.toggleSearchInput()">\n' +
    '  <i class="icon ion-search"></i>\n' +
    '</button>\n' +
    '\n' +
    '<h1 class="title" ng-click="ctrl.showModal(ctrl.extrasModal)"><span id="notes-header">Markdown Note</span></h1>\n' +
    '\n' +
    '<button id="add-button" class="button button-icon" ng-click="ctrl.showModal(ctrl.newNoteModal)"><i class="icon ion-plus-round"></i>\n' +
    '</button>\n' +
    '');
  $templateCache.put('scripts/directive/edit-note-modal-body.drv.html',
    '<!-- edit-note-modal-body.drv.html -->\n' +
    '\n' +
    '<div class="list">\n' +
    '  <label class="item item-input">\n' +
    '    <input class="modal-title" name="title" type="text" placeholder="Title of your note" ng-model="ctrl.noteInput.title" required>\n' +
    '  </label>\n' +
    '\n' +
    '  <label class="item item-input">\n' +
    '    <textarea id="edit-note-modal-text" placeholder="Enter your note here" ng-model="ctrl.noteInput.text"></textarea>\n' +
    '  </label>\n' +
    '\n' +
    '  <label class="item item-input">\n' +
    '    <input class="modal-tags" type="text" placeholder="Tags (separated by commas)" ng-model="ctrl.noteInput.tags">\n' +
    '  </label>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/directive/load-file.drv.html',
    '<!-- load-file.drv.html -->\n' +
    '\n' +
    '<button class="item backupFromDeviceButton button button-full button-dark" ng-click="ctrl.loadText()">Backup notes from markdownNote.json</button>\n' +
    '<div class="card" ng-show="ctrl.messageService.messages.loadLocalFileMessage">\n' +
    '  <div class="item item-text-wrap">\n' +
    '    <h3 ng-bind="ctrl.messageService.messages.loadLocalFileMessage"></h3>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/directive/load-from-dropbox.drv.html',
    '<!-- load-from-dropbox.drv.html -->\n' +
    '\n' +
    '<button class="item loadFromDropboxButton button button-full button-positive" ng-click="ctrl.load()">Load notes from your Dropbox</button>\n' +
    '\n' +
    '<div class="card" id="dropboxReadMessageCard" ng-show="ctrl.messageService.messages.dropboxReadMessage">\n' +
    '  <div class="item item-text-wrap">\n' +
    '    <h3 ng-bind="ctrl.messageService.messages.dropboxReadMessage"></h3>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '');
  $templateCache.put('scripts/directive/note-list.drv.html',
    '<!-- noteList.drv.html -->\n' +
    '\n' +
    '<ion-list>\n' +
    '  <div class="note-item" ng-repeat="note in ctrl.displayedNotes.notes | startFrom: (ctrl.pageService.currentPage - 1) * ctrl.pageService.pageSize | limitTo: ctrl.pageService.pageSize" ng-click="ctrl.toggleNoteState(note)">\n' +
    '\n' +
    '    <div class="row">\n' +
    '      <div class="note-title-container col col-90">\n' +
    '        <h2 class=\'note-title\'>\n' +
    '          <span class="wordwrap" ng-bind="note.title"></span>\n' +
    '        </h2>\n' +
    '      </div>\n' +
    '      <div class="col col-10 note-close-container">\n' +
    '        <i class="icon icon-right ion-ios-close-outline note-close" ng-click="ctrl.noteData.deleteNote(note, $event)"></i>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div id="note-text-and-tags" ng-if="ctrl.noteData.opened[note.id]">\n' +
    '      <div class="text-title-container">\n' +
    '        <div class="text-title text-title-wordwrap" ng-bind-html="note.htmlText" ng-click="ctrl.externalLinkService.handleLinkClicked($event)"></div>\n' +
    '      </div>\n' +
    '      <div id="tags-row" class="row">\n' +
    '        <p id="tag-container" class="col col-80">\n' +
    '          <i class="icon ion-pricetag"></i>&nbsp;\n' +
    '          <span class="tag-title" ng-repeat="tag in note.tags" ng-bind="tag + \' \'"></span>\n' +
    '        </p>\n' +
    '        <div class="col col-20 note-edit-container">\n' +
    '          <i id="edit-button" class="button button-icon icon icon-right ion-edit note-edit" ng-click="ctrl.editNote(note, $event)"></i>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <pagination></pagination>\n' +
    '</ion-list>\n' +
    '');
  $templateCache.put('scripts/directive/pagination.drv.html',
    '<!-- pagination.drv.html -->\n' +
    '\n' +
    '<div class="pagination">\n' +
    '  <div class="row">\n' +
    '    <div class="col col-20">\n' +
    '      <button class="backToStartButton button button-block" ng-class="{\'button-positive\': !ctrl.pageService.onTheFirstPage()}" ng-click="ctrl.pageService.backToStart()"><i class="icon ion-ios-arrow-left"></i><i class="icon ion-ios-arrow-left"></i></button>\n' +
    '    </div>\n' +
    '    <div class="col">\n' +
    '      <button class="backwardButton button button-block icon ion-ios-arrow-left" ng-class="{\'button-positive\': ctrl.pageService.currentPage > 1}" ng-click="ctrl.pageService.setCurrentPage(-1)"></button>\n' +
    '    </div>\n' +
    '    <div class="col">\n' +
    '      <button class="forwardButton button button-block icon ion-ios-arrow-right" ng-class="{\'button-positive\': ctrl.pageService.currentPage < ctrl.pageService.numberOfPages}" ng-click="ctrl.pageService.setCurrentPage(1)"></button>\n' +
    '    </div>\n' +
    '    <div class="col col-20">\n' +
    '      <button class="forwardToEndButton button button-block" ng-class="{\'button-positive\': !ctrl.pageService.onTheLastPage()}" ng-click="ctrl.pageService.forwardToEnd()"><i class="icon ion-ios-arrow-right"></i><i class="icon ion-ios-arrow-right"></i></button>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/directive/save-file.drv.html',
    '<!-- save-file.drv.html -->\n' +
    '\n' +
    '<button class="item saveToDeviceButton button button-full button-dark" ng-click="ctrl.saveText()">Save notes to markdownNote.json</button>\n' +
    '<div class="card" ng-show="ctrl.messageService.messages.saveLocalFileMessage">\n' +
    '  <div class="item item-text-wrap">\n' +
    '    <h3 ng-bind="ctrl.messageService.messages.saveLocalFileMessage"></h3>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/directive/save-to-dropbox.drv.html',
    '<!-- save-to-dropbox.drv.html -->\n' +
    '\n' +
    '<button class="item saveToDropboxButton button button-full button-positive" ng-click="ctrl.save()">Save notes to your Dropbox</button>\n' +
    '\n' +
    '<div class="card" ng-show="ctrl.messageService.messages.dropboxWriteMessage">\n' +
    '  <div class="item item-text-wrap">\n' +
    '    <h3 ng-bind="ctrl.messageService.messages.dropboxWriteMessage"></h3>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '');
  $templateCache.put('scripts/directive/search-input.drv.html',
    '<!-- search-input.drv.html -->\n' +
    '\n' +
    '<ion-header-bar class="bar-subheader item-input-inset" ng-show="ctrl.searchNote.opened">\n' +
    '  <label class="item-input-wrapper">\n' +
    '    <input type="search" placeholder="search" ng-model="ctrl.searchNote.searchTerm.$">\n' +
    '  </label>\n' +
    '</ion-header-bar>\n' +
    '');
  $templateCache.put('scripts/modal/edit-note-modal.html',
    '<!-- edit-note-modal.html -->\n' +
    '\n' +
    '<div class="modal">\n' +
    '  <!-- Modal header bar -->\n' +
    '  <ion-header-bar class="secondary" align-title="center">\n' +
    '    <h1 class="title">Edit Your Note</h1>\n' +
    '    <button id="edit-note-modal-cancel-button" class="button button-clear button-positive" ng-click="ctrl.hideModal(ctrl.editNoteModal)">Cancel</button>\n' +
    '  </ion-header-bar>\n' +
    '  <!-- Modal content area -->\n' +
    '  <ion-content>\n' +
    '    <form name="newNoteModalForm" novalidate>\n' +
    '      <edit-note-modal-body></edit-note-modal-body>\n' +
    '      <div class="padding">\n' +
    '        <button id="edit-note-modal-update-button" type="submit" class="button button-block button-positive" ng-disabled="newNoteModalForm.title.$invalid" ng-click="ctrl.updateNotes(ctrl.note)">Update Note</button>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </ion-content>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/modal/extras-modal.html',
    '<!-- extras-modal.html -->\n' +
    '\n' +
    '<div class="modal">\n' +
    '  <!-- Modal header bar -->\n' +
    '  <ion-header-bar class="secondary bar-stable" align-title="center">\n' +
    '    <h1 class="title">Extras</h1>\n' +
    '    <button id="extras-modal-cancel-button" class="button button-clear button-positive" ng-click="ctrl.hideModal(ctrl.extrasModal)">Cancel</button>\n' +
    '  </ion-header-bar>\n' +
    '  <!-- Modal content area -->\n' +
    '  <ion-content>\n' +
    '    <form name="extrasModalForm">\n' +
    '      <div class="list padding">\n' +
    '        <save-to-dropbox></save-to-dropbox>\n' +
    '        <load-from-dropbox></load-from-dropbox>\n' +
    '        <save-file></save-file>\n' +
    '        <load-file></load-file>\n' +
    '        <about></about>\n' +
    '\n' +
    '        <!-- add 100 test notes - only for development -->\n' +
    '        <div ng-if="ctrl.environment.development">\n' +
    '          <button id="testMuchNotes" class="item button button-full button-dark" ng-click="ctrl.addTestNotes(100)">Add 100 test notes</button>\n' +
    '        </div>\n' +
    '\n' +
    '        <button id="doneExtrasButton" type="submit" class="button button-full button-balanced" ng-click="ctrl.hideModal(ctrl.extrasModal)">Back</button>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </ion-content>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/modal/new-note-modal.html',
    '<!-- new-note-modal.html -->\n' +
    '\n' +
    '<div class="modal">\n' +
    '  <!-- Modal header bar -->\n' +
    '  <ion-header-bar class="secondary" align-title="center">\n' +
    '    <h1 class="title">Your New Note</h1>\n' +
    '    <button id="new-note-modal-cancel-button" class="button button-clear button-positive" ng-click="ctrl.hideModal(ctrl.newNoteModal)">Cancel</button>\n' +
    '  </ion-header-bar>\n' +
    '  <!-- Modal content area -->\n' +
    '  <ion-content>\n' +
    '    <form name="newNoteModalForm" novalidate>\n' +
    '      <div class="list">\n' +
    '        <label class="item item-input">\n' +
    '          <input id="newNoteModalTitle" name="title" type="text" placeholder="Title of your note" ng-model="ctrl.title" required>\n' +
    '        </label>\n' +
    '\n' +
    '        <label class="item item-input">\n' +
    '          <textarea rows="10" placeholder="Enter your note here" ng-model="ctrl.text"></textarea>\n' +
    '        </label>\n' +
    '\n' +
    '        <label class="item item-input">\n' +
    '          <input id="newNoteModalTags" type="text" placeholder="Tags (separated by commas)" ng-model="ctrl.tags">\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <div class="padding">\n' +
    '        <button id="createNewNoteButton" type="submit" class="button button-block button-positive" ng-click="ctrl.addNewNote()" ng-disabled="newNoteModalForm.title.$invalid">Create Note</button>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </ion-content>\n' +
    '</div>\n' +
    '');
  $templateCache.put('scripts/sample/sample.drv.html',
    '<button class="sample-class">\n' +
    '  <h1>Sample</h1>\n' +
    '</button>\n' +
    '');
}]);

// app.js

'use strict';

angular.module('markdownNote', ['config', 'ionic', 'ngSanitize', 'ngCordova', 'markdownNote.templates'])

.run(["$ionicPlatform", function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}]);

'use strict';

 angular.module('config', [])

.constant('ENV', {name:'production',apiEndpoint:'',pageSize:30,fileName:'markdownNote.json',Android:{filePath:'download/'},iOS:{filePath:'Library/'}})

;
// noteData.srv.js

'use strict';

angular.module('markdownNote')

.factory('noteData', ["tagsFactory", "markdown", "displayedNotes", "pageService", "searchNotesFilter", "searchNote", function noteDataFactory(tagsFactory, markdown,
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
        '- **sync** your notes to your Dropbox\n' +
        '- **store** your notes locally\n' +
        '- easily **tag** your notes\n' +
        '- **filter** them by any keyword.\n\n' +
        'You can also use **markdown language** to style' +
        ' and structure the body of your notes.\n\n' +
        'If you **tap on Markdown Note** in the header, you can **save your notes** ' +
        'to your file system or to your Dropbox and you can **backup your data** or sync with another device.\n\n' +
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
}]);



// tagService.srv.js

'use strict';

function tagsFactory () {
  return {
    tagsStringToArray: function (tagsString) {
      var tagArr = [];
      if (tagsString) {
        tagArr = tagsString.split(',').filter(function(tag) {
          return tag !== '';
        });
      }
      return tagArr;
    },

    removeWhiteSpaces: function (inputTags) {
      return inputTags.filter(function(tag) {
        return tag.trim();
      }).map(function (tag) {
        return tag.trim();
      });
    },

    filterSameTags: function (tags) {
      var set = [];
      tags.forEach(function(tag) {
        if (set.indexOf(tag) === -1) {
          set.push(tag);
        }
      });
      return set;
    },

    filterTagsString: function (tagsString) {
      var tagsArray = this.tagsStringToArray(tagsString);
      var trimmedTags = this.removeWhiteSpaces(tagsArray);
      return this.filterSameTags(trimmedTags);
    }
  };
}

angular.module('markdownNote').factory('tagsFactory', tagsFactory);

// noteList.drv.js

'use strict';

function noteList () {


  function noteListCtrl (noteData, $ionicModal, $scope, searchNote,
    $ionicScrollDelegate, externalLinkService, pageService, displayedNotes) {

    /*jshint validthis: true */
    var controller = this;
    controller.init = function () {
      noteData.initNotes();
      controller.noteData = noteData;
      controller.searchNote = searchNote;
      controller.externalLinkService = externalLinkService;
      controller.pageService = pageService;
      pageService.setNumberOfPages(noteData.notes);
      controller.displayedNotes = displayedNotes;

      $ionicModal.fromTemplateUrl('scripts/modal/edit-note-modal.html', {
        scope: $scope,
        focusFirstInput: false
      })
      .then(function (modal) {
        controller.editNoteModal = modal;
      });
    };

    controller.init();

    controller.toggleNoteState = function (note) {
      controller.noteData.opened[note.id] = !controller.noteData.opened[note.id];
      $ionicScrollDelegate.resize();
    };

    controller.showModal = function (modal) {
      modal.show();
    };

    controller.hideModal = function (modal) {
      modal.hide();
    };

    controller.cloneNote = function (note) {
      var cloneNote = {};
      for (var key in note) {
        cloneNote[key] = note[key];
      }
      return cloneNote;
    };

    controller.setNoteInput = function (note) {
      controller.noteInput = controller.cloneNote(note);
    };

    controller.editNote = function (note, event) {
      if (event) {
        event.stopPropagation();
      }
      controller.note = note;
      controller.setNoteInput(note);
      controller.showModal(controller.editNoteModal);
    };

    controller.updateNotes = function (note) {
      noteData.updateNotes(note, controller.noteInput);
      controller.noteInput.title = '';
      controller.noteInput.text = '';
      controller.noteInput.tags = '';
      controller.hideModal(controller.editNoteModal);
    };

    $scope.$on('$destroy', function() {
      controller.editNoteModal.remove();
    });
  }
  noteListCtrl.$inject = ["noteData", "$ionicModal", "$scope", "searchNote", "$ionicScrollDelegate", "externalLinkService", "pageService", "displayedNotes"];


  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/note-list.drv.html',
    controller: noteListCtrl,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };
}

angular.module('markdownNote').directive('noteList', noteList);



// appHeader.drv.js

'use strict';

function appHeaderDirective () {

  function appHeaderController ($scope,
    $ionicModal, noteData, searchNote, fileService, messageService, ENV) {
    /*jshint validthis: true */
    var controller = this;
    controller.fileService = fileService;
    controller.messageService = messageService;
    if (ENV.name === 'development') {
      controller.environment = {
        development: true
      };
    }

    $ionicModal.fromTemplateUrl('scripts/modal/new-note-modal.html', {
        scope: $scope,
        focusFirstInput: true
      })
    .then(function (modal) {
      controller.newNoteModal = modal;
    });

    $ionicModal.fromTemplateUrl('scripts/modal/extras-modal.html', {
        scope: $scope
      })
    .then(function (modal) {
      controller.extrasModal = modal;
    });

    controller.showModal = function (modal) {
      modal.show();
    };

    controller.hideModal = function (modal) {
      if (modal === controller.extrasModal) {
        controller.messageService.clearExtrasModalMessages();
      }
      else if (modal === controller.newNoteModal) {
        controller.title = '';
        controller.text = '';
        controller.tags = '';
      }
      modal.hide();
    };

    controller.noteData = noteData;

    controller.searchNote = searchNote;

    controller.addNewNote = function () {
      var newNote = {
        title: controller.title,
        text: controller.text,
        tags: controller.tags,
      };

      noteData.addNote(newNote);
      controller.hideModal(controller.newNoteModal);
    };

    /* just for testing purpose - add amount of welcomeNote to noteData */
    controller.addTestNotes = function (amount) {
      $scope.$applyAsync(function () {
        for (var i = 0; i < amount; i++) {
         controller.noteData.addNote(controller.noteData.welcomeNote);
        }
      });
    };


    $scope.$on('$destroy', function() {
      controller.newNoteModal.remove();
      controller.extrasModal.remove();
    });
  }
  appHeaderController.$inject = ["$scope", "$ionicModal", "noteData", "searchNote", "fileService", "messageService", "ENV"];

  return {
    restrict: 'A',
    templateUrl: 'scripts/directive/app-header.drv.html',
    controller: appHeaderController,
    controllerAs: 'ctrl',
    scope: {
    },
    bindToController: true
  };
}

angular.module('markdownNote').directive('appHeader', appHeaderDirective);

'use strict';

function editNoteModalBody () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/edit-note-modal-body.drv.html'
  };
}

angular.module('markdownNote').directive('editNoteModalBody', editNoteModalBody);

// searchInput.drv.js

'use strict';

function searchInputController (searchNote, noteData) {
  /*jshint validthis: true */
  var controller = this;
  controller.searchNote = searchNote;

  controller.applySearchNotes = function (searchTerm) {
    noteData.applySearchNotes(searchTerm);
  };
}
searchInputController.$inject = ["searchNote", "noteData"];

function link (scope) {
  scope.$watch('ctrl.searchNote.searchTerm.$', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      scope.ctrl.applySearchNotes(newValue);
    }
  });
}

function searchInput () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directive/search-input.drv.html',
    scope: {},
    controller: searchInputController,
    controllerAs: 'ctrl',
    bindToController: true,
    link: link
  };
}

angular.module('markdownNote').directive('searchInput', searchInput);

// searchNote.srv.js

'use strict';

function searchNote($ionicScrollDelegate) {
  return {
    searchTerm: '',
    opened: false,

    toggleSearchInput: function () {
      this.opened = !this.opened;
      $ionicScrollDelegate.scrollTop();
    },
  };
}
searchNote.$inject = ["$ionicScrollDelegate"];

angular.module('markdownNote').factory('searchNote', searchNote);

// markdown.srv.js
// dependency: install pagedown
// https://code.google.com/p/pagedown/wiki/PageDown
// install pagedown-extra
// https://github.com/jmcmanus/pagedown-extra

'use strict';

function markdown () {
  // var converter = new Markdown.Converter();
  // Markdown.Extra.init(converter);
  // return {
  //   convertMarkdownToHTML: function (markdownText) {
  //     return converter.makeHtml(markdownText);
  //   }
  // };


  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });
  return {
    convertMarkdownToHTML: function (markdownText) {
      return marked(markdownText);
    }
  };
}

angular.module('markdownNote').factory('markdown', markdown);

// saveFile.drv.js

'use strict';

function saveFile (fileService, noteData, messageService) {

  function saveFileController ($scope) {

    // only testing purpose to trigger deviceready event, must be delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //$(document).trigger('deviceready');

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.clearExtrasModalMessages();
        controller.messageService.messages.saveLocalFileMessage = message;
      });
    };

    controller.fail = function (error) {
      controller.setMessage('ERROR: ' + error.code);
      console.log('ERROR: ' + error.code);
    };

    controller.gotFileWriter = function (writer) {
      writer.write(noteData.loadStringNotesFromStorage());

      writer.onwrite = function(evt) {
        controller.setMessage('Write succeeded');
        console.log('write succeeded: ' + evt.toString());
      };
    };

    controller.gotFileEntry = function (fileEntry) {
      fileEntry.createWriter(controller.gotFileWriter, controller.fail);
    };

    controller.onResolveSuccess = function (directoryEntry) {
      directoryEntry.getFile(fileService.filePath + fileService.fileName,
        {create: true, exclusive: false}, controller.gotFileEntry, controller.fail);
    };

    controller.onDeviceReady = function (rootDirectory) {
      window.resolveLocalFileSystemURL(rootDirectory, controller.onResolveSuccess, controller.fail);
    };

    controller.saveText = function () {
      if (fileService.deviceReady) {
        // console.log('in saveText, calling onDeviceReady');
        // console.log('deviceready: ' + fileService.deviceReady);
        // console.log('platform: ' + fileService.platform);
        // console.log('root: ' + fileService.rootDirectory);
        // console.log('filePath: ' + fileService.filePath);
        controller.onDeviceReady(fileService.rootDirectory);
      }
    };
  }
  saveFileController.$inject = ["$scope"];

  return {
    restrict: 'E',
    controller: saveFileController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/save-file.drv.html'
  };
}
saveFile.$inject = ["fileService", "noteData", "messageService"];

angular.module('markdownNote').directive('saveFile', saveFile);

// loadFile.drv.js

'use strict';

function loadFile (fileService, noteData, messageService) {

  function loadFileController ($scope) {

    // only for testing purpose to trigger deviceready event, must be delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //$(document).trigger('deviceready');

   /*jshint validthis: true */
    var controller = this;
    controller.fileService = fileService;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.clearExtrasModalMessages();
        controller.messageService.messages.loadLocalFileMessage = message;
      });
    };

    controller.fail = function (error) {
      controller.setMessage('ERROR: ' + error.code);
    };

    controller.readAsText = function (file) {
      var reader = new FileReader();

      reader.onloadend = function (evt) {
        controller.setMessage('Your notes has been updated from markdownNote.json file');
        noteData.backupNotesFromBackupData(evt.target.result);
      };

      reader.readAsText(file);
    };

    controller.gotFileEntry = function (fileEntry) {
      fileEntry.file(controller.readAsText, controller.fail);
    };

    controller.onResolveSuccess = function (directoryEntry) {
      directoryEntry.getFile(fileService.filePath + fileService.fileName,
        null, controller.gotFileEntry, controller.fail);
    };

    controller.onDeviceReady = function (rootDirectory) {
      window.resolveLocalFileSystemURL(rootDirectory, controller.onResolveSuccess, controller.fail);
    };

    controller.confirmBackuping = function () {
      return confirm('You are about to update your notes from markdownNote.json file. ' +
        'It can result in losing some data if data of your notes are newer ' +
        'than the data in the backup file. Are you sure you want to backup data?');
    };

    controller.loadText = function () {
      if (fileService.deviceReady) {
        if (controller.confirmBackuping()) {
          controller.onDeviceReady(fileService.rootDirectory);
        }
      }
    };
  }
  loadFileController.$inject = ["$scope"];

  return {
    restrict: 'E',
    controller: loadFileController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/load-file.drv.html'
  };
}
loadFile.$inject = ["fileService", "noteData", "messageService"];

angular.module('markdownNote').directive('loadFile', loadFile);

// fileService.srv.js

'use strict';

function fileService (ENV) {
  /*jshint -W004 */  // to skip 'fileService is already defined' jshint message
  var fileService = {
    deviceReady: false,
  };

  fileService.setDeviceReady = function () {
    fileService.deviceReady = true;
  };

  fileService.setSupportedPlatforms = function () {
    fileService.supportedPlatforms = {
      'Android' : {
        rootDirectory: cordova.file.externalRootDirectory,
        fileName: ENV.fileName,
        filePath: ENV.Android.filePath
      },
      'iOS': {
        rootDirectory: cordova.file.applicationStorageDirectory,
        fileName: ENV.fileName,
        filePath: ENV.iOS.filePath
      }
    };
  };

  fileService.setPlatform = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.platform = device.platform;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setRootDirectory = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.rootDirectory = platform.rootDirectory;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setFilePath = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.filePath = platform.filePath;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setFileName = function () {
    var platform = fileService.supportedPlatforms[device.platform];
    if (platform) {
      fileService.fileName = platform.fileName;
      return;
    }
    throw new Error(device.platform + ' platform is not supported');
  };

  fileService.setupFileService = function () {
    fileService.setDeviceReady();
    fileService.setSupportedPlatforms();
    fileService.setPlatform();
    fileService.setRootDirectory();
    fileService.setFilePath();
    fileService.setFileName();
    // console.log('deviceready: ' + fileService.deviceReady);
    // console.log('platform: ' + fileService.platform);
    // console.log('root: ' + fileService.rootDirectory);
    // console.log('filePath: ' + fileService.filePath);
    // console.log('fileName: ' + fileService.fileName);
  };

  $(document).on('deviceready', fileService.setupFileService);
  return fileService;
}
fileService.$inject = ["ENV"];

angular.module('markdownNote').factory('fileService', fileService);

// about.drv.js

'use strict';

function aboutDirective (messageService, externalLinkService) {

  function aboutController () {
    /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;
    controller.externalLinkService = externalLinkService;

    controller.toggleAboutMessage = function () {
      if (!controller.messageService.messages.showAboutMessage) {
        controller.messageService.clearExtrasModalMessages();
      }
      controller.messageService.messages.showAboutMessage = !controller.messageService.messages.showAboutMessage;
    };
  }

  return {
    restrict: 'E',
    controller: aboutController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/about.drv.html'
  };
}
aboutDirective.$inject = ["messageService", "externalLinkService"];

angular.module('markdownNote').directive('about', aboutDirective);

// messageService.srv.js

'use strict';

function messageService ($rootScope) {
  return {
    messages: {
      showAboutMessage: false,
      loadLocalFileMessage: false,
      saveLocalFileMessage: false,
      dropboxWriteMessage: false,
      dropboxReadMessage: false,

    },

    clearExtrasModalMessages: function () {
      this.messages.showAboutMessage = false;
      this.messages.loadLocalFileMessage = false;
      this.messages.saveLocalFileMessage = false;
      this.messages.dropboxWriteMessage = false;
      this.messages.dropboxReadMessage = false;
    },

    applyMessage: function (options) {
      var self = this;
      $rootScope.$apply(function () {
        self.messages[options.messageType] = options.message;
      });
    },

    getMessage: function (options) {
      return this.messages[options.messageType];
    },

    setMessage: function (options) {
      this.messages[options.messageType] = options.message;
    }
  };
}
messageService.$inject = ["$rootScope"];

angular.module('markdownNote').factory('messageService', messageService);

// externalLinkService.srv.js

'use strict';

function externalLinkService () {
  return {
   launchExternalLink: function (event) {
      var linkElementString = event.target.toString();
      if (linkElementString) {
        window.open(linkElementString, '_system', 'location=yes');
      }
    },

    handleLinkClicked: function (event) {
      if (event.target.nodeName === 'A') {  // target is a link
        event.preventDefault();
        event.stopPropagation();
        this.launchExternalLink(event);
      }
    }
  };
}

angular.module('markdownNote').factory('externalLinkService', externalLinkService);

// measureTime.drv.js

'use strict';

function measureTime ($timeout, $log) {
  var start;
  return function(scope) {
    if (scope.$first) {
      start = new Date();
    }
    if (scope.$last) {
       $timeout(function () {
          var end = new Date();
          $log.debug('## DOM rendering list took: ' + (end - start) + ' ms');
       });
     }
  };
}
measureTime.$inject = ["$timeout", "$log"];

angular.module('markdownNote').directive('measureTime', measureTime);

// pageService.srv.js

'use strict';

function pageService (ENV, $ionicScrollDelegate) {
  /*jshint -W004 */  // to skip 'pageService is already defined' jshint message
  var pageService = {
    currentPage: 1,
    pageSize: ENV.pageSize,
  };
  pageService.setNumberOfPages = function (displayedItems) {
    // console.log(noteData.notes.length, pageService.pageSize);
    pageService.numberOfPages = Math.ceil(displayedItems.length / pageService.pageSize);
  };

  pageService.setCurrentPage = function (offset) {
    if (offset > 0) {
      if (this.currentPage < this.numberOfPages) {
        this.currentPage = this.currentPage + offset;
      }
    }
    else {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage + offset;
      }
    }
    // console.log('current page: ' + this.currentPage);
    // console.log('number of pages: ' + this.numberOfPages);
    // console.log('displayedNotes.notes.length: ' + displayedNotes.notes.length);
    $ionicScrollDelegate.scrollBottom();
  };

  pageService.updatePages = function (displayedItems) {
    this.setNumberOfPages(displayedItems);
    this.currentPage = 1;
  };

  pageService.backToStart = function () {
    this.currentPage = 1;
    $ionicScrollDelegate.scrollBottom();
  };

  pageService.forwardToEnd = function () {
    this.currentPage = this.numberOfPages;
    $ionicScrollDelegate.scrollBottom();
  };

  pageService.onTheFirstPage = function () {
    return this.currentPage === 1;
  };

  pageService.onTheLastPage = function () {
    return this.currentPage === this.numberOfPages;
  };

  return pageService;
}
pageService.$inject = ["ENV", "$ionicScrollDelegate"];

angular.module('markdownNote').factory('pageService', pageService);

// pagination.drv.js

'use strict';

function pagination () {

  function paginationController ($scope, pageService) {


   /*jshint validthis: true */
    var controller = this;
    controller.pageService = pageService;
  }
  paginationController.$inject = ["$scope", "pageService"];

  return {
    restrict: 'E',
    controller: paginationController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/pagination.drv.html'
  };
}

angular.module('markdownNote').directive('pagination', pagination);

// startFromFilter.srv.js

'use strict';

function startFromFilter () {
  return function(input, start) {
    return input.slice(start);
  };
}

angular.module('markdownNote').filter('startFrom', startFromFilter);

// displayedNotes.srv.js

'use strict';

function displayedNotes () {
  return {
    notes: [],
    setDisplayedNotes: function (referencedNotes) {
      if (!angular.isArray(referencedNotes)) {
        throw new Error('Ivalid argument to setDisplayedNotes');
      }
      this.notes = referencedNotes.slice(); // clone array
    }
  };
}

angular.module('markdownNote').factory('displayedNotes', displayedNotes);

// searchNotesFilter.srv.js

'use strict';

function searchNotesFilter ($filter) {
  return function(input, searchTerm) {
    return $filter('filter')(input, searchTerm);
  };
}
searchNotesFilter.$inject = ["$filter"];

angular.module('markdownNote').filter('searchNotes', searchNotesFilter);

// addSearchNote.drv.js

'use strict';

function addSearchNoteController (searchNote) {
  /*jshint validthis: true */
  this.searchNote = searchNote;
}
addSearchNoteController.$inject = ["searchNote"];

function addSearchNote () {
  return {
    restrict: 'A',
    controller: addSearchNoteController,
    controllerAs: 'addSearchNoteCtrl'
  };
}

angular.module('markdownNote').directive('addSearchNote', addSearchNote);

// saveToDropbox.drv.js

'use strict';

function saveToDropbox (dropboxService, messageService, noteData, ENV) {

  function saveToDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.clearExtrasModalMessages();
        controller.messageService.messages.dropboxWriteMessage = message;
      });
    };

    controller.writeDataToDropbox = function (client) {
      var localData = noteData.loadStringNotesFromStorage();
      return dropboxService.writeFile(ENV.fileName, localData);
    };

    controller.save = function () {
      dropboxService.authentication()
      .then(function () {
        return controller.writeDataToDropbox();
      })
      .then(function (message) {
        controller.setMessage('Writing data to Dropbox has succeeded.');
      })
      .catch(function (errorMessage) {
        controller.setMessage(errorMessage);
      });
    };
  }
  saveToDropboxController.$inject = ["$scope"];

  return {
    restrict: 'E',
    controller: saveToDropboxController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/save-to-dropbox.drv.html'
  };
}
saveToDropbox.$inject = ["dropboxService", "messageService", "noteData", "ENV"];

angular.module('markdownNote').directive('saveToDropbox', saveToDropbox);

// loadFromDropbox.drv.js

'use strict';

function loadFromDropbox (dropboxService, messageService, ENV, noteData) {

  function loadFromDropboxController ($scope) {

   /*jshint validthis: true */
    var controller = this;
    controller.messageService = messageService;

    controller.setMessage = function (message) {
      $scope.$apply(function () {
        controller.messageService.clearExtrasModalMessages();
        controller.messageService.messages.dropboxReadMessage = message;
      });
    };

    controller.confirmLoadFromDropbox = function () {
      console.log('in confirmation');
      return confirm('You are about to update your notes from your Dropbox. ' +
        'It can result in losing some data if local data are newer ' +
        'than the data in the backup file. Are you sure you want to load data?');
    };

    controller.readDataFromDropbox = function () {
      return dropboxService.readFile(ENV.fileName);
    };

    controller.updateLocalData = function (data) {
      noteData.backupNotesFromBackupData(data);
    };

    controller.load = function () {
      if (controller.confirmLoadFromDropbox()) {
        dropboxService.authentication()
        .then(function () {
          return controller.readDataFromDropbox();
        })
        .then(function (data) {
          controller.updateLocalData(data);
          controller.setMessage('Fetching data from Dropbox has succeeded.');
        })
        .catch(function (errorMessage) {
          controller.setMessage(errorMessage);
        });
      }
    };
  }
  loadFromDropboxController.$inject = ["$scope"];

  return {
    restrict: 'E',
    controller: loadFromDropboxController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/load-from-dropbox.drv.html'
  };
}
loadFromDropbox.$inject = ["dropboxService", "messageService", "ENV", "noteData"];

angular.module('markdownNote').directive('loadFromDropbox', loadFromDropbox);

// dropboxService.srv.js

'use strict';

function dropboxService (messageService) {
  /*jshint -W004 */  // to skip 'dropboxService is already defined' jshint message
  var dropboxService = {
    clientInitOptions: {key: 'pbqyznysf6jffyl'}
  };

  dropboxService.client = new Dropbox.Client(dropboxService.clientInitOptions);

  dropboxService.getXhrDownloadListener = function () {
    return function(dbXhr) {
      dbXhr.xhr.addEventListener('progress', function(event) {
        // event.loaded bytes received, event.total bytes must be received
        dropboxService.reportProgress('read', event.loaded, event.total);
      });
      return true;  // otherwise, the XMLHttpRequest is canceled
    };
  };

  dropboxService.getXhrUploadListener = function () {
    return function (dbXhr) {
      dbXhr.xhr.upload.addEventListener('progress', function(event) {
        // event.loaded bytes received, event.total bytes must be received
        dropboxService.reportProgress('write', event.loaded, event.total);
      });
      return true;  // otherwise, the XMLHttpRequest is canceled
    };
  };

  dropboxService.reportProgress = function (action) {
    var message;

    function applyReportMessage (messageType) {
      message = messageService.getMessage({messageType: messageType});
      messageService.applyMessage({
        messageType: messageType,
        message: message + '.'
      });
    }

    switch (action) {
      case 'read':
        applyReportMessage('dropboxReadMessage');
        break;
      case 'write':
        applyReportMessage('dropboxWriteMessage');
        break;
      default:
        throw new Error('wrong action type for init progress indicator');
    }
  };

  dropboxService.initProgressIndicator = function (action) {
    messageService.clearExtrasModalMessages();
    switch (action) {
      case 'read':
        messageService.setMessage({
          messageType: 'dropboxReadMessage',
          message: 'Reading data from Dropbox'
        });
        break;
      case 'write':
        messageService.setMessage({
          messageType: 'dropboxWriteMessage',
          message: 'Writing data to Dropbox'
        });
        break;
      default:
        throw new Error('wrong action type for init progress indicator');
    }

  };

  dropboxService.authentication = function () {
    var message;
    return new Promise(function (resolve, reject) {
      if (!dropboxService.client.isAuthenticated()) {
        dropboxService.client.authenticate({interactive: true}, function (error, client) {
          if (error) {
            message = dropboxService.errorHandlers[error.status].errorHandler();
            reject(message);
          }
          else {
            dropboxService.client = client;
            resolve();
          }
        });
      }
      else {
        //console.log('already authenticated');
        resolve();
      }
    });
  };

  dropboxService.writeFile = function (fileName, data) {
    var message;
    dropboxService.initProgressIndicator('write');
    var xhrListener = dropboxService.getXhrUploadListener();

    return new Promise(function (resolve, reject) {
      dropboxService.client.onXhr.addListener(xhrListener);
      dropboxService.client.writeFile(fileName, data, function (error, stat) {
        if (error) {
          message = dropboxService.errorHandlers[error.status].errorHandler();
          reject(message);
        }
        else {
          resolve(stat);
        }
        dropboxService.client.onXhr.removeListener(xhrListener);
      });
    });
  };

  dropboxService.readFile = function (fileName) {
    var message;
    var xhrListener = dropboxService.getXhrDownloadListener();
    dropboxService.initProgressIndicator('read');

    return new Promise(function (resolve, reject) {
      dropboxService.client.onXhr.addListener(xhrListener);
      dropboxService.client.readFile(fileName, function (error, data) {
        if (error) {
          message = dropboxService.errorHandlers[error.status].errorHandler();
          reject(message);
        }
        else {
          resolve(data);
        }
        dropboxService.client.onXhr.removeListener(xhrListener);
      });
    });
  };

  dropboxService.errorHandlers = {};

  dropboxService.errorHandlers[Dropbox.ApiError.INVALID_TOKEN] = {
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
    tokenNumber: Dropbox.ApiError.INVALID_TOKEN,
    errorHandler: function () {
      console.log('INVALID_TOKEN');
      var message = 'The authentication has been expired. Please try to authenticate yourself again.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.NOT_FOUND] = {
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
    tokenNumber: Dropbox.ApiError.NOT_FOUND,
    errorHandler: function () {
      console.log('NOT_FOUND');
      var message = 'You can only read data from your Dropbox if you performed a saving before.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.OVER_QUOTA] = {
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
    tokenNumber: Dropbox.ApiError.OVER_QUOTA,
    errorHandler: function () {
      console.log('OVER_QUOTA');
      var message = 'Your Dropbox quota is over. Please try to free some space and try again.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.RATE_LIMITED] = {
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
    tokenNumber: Dropbox.ApiError.RATE_LIMITED,
    errorHandler: function () {
      console.log('RATE_LIMITED');
      var message = 'Too many API requests, please try again later.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.NETWORK_ERROR] = {
    // An error occurred at the XMLHttpRequest layer.
    // Most likely, the user's network connection is down.
    // API calls will not succeed until the user gets back online.
    tokenNumber: Dropbox.ApiError.NETWORK_ERROR,
    errorHandler: function () {
      console.log('NETWORK_ERROR');
      var message = 'Your network connection may be down. Please try to reconnect.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.INVALID_PARAM] = {
    tokenNumber: Dropbox.ApiError.INVALID_PARAM,
    errorHandler: function () {
      console.log('INVALID_PARAM');
      var message = 'Invalid parameter. It\'s bad news for you and the developer';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.OAUTH_ERROR] = {
    tokenNumber: Dropbox.ApiError.OAUTH_ERROR,
    errorHandler: function () {
      console.log('OAUTH_ERROR');
      var message = 'This indicates a bug in dropbox.js and should never occur under normal circumstances.' +
      ' So this is not normal circumstances.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.INVALID_METHOD] = {
    tokenNumber: Dropbox.ApiError.INVALID_METHOD,
    errorHandler: function () {
      console.log('INVALID_METHOD');
      var message = 'This indicates a bug in dropbox.js and should never occur under normal circumstances.' +
      ' So this is not normal circumstances.';
      return message;
    }
  };

  return dropboxService;
}
dropboxService.$inject = ["messageService"];

angular.module('markdownNote').factory('dropboxService', dropboxService);
