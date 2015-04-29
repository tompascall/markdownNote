// addNewNote.spec.js

'use strict';

describe('Directive: noteList', function () {
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

    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css

    newNoteModal = isolated.ctrl.newNoteModal;
  }));

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

    it('should have a title input field', function () {
      console.log(testDirective.html());
      expect(testDirective.find('div')).to.have.class('modal');
    });
  });
});
