// addNewNote.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;
  var $ionicModal;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
    angular.element(document).find('body').append(element); // for rendering css
  }));

  beforeEach(inject(function (_noteData_, _$ionicModal_) {
    noteData = _noteData_;
    $ionicModal = _$ionicModal_;
    var cloneNewNoteModal = $ionicModal
      .fromTemplateUrl('scripts/new-note/new-note-modal.html', function (modal) {
        return modal;
      }, {scope: isolated.ctrl});
  }));

  describe('Add newNoteModal', function () {
    it('should be an $ionicModal', function () {
      expect(isolated.ctrl.newNoteModal).to.deep.equal(cloneNeNoteModal);
    });
  });
});
