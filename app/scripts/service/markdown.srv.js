// markdown.srv.js
// dependency: install pagedown
// https://code.google.com/p/pagedown/wiki/PageDown
// install pagedown-extra
// https://github.com/jmcmanus/pagedown-extra

'use strict';

function markdown () {
  // var converter = new Markdown.Converter();
  // Markdown.Extra.init(converter);
  // return {
  //   convertMarkdownToHTML: function (markdownText) {
  //     return converter.makeHtml(markdownText);
  //   }
  // };


  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });
  return {
    convertMarkdownToHTML: function (markdownText) {
      return marked(markdownText);
    }
  };
}

angular.module('markdownNote').factory('markdown', markdown);
