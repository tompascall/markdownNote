// addNewNote.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;
  var newNoteModal;

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

  beforeEach(inject(function (_noteData_) {
    noteData = _noteData_;
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
});
