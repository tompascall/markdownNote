// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [
      {
        title: 'noteTitle1 noteTitle1 noteTitle1 noteTitle1 noteTitle1 noteTitle1'
      },
      {
        title: 'noteTitle2'
      }
    ]
  };
});


