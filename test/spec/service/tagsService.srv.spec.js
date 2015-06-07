// tagsService.srv.spec.js

'use strict';

describe('Service: tags', function () {
  var tagsFactory;

  beforeEach(function () {
    module('markdownNote');

    inject(function ($injector) {
      tagsFactory = $injector.get('tagsFactory');
    });
  });

  it('should split a string with commas to an array', function () {
    var tagsString = 'one,two,three';
    var tagsArray;
    tagsArray = tagsFactory.tagsStringToArray(tagsString);
    expect(tagsArray.length).to.equal(3);
    expect(tagsArray[0]).to.equal('one');
    expect(tagsArray[2]).to.equal('three');
    tagsString = '';
    tagsArray = tagsFactory.tagsStringToArray(tagsString);
    expect(tagsArray.length).to.equal(0);
  });

  it('should remove white spaces', function () {
    var inputTags = ['same tag', ' same tag', ' same tag ', 'same tag '];
    var outputTags = tagsFactory.removeWhiteSpaces(inputTags);
    var sameTags = outputTags.filter(function (tag) { return tag === 'same tag'; });
    expect(sameTags.length).to.equal(inputTags.length);

    inputTags = [' ','    '];
    outputTags = tagsFactory.removeWhiteSpaces(inputTags);
    expect(outputTags.length).to.equal(0);
  });

  it('should filter same tags', function () {
    var  inputTags = ['same tag'];
    var outputTags = tagsFactory.filterSameTags(inputTags);
    expect(outputTags.length).to.equal(1);
    inputTags = ['same tag', 'same tag'];
    outputTags = tagsFactory.filterSameTags(inputTags);
    expect(outputTags.length).to.equal(1);
  });

  it('should filter tags string', function () {
    var tagsString = 'same tag,' + ' same tag,' + ' same tag ,'
      + 'same tag ,' + ', ,';
    var tagsArray = tagsFactory.filterTagsString(tagsString);
    expect(tagsArray.length).to.equal(1);
    expect(tagsArray[0]).to.equal('same tag');
  });
});
