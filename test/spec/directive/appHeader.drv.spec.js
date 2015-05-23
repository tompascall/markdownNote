// appHeader.drv.js

'use strict';

describe('Directive: appHeader', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var newNoteModal;
  var searchNote;
  var extrasModal;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(function () {
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
    });

    element = $compile('<ion-header-bar app-header></ion-header-bar>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
    newNoteModal = isolated.ctrl.newNoteModal;
    extrasModal = isolated.ctrl.extrasModal;
  });


  describe('Create header and add button', function () {

    it('should have a h1 with a notes-header id', function () {
      expect(element.find('h1#notes-header'))
        .to.have.class('title');
    });

    it('should have a button with class button button-icon', function () {
      expect(element.find('button#add-button'))
        .to.have.class('button button-icon');
    });

    it('should have a plus icon', function () {
      expect(element.find('button#add-button').children('i'))
        .to.have.class('icon ion-plus-round');
    });
  });

  describe('testing newNote modal', function () {

    var modalElement;

    beforeEach(function () {
      modalElement = newNoteModal.$el;
    });

    describe('Add newNoteModal', function () {
      it('should be an $ionicModal', function () {
        newNoteModal.show();
        expect(newNoteModal.isShown()).to.equal(true);
        newNoteModal.hide();
        expect(newNoteModal.isShown()).to.equal(false);
        newNoteModal.remove();
      });
    });

    describe('Show and hide newNoteModal', function () {
      it('should sow and hide modal', function () {
        isolated.ctrl.showModal(newNoteModal);
        expect(newNoteModal.isShown()).to.equal(true);
        isolated.ctrl.hideModal(newNoteModal);
        expect(newNoteModal.isShown()).to.equal(false);
        newNoteModal.remove();
      });
    });

    describe('Add input fields to newNoteModal', function () {

      it('should have a modal class', function () {
        expect(modalElement.find('div')).to.have.class('modal');
      });

      it('should contain ion-header-bar', function () {
        var headerBar = modalElement.find('ion-header-bar');
        expect(headerBar).to.have.class('secondary');
        expect(headerBar.children('h1')).to.have.class('title');
        expect(headerBar.children('h1').text())
          .to.contain('Your New Note');
        expect(headerBar.children('button'))
          .to.have.class('button button-clear button-positive');
      });

      it('should have input fields', function () {
        var inputList = modalElement.find('ion-content form div.list label');
        expect(inputList.children('input'))
          .to.have.attr('placeholder', 'Title of your note');
        expect(inputList.children('textarea'))
          .to.have.attr('placeholder', 'Enter your note here');
         expect(inputList.children('input').eq(1))
          .to.have.attr('placeholder', 'Tags (separated by commas)');
      });

      it('should have a padding area', function () {
        var button = modalElement.find('ion-content form div.padding button');
        expect(button).to.have.attr('type', 'submit');
        expect(button.text()).to.contain('Create Note');
      });
    });

    describe('Add tap handler to + button', function () {
      it('should show the modal', function () {
        element.find('button#add-button').click();
        expect(newNoteModal.isShown()).to.equal(true);
        newNoteModal.remove();
      });
    });

    describe('Add tap handler to Cancel button', function () {
      it('should hide the modal', function () {
        modalElement.find('#new-note-modal-cancel-button').click();
        expect(newNoteModal.isShown()).to.equal(false);
        newNoteModal.remove();
      });
    });
  });

  describe('Connect modal data to noteData service', function () {
    var noteData;

    beforeEach(function () {
      inject(function ($injector) {
        noteData = $injector.get('noteData');
      });
    });

    describe('Connect noteData service to appHeader directive', function () {
      it('should get noteData', function () {
        expect(isolated.ctrl.noteData.notes.length)
          .to.equal(noteData.notes.length);
      });
    });

    describe('Connect modal fields to appHeader directive', function () {
      it('should get the text of title field', function () {
        scope.$apply(function () {
          newNoteModal.$el.find('#newNoteModalTitle')
            .val('Test').trigger('input');
        });
        expect(isolated.ctrl.title).to.equal('Test');
      });

      it('should get the text of text field', function () {
        scope.$apply(function () {
          newNoteModal.$el.find('textarea')
            .val('Test').trigger('input');
        });
        expect(isolated.ctrl.text).to.equal('Test');
      });

      it('should get the tags of title field', function () {
        scope.$apply(function () {
          newNoteModal.$el.find('#newNoteModalTags')
            .val('Test').trigger('input');
        });
        expect(isolated.ctrl.tags).to.equal('Test');
      });
    });

    describe('Add newNote method to addHeader directive', function () {
      var note;

      beforeEach(function () {
        isolated.ctrl.title = 'test title';
        isolated.ctrl.text = 'test text';
        isolated.ctrl.tags = 'test tag1, test tag2';
      });

      it('should add new note', function () {
        var id = noteData.createId();
        var preparedNote = {
          title: 'test title',
          text: 'test text',
          htmlText: '<p>test text</p>',
          tags: ['test tag1', 'test tag2'],
          opened: false,
          id: id
        }
        isolated.ctrl.addNewNote();
        expect(noteData.notes.slice(-1)[0]).to.deep.equal(preparedNote);
      });
    });

    describe('Test: Create tap handler to Create Note button', function () {

      beforeEach(function () {
        isolated.ctrl.title = 'test title';
        isolated.ctrl.text = 'test text';
        isolated.ctrl.tags = 'test tag1, test tag2';
      });

      it('should add note', function () {
        var noteNumber = noteData.notes.length;
        newNoteModal.$el.find('#createNewNoteButton').click();
        expect(noteData.notes.length).to.equal(noteNumber + 1);
        expect(isolated.ctrl.title).to.equal('');
        expect(isolated.ctrl.text).to.equal('');
        expect(isolated.ctrl.tags).to.equal('');
        expect(isolated.ctrl.newNoteModal.isShown()).to.equal(false);
      });
    });
  });

  describe('Add search button', function () {
    it('should have a button with class button button-icon', function () {
      expect(element.find('button#search-button'))
        .to.have.class('button button-icon');
    });

    it('should have an icon with ion-search class', function () {
      expect(element.find('button#search-button i'))
        .to.have.class('icon ion-search');
    });
  });

  describe('Connect search button to toggleSearchNote method', function () {
    beforeEach(function () {
      inject(function ($injector) {
        searchNote = $injector.get('searchNote');
      });
    });

    it('should call toggleSearchInput method', function () {
      sinon.spy(searchNote, 'toggleSearchInput');
      element.find('button#search-button').click();
      expect(searchNote.toggleSearchInput.calledOnce).to.equal(true);
      searchNote.toggleSearchInput.restore();
    });
  });

  describe('testing extrasModal', function () {

    var modalElement;

    beforeEach(function () {
      modalElement = extrasModal.$el;
    });

    describe('Add extrasModal', function () {
      it('should be an $ionicModal', function () {
        extrasModal.show();
        expect(extrasModal.isShown()).to.equal(true);
        extrasModal.hide();
        expect(extrasModal.isShown()).to.equal(false);
        extrasModal.remove();
      });
    });

    describe('Show and hide extrasModal', function () {
      it('should show and hide modal', function () {
        isolated.ctrl.showModal(extrasModal);
        expect(extrasModal.isShown()).to.equal(true);
        isolated.ctrl.hideModal(extrasModal);
        expect(extrasModal.isShown()).to.equal(false);
        extrasModal.remove();
      });
    });

    describe('Add elements to extrasModal', function () {

      it('should have a modal class', function () {
        expect(modalElement.find('div')).to.have.class('modal');
      });

      it('should contain ion-header-bar', function () {
        var headerBar = modalElement.find('ion-header-bar');
        expect(headerBar).to.have.class('secondary');
        expect(headerBar.children('h1')).to.have.class('title');
        expect(headerBar.children('h1').text())
          .to.contain('Extras');
        expect(headerBar.children('button'))
          .to.have.class('button button-clear button-positive');
      });

      it('should have Save to Device button', function () {
        var saveToDeviceButton = modalElement.find('ion-content form div.list button.saveToDeviceButton');
         expect(saveToDeviceButton.text()).to.equal('Save Notes to simpleNote.json');
      });

      it('should have Backup from Device button', function () {
        var backupFromDeviceButton = modalElement.find('ion-content form div.list button.backupFromDeviceButton');
         expect(backupFromDeviceButton.text()).to.equal('Backup notes from simpleNote.json');
      });

      it('should have an About button', function () {
        var aboutButton = modalElement.find('ion-content form div.list button.aboutButton');
        expect(aboutButton.text()).to.equal('About simpleNote');
      });

      it('should have a padding area', function () {
        var button = modalElement.find('ion-content form div.padding button');
        expect(button).to.have.attr('type', 'submit');
        expect(button.text()).to.contain('Done');
      });
    });

    describe('Add tap handler to header title', function () {
      it('should show the modal', function () {
        element.find('h1#notes-header').click();
          expect(extrasModal.isShown()).to.equal(true);
          extrasModal.remove();
      });
    });

    describe('Add tap handler to Cancel button', function () {
      it('should hide the modal', function () {
        element.find('h1#notes-header').click();
        expect(extrasModal.isShown()).to.equal(true);
        modalElement.find('#extras-modal-cancel-button').click();
        expect(extrasModal.isShown()).to.equal(false);
        newNoteModal.remove();
      });
    });
  });
});
