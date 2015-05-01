'use strict';

function tagsFactory () {
  return {
    tagsStringToArray: function (tagsString) {
      return tagsString.split(',');
    }
  };
}

angular.module('simpleNote').factory('tagsFactory', tagsFactory);
