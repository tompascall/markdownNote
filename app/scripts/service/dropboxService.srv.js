// dropboxService.srv.js

'use strict';

function dropboxService () {
  /*jshint -W004 */  // to skip 'dropboxService is already defined' jshint message
  var dropboxService = {
    clientInitOptions: {key: 'pbqyznysf6jffyl'}
  };

  dropboxService.client = new Dropbox.Client(dropboxService.clientInitOptions);

  dropboxService.errorHandlers = {};
  dropboxService.errorHandlers[Dropbox.ApiError.INVALID_TOKEN] = {
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
    tokenNumber: Dropbox.ApiError.INVALID_TOKEN,
    errorHandler: function () {}
  };

  return dropboxService;
}

angular.module('markdownNote').factory('dropboxService', dropboxService);
