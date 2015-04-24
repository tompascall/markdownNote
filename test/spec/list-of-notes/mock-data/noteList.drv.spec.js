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
});
