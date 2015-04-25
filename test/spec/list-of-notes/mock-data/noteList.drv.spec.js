// noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

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

  it('contains the appropriate content', function () {
    expect(element.html()).to.contain('ng-repeat="note in ctrl.notes"');
  });

  it('injected the noteData service', function () {
    expect(isolated.ctrl.notes).to.deep.equal(noteData.notes);
  });

  it('should contain the title of the note', function () {
    expect(element.html()).to.contain(noteData.notes[0].title);
  });

  it('should be an ion-list', function () {
    var list =  element.find('ion-list');
    expect(list.length).to.equal(1);
    var items = element.find('ion-list ion-item');
    expect(items.length).to.equal(noteData.notes.length);
  });

  it('ion-item should have note css class', function () {
    var titleRow = element.find('ion-item div');
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
