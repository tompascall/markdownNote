// tagService.srv.js

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
      return inputTags.filter(function(tag) {
        return tag.trim();
      }).map(function (tag) {
        return tag.trim();
      });
    },

    filterSameTags: function (tags) {
      var set = [];
      tags.forEach(function(tag) {
        if (set.indexOf(tag) === -1) {
          set.push(tag);
        }
      });
      return set;
    },

    filterTagsString: function (tagsString) {
      var tagsArray = this.tagsStringToArray(tagsString);
      var trimmedTags = this.removeWhiteSpaces(tagsArray);
      return this.filterSameTags(trimmedTags);
    }
  };
}

angular.module('simpleNote').factory('tagsFactory', tagsFactory);
