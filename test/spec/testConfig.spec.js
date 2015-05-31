// testConfig.spec.js

'use strict';

describe('Configuring local storage before tests', function () {
  var testLocalStorage = [{
    title: 'Config title',
    text: 'Config text',
    tags: ['Config tag'],
    htmlText: 'Config text',
    id: 0
  }];

  window.localStorage.simpleNote = angular.toJson(testLocalStorage);
});



