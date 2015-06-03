  // noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;
  var timeout;
  var searchNote;
  var displayedNotes;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      timeout = $injector.get('$timeout');
      noteData = $injector.get('noteData');
      searchNote = $injector.get('searchNote');
      displayedNotes = $injector.get('displayedNotes');
    });

    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  });

  beforeEach(function () { // open the first note
    element.find('ion-list .note-item').eq(0).click();
    scope.$digest();
  });

  afterEach(function () { // close the first note
    element.find('ion-list .note-item').eq(0).click();
    scope.$digest();
  });

  describe('Create a list of notes', function () {

    it('contains the appropriate content', function () {
      expect(element.html()).to.contain('ng-repeat="note in ctrl.displayedNotes.notes');
    });

    it('should inject the noteData service', function () {
      expect(isolated.ctrl.noteData.notes).to.deep.equal(noteData.notes);
    });

    it('should contain the title of the note', function () {
      expect(element.html()).to.contain(noteData.notes[0].title);
    });

    it('should be an ion-list', function () {
      var list =  element.find('ion-list');
      expect(list.length).to.equal(1);
      var items = element.find('ion-list .note-item');
      expect(items.length).to.equal(noteData.notes.length);
    });

    it('should have the proper note css classes', function () {
      var titleRow = element.find('.note-item div');
      expect(titleRow).to.have.class('row');
      var noteTitleContainer = titleRow.eq(0).children('div').eq(0);
      expect(noteTitleContainer).to.have.class('note-title-container col col-80');
      expect(noteTitleContainer).to.have.css('display').match(/-webkit-box|-ms-flexbox-webkit-flex|flex/);
      var noteTitle = noteTitleContainer.children('h2');
      expect(noteTitle).to.have.class('note-title');
      expect(noteTitle).to.have.css('color','rgb(255, 0, 0)');
      expect(noteTitle.children('span')).to.have.class('wordwrap');
    });
  });

  describe('Show details of notes', function () {

    describe('Add more mock data to noteData service', function () {

      it('should have the correct properties', function () {
        expect(noteData.notes[0]).to.have.property('text');
        expect(noteData.notes[0].text).to.be.a('string');
        expect(noteData.notes[0]).to.have.property('tags');
        expect(noteData.notes[0].tags).to.be.an('array');
      });
    });

    describe('Populate data to noteList directive', function () {

      it('should contain all property of notes of noteData service', function () {
        var note = element.find('ion-list .note-item').eq(0);
        expect(note.html()).to.contain(noteData.notes[0].title);
        expect(note.html()).to.contain(noteData.notes[0].text);
        expect(note.html()).to.contain('ng-repeat="tag in note.tags"');
        if (noteData.notes[0].tags.length > 0) {
          expect(note).to.contain(noteData.notes[0].tags[0]);
        }
      });
    });

    describe('Add tap handler to noteList directive', function () {

      describe('Tap handler to toggle the state of a note', function () {

        it('should toggle state', function () {

          var actualNote = noteData.notes[0];
          var id = actualNote.id;
          var status = isolated.ctrl.noteData.opened[id] = false;

          isolated.ctrl.toggleNoteState(actualNote);
          expect(isolated.ctrl.noteData.opened[id]).to.equal(!status);
          isolated.ctrl.toggleNoteState(actualNote);
          expect(isolated.ctrl.noteData.opened[id]).to.equal(status);
        });

        it('should toggle state when note element is clicked', function () {
           var index = 0;
           var note = element.find('ion-list .note-item').eq(index);
           var actualNote = noteData.notes[index];
           isolated.ctrl.noteData.opened[actualNote.id] = false;
           note.click();
           expect(isolated.ctrl.noteData.opened[actualNote.id]).to.equal(true);
           note.click();
           expect(isolated.ctrl.noteData.opened[actualNote.id]).to.equal(false);
        });
      });

      describe('Connect tap handler with ng-if', function () {
        it('should add and remove text and tag elements when when note element is clicked', function () {
          var note = element.find('ion-list .note-item').eq(0);
          note.click(); // close note
          scope.$digest();
          var textAndTags = note.find('#note-text-and-tags');
          expect(textAndTags).to.not.exist;
          note.click(); // open note
          scope.$digest();
          textAndTags = note.find('#note-text-and-tags');
          expect(textAndTags).to.exist;
        });
      });
    });

    describe('Add styling to noteList as regards text and tags', function () {
      var textAndTags;
      var text;
      var tagsRow;

      beforeEach(function () {
        textAndTags = element.find('#note-text-and-tags').eq(0);
      });

      describe('Place text to a paragraph', function () {

        it('text should be in a p element', function () {
          text = textAndTags.find('.text-title');
          expect(text.html()).to.contain(noteData.notes[0].text);
        });
      });

      describe('Show tags separately', function () {

        beforeEach(function () {
          tagsRow = textAndTags.find('#tags-row');
        });

        it('should be placed in a row', function () {
          expect(tagsRow).to.have.class('row');
        });

        it('should have a tag-container, a col and a col-80 class', function () {
          expect(tagsRow.find('p#tag-container')).to.have.class('col col-80');
        });

        it('should contain #tag-title with given css', function () {
          var tag = tagsRow.find('span.tag-title');
          expect(tag.html()).to.contain(isolated.ctrl.noteData.notes[0].tags[0])
          expect(tag).to.have.css('background-color', 'rgb(153, 153, 153)');
          expect(tag).to.have.css('color', 'rgb(255, 255, 255)');
        });
      });

      describe('Add decorator icon to tags', function () {

        beforeEach(function () {
          tagsRow = textAndTags.find('#tags-row');
        });

        it('should have tags icon', function () {
          expect(tagsRow.find('p i')).to.have.class('icon ion-pricetag');
        });
      });
    });
  });

  describe('Create a button for deleting note', function () {

    it('should have class button button-icon icon icon-right ion-ios7-close-outline note-close', function () {
     var button = element.find('div.note-close-container a');
     expect(button).to.have.class('button button-icon icon icon-right ion-ios-close-outline note-close');
    });

    describe('Connect `deleteNote` method to delete button with ng-click', function () {
      var stub;
      var tempNotes;
      var tempStorage;

      beforeEach(function () {
        stub = sinon.stub(window, 'confirm');
        tempStorage = window.localStorage.simpleNote;
        tempNotes = noteData.notes.slice();
        noteData.notes = [];
      });

      afterEach(function () {
        stub.restore();
        noteData.notes = tempNotes.slice();
        window.localStorage.simpleNote = tempStorage;
      });

      it('should delete note', function () {
        var testNote = {
          title: 'Testnote',
          text: 'Test text',
          tags: ['test tag']
        };
        var firstNote;

        isolated.ctrl.noteData.addNote(testNote);
        scope.$digest();
        firstNote = element.find('ion-list .note-item').eq(0);
        expect(firstNote.html()).to.contain('Testnote');

        var button = firstNote.find('div.note-close-container a');
        stub.returns(true); // Confirm deleting the note
        button.click();
        scope.$digest();
        firstNote = element.find('ion-list .note-item').eq(0);
        expect(firstNote.html()).to.not.contain('Testnote');
      });
    });
  });

  describe('Create a button for editing note', function () {

    it('should have class button button-icon icon icon-right ion-edit note-edit', function () {
     var button = element.find('div.note-edit-container a');
     expect(button).to.have.class('button button-icon icon icon-right ion-edit note-edit');
    });
  });

  describe('Create editNote modal', function () {
    var editNoteModal;
    var modalElement;

    beforeEach(function () {
      editNoteModal = isolated.ctrl.editNoteModal;
      modalElement = editNoteModal.$el;
    });

    describe('Add editNoteModal', function () {
      it('should be an $ionicModal', function () {
        editNoteModal.show();
        expect(editNoteModal.isShown()).to.equal(true);
        editNoteModal.hide();
        expect(editNoteModal.isShown()).to.equal(false);
        editNoteModal.remove();
      });
    });

    describe('Show and hide editNoteModal', function () {
      it('should sow and hide modal', function () {
        isolated.ctrl.showModal(editNoteModal);
        expect(editNoteModal.isShown()).to.equal(true);
        isolated.ctrl.hideModal(editNoteModal);
        expect(editNoteModal.isShown()).to.equal(false);
        editNoteModal.remove();
      });
    });

     describe('Test modal Header', function () {

       it('should have a modal class', function () {
         expect(modalElement.find('div')).to.have.class('modal');
       });

      it('should contain ion-header-bar', function () {
        var headerBar = modalElement.find('ion-header-bar');
        expect(headerBar).to.have.class('secondary');
        expect(headerBar.children('h1')).to.have.class('title');
        expect(headerBar.children('h1').text())
          .to.contain('Edit Your Note');
        expect(headerBar.children('button'))
          .to.have.class('button button-clear button-positive');
      });
     });

    describe('Test modal body', function () {
      it('should have a modal-body element', function () {
        expect(modalElement.find('edit-note-modal-body').html()).to.contain('<!-- edit-note-modal-body.drv.html -->');
      });
    });

    describe('Test modal footer', function () {
      it('should have a padding area', function () {
        var button = modalElement.find('ion-content form div.padding button');
        expect(button).to.have.attr('type', 'submit');
        expect(button.text()).to.contain('Update Note');
      });
    });

    describe('Add tap handler to edit button', function () {
      it('should show the modal', function (done) {
          element.find('#edit-button').click();
          setTimeout(function () {
            expect(editNoteModal.isShown()).to.equal(true);
            editNoteModal.remove();
            done();
        },0);
      });
    });

    describe('Add tap handler to Cancel button', function () {
      it('should hide the modal', function (done) {
        editNoteModal.show();
        timeout.flush();
        modalElement.find('#edit-note-modal-cancel-button').click();
        setTimeout(function () {
          expect(editNoteModal.isShown()).to.equal(false);
          editNoteModal.remove();
          done();
        },0);
      });
    });

    describe('Connect modal to note data', function () {
      var testNote = {
        title: 'Testnote',
        text: 'Test text',
        tags: ['test tag'],
        id: 1,
        opened: false
      };

      it('should create a copy of the edited note', function () {
        var cloneNote = isolated.ctrl.cloneNote(testNote);
        expect(cloneNote).to.not.equal(testNote);
        expect(cloneNote).to.deep.equal(testNote);
      });

      it('should clone the edited note', function () {
        sinon.spy(isolated.ctrl, 'cloneNote');
        element.find('#edit-button').click();
        expect(isolated.ctrl.cloneNote.calledOnce).to.equal(true);
        isolated.ctrl.cloneNote.restore();
      });

      it('should bind cloned note data to modal', function () {
        isolated.ctrl.setNoteInput(testNote);
        scope.$digest();
        expect(modalElement.find('input.modal-title').val()).to.equal('Testnote');
      });
    });

    describe('Create updateNotes method', function () {
      var testNote;
      var noteInput;
      var tempNotes;
      var tempStorage;

      beforeEach(function () {
        tempNotes = noteData.notes.slice();
        noteData.notes = [];
        tempStorage = window.localStorage.simpleNote;
        window.localStorage.simpleNote = angular.toJson([]);

        testNote = {
          title: 'Testnote',
          text: 'Test text',
          tags: ['test tag'],
        };

        noteInput = {
          title: 'Edited Note',
          text: 'Edited Text',
          tags: 'Edited, Tags'
        };

        isolated.ctrl.noteInput = noteInput;

        noteData.addNote(testNote);
        isolated.ctrl.note = noteData.notes[0];

      });

      afterEach(function () {
        noteData.notes = tempNotes.slice();
        window.localStorage.simpleNote = tempStorage;
        isolated.ctrl.noteInput = '';
      });

      it('should close the modal', function (done) {
        editNoteModal.show();
        timeout.flush();
        testNote = noteData.notes[0];
        isolated.ctrl.updateNotes(testNote);
        setTimeout(function () {
          expect(editNoteModal.isShown()).to.equal(false);
          editNoteModal.remove();
          done();
        },0);
      });

      it('should call noteData.updateNotes method', function () {
        sinon.spy(noteData, 'updateNotes');
        testNote = noteData.notes[0];
        isolated.ctrl.updateNotes(testNote);
        expect(noteData.updateNotes.called).to.equal(true);
        noteData.updateNotes.restore();
      });

      it('should call noteData.updateNotes when update button is clicked', function () {
        sinon.spy(isolated.ctrl, 'updateNotes');
        modalElement.find('#edit-note-modal-update-button').click();

        expect(isolated.ctrl.updateNotes.called).to.equal(true);
        isolated.ctrl.updateNotes.restore();
      });
    });
  });

  describe('Populate note.htmlText property via ngBindHtml', function () {

    var tempStorage;
    var tempNotes;

    beforeEach(function () {
      tempStorage = window.localStorage.simpleNote;
      tempNotes = noteData.notes.slice();
      noteData.notes = [
        {
          title: 'testTitle',
          text: '##Text',
          htmlText: '<h2>Text</h2>',
          tags: ['testTag'],
          opened: false,
          id: 0
        }
      ];
      noteData.updateDisplayedNotes();
      scope.$digest();
      noteData.saveNotesToLocalStorage();
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });

    it('should insert note.htmlText into a div element', function () {
      var textDiv = element.find('div.text-title-container div');
      expect(textDiv.html()).to.contain('<h2>Text</h2>');
    });
  });

  describe('Handle link element in the text of the note', function () {

    var tempNotes;
    var tempStorage;

    beforeEach(function () {
      tempNotes = noteData.notes.slice();

      noteData.notes = [
        {
          title: 'testTitle',
          text: '[testLink](http://google.com/)',
          htmlText: '<a href="http://google.com/">testLink</a>',
          tags: ['testTag'],
          opened: false,
          id: 0
        }
      ];
      noteData.updateDisplayedNotes();
      scope.$digest();

      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson([]);
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });

    it('should call launchExternalLink when click on a link', function () {
      sinon.spy(isolated.ctrl.externalLinkService, 'launchExternalLink');
      var noteLink = element.find('div.text-title a');
      noteLink.click();
      expect(isolated.ctrl.externalLinkService.launchExternalLink.calledOnce).to.equal(true);
      isolated.ctrl.externalLinkService.launchExternalLink.restore();
    });

    it('should call window.open with the proper arguments', function () {
      sinon.spy(window, 'open');
      var noteLink = element.find('div.text-title a');
      noteLink.click();
      expect(window.open.calledWith('http://google.com/', '_system', 'location=yes'))
        .to.equal(true);
      window.open.restore();
    });
  });

  describe('Pagination', function () {
    it('should contain pagination directive', function () {
      expect(element.find('div.pagination button').eq(0))
        .to.have.class('backToStartButton');
      expect(element.find('div.pagination button').eq(1))
        .to.have.class('backwardButton');
      expect(element.find('div.pagination button').eq(2))
        .to.have.class('forwardButton');
      expect(element.find('div.pagination button').eq(3))
        .to.have.class('forwardToEndButton');
    });
  });

  describe('Test displayedNotes service', function () {
    var tempNotes;
    var tempStorage;
    var testNotes = [1,2,3,4,5];

    beforeEach(function () {
      tempNotes = noteData.notes.slice();
      noteData.notes = testNotes;
      tempStorage = window.localStorage.simpleNote;
      window.localStorage.simpleNote = angular.toJson(testNotes);
    });

    afterEach(function () {
      noteData.notes = tempNotes.slice();
      window.localStorage.simpleNote = tempStorage;
    });

    it('displayedNotes.notes should deeply equal to noteData.notes after initialization', function () {
      isolated.ctrl.init();
      expect(displayedNotes.notes).to.deep.equal(testNotes);
    });
  });
});
