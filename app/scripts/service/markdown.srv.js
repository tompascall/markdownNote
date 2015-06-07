// markdown.srv.js
// dependency: install pagedown
// https://code.google.com/p/pagedown/wiki/PageDown
// install pagedown-extra
// https://github.com/jmcmanus/pagedown-extra

'use strict';

function markdown () {
  var converter = new Markdown.Converter();
  Markdown.Extra.init(converter);
  return {
    convertMarkdownToHTML: function (markdownText) {
      return converter.makeHtml(markdownText);
    }
  };
}

angular.module('markdownNote').factory('markdown', markdown);
