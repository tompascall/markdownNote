'use strict';

describe('Service: tags', function () {
  var tagsFactory;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      tagsFactory = $injector.get('tagsFactory');
    });
  });

  it('should split a string with commas to an array', function () {
    var tagsString = 'one,two,three';
    var tagsArray = [];
    tagsArray = tagsFactory.tagsStringToArray(tagsString);
    expect(tagsArray.length).to.equal(3);
    expect(tagsArray[0]).to.equal('one');
    expect(tagsArray[2]).to.equal('three');
  });
});
