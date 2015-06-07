// addSearchNote.drv.spec.js

'use strict';

describe('Directive: addSearchNote', function () {
  var $compile;
  var scope;
  var searchNote;
  var element;

  beforeEach(function () {
    module('markdownNote');
    module('templates');

    inject(function ($injector) {
      $compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
      searchNote = $injector.get('searchNote');
    });

    element = $compile('<div add-search-note></div>')(scope);
    scope.$digest();
  });

  describe('Testing element', function () {

    it('should have access to searchNote', function () {
      expect(scope.addSearchNoteCtrl.searchNote).to.deep.equal(searchNote);
    });
  });
});
