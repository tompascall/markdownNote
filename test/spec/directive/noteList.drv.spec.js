// noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;
  var timeout;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
    timeout = _$timeout_;
  }));

  beforeEach(function () {
    inject(function ($injector) {
      noteData = $injector.get('noteData');
    });
  });

  describe('Create a list of notes', function () {

    it('contains the appropriate content', function () {
      expect(element.html()).to.contain('ng-repeat="note in ctrl.noteData.notes"');
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
        expect(note).to.contain(noteData.notes[0].title);
        expect(note).to.contain(noteData.notes[0].text);
        expect(note.html()).to.contain('ng-repeat="tag in note.tags"');
        if (noteData.notes[0].tags.length > 0) {
          expect(note).to.contain(noteData.notes[0].tags[0]);
        }
      });
    });

    describe('Add tap handler to noteList directive', function () {

      describe('Tap handler to toggle the state of a note', function () {

        it('should toggle state', function () {
          var index = 0;
          var note = isolated.ctrl.noteData.notes[index];
          isolated.ctrl.toggleNoteState(note);
          expect(isolated.ctrl.noteData.notes[index].opened).to.equal(true);
          isolated.ctrl.toggleNoteState(note);
          expect(isolated.ctrl.noteData.notes[index].opened).to.equal(false);
        });

        it('should toggle state when note element is clicked', function () {
           var index = 0;
           var note = element.find('ion-list .note-item').eq(index);
           note.click();
           expect(isolated.ctrl.noteData.notes[index].opened).to.equal(true);
           note.click();
           expect(isolated.ctrl.noteData.notes[index].opened).to.equal(false);
        });
      });

      describe('Connect tap handler with ng-show', function () {
        it('should add and remove .ng-hide class when when note element is clicked', function () {
          var note = element.find('ion-list .note-item').eq(0);
          var textAndTags = note.find('#note-text-and-tags');
          expect(textAndTags).to.have.class('ng-hide');
          note.click();
          expect(textAndTags).to.not.have.class('ng-hide');
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
        beforeEach(function () {
          text = textAndTags.find('.text-title');
        });

        it('text should be in a p element', function () {
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

      describe('Add transition for open and close note', function () {
        it('should have an animate-show class', function () {
          expect(textAndTags).to.have.class('animate-show');
        });
      });
    });
  });

  describe('Create a button for deleting note', function () {

    it('should have class button button-icon icon icon-right ion-ios7-close-outline note-close', function () {
     var button = element.find('div.note-close-container a');
     expect(button).to.have.class('button button-icon icon icon-right ion-ios7-close-outline note-close');
    });

    describe('Connect `deleteNote` method to delete button with ng-click', function () {
      var stub;

      beforeEach(function () {
        stub = sinon.stub(window, 'confirm');
      });

      afterEach(function () {
        stub.restore();
      });

      it('should delete note', function () {
        var testNote = {
          title: 'Testnote',
          text: 'Test text',
          tags: ['test tag'],
        };
        isolated.ctrl.noteData.addNote(testNote);
        scope.$digest();
        var firstNote = element.find('ion-list .note-item').eq(0);
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
        isolated.ctrl.editedNote = isolated.ctrl.cloneNote(testNote);
        scope.$digest();
        expect(modalElement.find('input.modal-title').val()).to.equal('Testnote');
      });
    });

    describe('Create updateNotes method', function () {
      var testNote;
      var editedNote;

      beforeEach(function () {
        noteData.notes = [];

        testNote = {
          title: 'Testnote',
          text: 'Test text',
          tags: ['test tag'],
        };

        editedNote = {
          title: 'Edited Note',
          text: 'Edited Text',
          tags: 'Edited, Tags'
        };

        isolated.ctrl.editedNote = editedNote;

        noteData.addNote(testNote);
        isolated.ctrl.note = noteData.notes[0];
      });

      afterEach(function () {
        noteData.notes = [];
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
});
