'use strict';

function tagsFactory () {
  return {
    tagsStringToArray: function (tagsString) {
      var tagArr = [];
      if (tagsString) {
        tagArr = tagsString.split(',').filter(function(tag) {
            return tag !== '';
        });
      }
      return tagArr;
    },

    removeWhiteSpaces: function (inputTags) {
      var tagWithoutWhitespaceBoundary;
      return inputTags.map(function(tag) {
        tagWithoutWhitespaceBoundary = tag.trim();
        return tagWithoutWhitespaceBoundary;
      });
    },

    filterSameTags: function (tags) {
      var set = [];
      tags.forEach(function(tag) {
        if (set.indexOf(tag) === -1) set.push(tag);
      });
      return set;
    }
  };
}

angular.module('simpleNote').factory('tagsFactory', tagsFactory);
