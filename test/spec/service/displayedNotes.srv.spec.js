// displayedNotes.srv.spec.js

'use strict';

describe('Service: displayedNotes', function () {
  var displayedNotes;

  beforeEach(function () {
    module('markdownNote');

    inject(function ($injector) {
      displayedNotes = $injector.get('displayedNotes');
    });
  });

  it('should be an array', function () {
    expect(displayedNotes.notes).to.be.instanceof(Array);
  });

  it('should set displayedNotes.notes', function () {
    var testNotes = [1,2,3,4,5];
    displayedNotes.setDisplayedNotes(testNotes);
    expect(displayedNotes.notes).to.deep.equal(testNotes);
  });
});
