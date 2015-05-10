// markdown.srv.spec.js

'use strict';

describe('Service: markdown', function () {

var markdown;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      markdown = $injector.get('markdown');
    });
  });

  describe('Create markdown service', function () {
    var text = '##Title';
    it('should convert markdown to HTML', function () {
      expect(markdown.convertMarkdownToHTML(text)).to.equal('<h2>Title</h2>');
    });
  });
});
