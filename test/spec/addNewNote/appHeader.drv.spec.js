// appHeader.drv.js

'use strict';

describe('Directive: appHeader', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;
  var newNoteModal;

  angular.module('simpleNote').directive('mockNewNoteModal', function () {
    return {
      resrict: 'E',
      templateUrl: 'scripts/new-note/new-note-modal.html'
    };
  });

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<app-header></app-header>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
    newNoteModal = isolated.ctrl.newNoteModal;
  }));

  describe('Test directive existence ', function () {
    it('should have an ion-header-bar', function () {
      expect(element.find('ion-header-bar'))
        .to.have.attr('align-title', 'center');
    });

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
      var testDirective;

      beforeEach(function () {

        testDirective = $compile('<mock-new-note-modal></mock-new-note-modal>')(scope);
        scope.$digest();
      });

      it('should have a modal class', function () {
        expect(testDirective.find('div')).to.have.class('modal');
      });

      it('should contain ion-header-bar', function () {
        var headerBar = testDirective.find('ion-header-bar');
        expect(headerBar).to.have.class('secondary');
        expect(headerBar.children('h1')).to.have.class('title');
        expect(headerBar.children('h1').text())
          .to.contain('Your New Note');
        expect(headerBar.children('button'))
          .to.have.class('button button-clear button-positive');
      });

      it('should have input fields', function () {
        var inputList = testDirective.find('ion-content form div.list label');
        expect(inputList.children('input'))
          .to.have.attr('placeholder', 'Title of your note');
        expect(inputList.children('textarea'))
          .to.have.attr('placeholder', 'Enter your note here');
         expect(inputList.children('input').eq(1))
          .to.have.attr('placeholder', 'Tags (separated by commas)');
      });

      it('should have a padding area', function () {
        var button = testDirective.find('ion-content form div.padding button');
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
  });
});
