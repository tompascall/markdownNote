// dropboxService.srv.js

'use strict';

function dropboxService () {
  /*jshint -W004 */  // to skip 'dropboxService is already defined' jshint message
  var dropboxService = {
    clientInitOptions: {key: 'pbqyznysf6jffyl'}
  };

  dropboxService.client = new Dropbox.Client(dropboxService.clientInitOptions);
  return dropboxService;
}

angular.module('markdownNote').factory('dropboxService', dropboxService);
