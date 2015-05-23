// externalLinkService.srv.js

'use strict';

function externalLinkService () {
  return {
   launchExternalLink: function (event) {
      var linkElementString = event.target.toString();
      if (linkElementString) {
        window.open(linkElementString, '_system', 'location=yes');
      }
    },

    handleLinkClicked: function (event) {
      if (event.target.nodeName === 'A') {  // target is a link
        event.preventDefault();
        event.stopPropagation();
        this.launchExternalLink(event);
      }
    }
  };
}

angular.module('simpleNote').factory('externalLinkService', externalLinkService);
