// mock-data.spec.js

'use strict';

describe('Service: noteData', function () {

  beforeEach(module('simpleNote'));
    var noteData;

  beforeEach(inject(function ($injector) {
    noteData = $injector.get('noteData');
  }));

  it('should get noteData service', function () {
    expect(noteData).to.not.equal(undefined);
    expect(noteData.notes).to.be.an('array');
  });

  it('should add note', function () {
    noteData.notes = [];
    var note = {
        title: 'Title for testing purpose',
        text: 'Lorem ipsum dolor sit amet...',
        tags: ['first note', 'testing purpose']
      };
    noteData.addNote(note);
    expect(noteData.notes.length).to.equal(1);
    expect(noteData.notes[0].title).to.equal('Title for testing purpose');
    expect(noteData.notes[0].text).to.equal('Lorem ipsum dolor sit amet...');
    expect(noteData.notes[0].tags).to.deep.equal(['first note', 'testing purpose']);
    expect(noteData.notes[0].opened).to.equal(false);

    noteData.addNote(note);
    expect(noteData.notes.length).to.equal(2);
  });
});
