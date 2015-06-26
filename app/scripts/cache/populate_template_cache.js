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
    '        <!-- add 100 test notes - only for testing purpose\n' +
    '        <button id="testMuchNotes" class="item button button-full button-dark" ng-click="ctrl.addTestNotes(100)">Add 100 test notes</button>\n' +
    '        -->\n' +
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
