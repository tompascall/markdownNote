// noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;

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

  beforeEach(inject(function (_noteData_) {
    noteData = _noteData_;
  }));

  describe('Create a list of notes', function () {

    it('contains the appropriate content', function () {
      expect(element.html()).to.contain('ng-repeat="note in ctrl.notes"');
    });

    it('should inject the noteData service', function () {
      expect(isolated.ctrl.notes).to.deep.equal(noteData.notes);
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
          var note = isolated.ctrl.notes[index];
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
          expect(tag.html()).to.contain(isolated.ctrl.notes[0].tags[0])
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
});
