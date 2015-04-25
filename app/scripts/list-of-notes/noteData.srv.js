// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [
      {
        title: 'Quite extremely long long long long long long title for testing purpose',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ' +
          'do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
          'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
          'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
          'culpa qui officia deserunt mollit anim id est laborum.',
        tags: ['first note', 'testing purpose', 'lorem ipsum', 'Cicero', 'de Finibus Bonorum et Malorum',
          'long title', 'a lot of tags']
      },
      {
        title: 'Second Note',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ' +
          'do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
          'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
          'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
          'culpa qui officia deserunt mollit anim id est laborum.',
        tags: ['second note']
      }
    ]
  };
});


