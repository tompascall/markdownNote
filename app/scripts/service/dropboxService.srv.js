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
    errorHandler: function () {
      console.log('INVALID_TOKEN');
      var message = 'The authentication has been expired. Please try to authenticate yourself again.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.NOT_FOUND] = {
      // The file or folder you tried to access is not in the user's Dropbox.
      // Handling this error is specific to your application.
    tokenNumber: Dropbox.ApiError.NOT_FOUND,
    errorHandler: function () {
      console.log('NOT_FOUND');
      var message = 'Bad news. The file or folder you tried to access is not in the user\'s Dropbox.' +
      ' You are welcome to connect to the developer, tell him something is messed up';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.OVER_QUOTA] = {
      // The user is over their Dropbox quota.
      // Tell them their Dropbox is full. Refreshing the page won't help.
    tokenNumber: Dropbox.ApiError.OVER_QUOTA,
    errorHandler: function () {
      console.log('OVER_QUOTA');
      var message = 'Your Dropbox quota is over. Please try to free some space and try again.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.RATE_LIMITED] = {
      // Too many API requests. Tell the user to try again later.
      // Long-term, optimize your code to use fewer API calls.
    tokenNumber: Dropbox.ApiError.RATE_LIMITED,
    errorHandler: function () {
      console.log('RATE_LIMITED');
      var message = 'Too many API requests, please try again later.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.NETWORK_ERROR] = {
      // An error occurred at the XMLHttpRequest layer.
      // Most likely, the user's network connection is down.
      // API calls will not succeed until the user gets back online.
    tokenNumber: Dropbox.ApiError.NETWORK_ERROR,
    errorHandler: function () {
      console.log('NETWORK_ERROR');
      var message = 'Your network connection may be down. Please try your connection.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.INVALID_PARAM] = {
    tokenNumber: Dropbox.ApiError.INVALID_PARAM,
    errorHandler: function () {
      console.log('INVALID_PARAM');
      var message = 'Invalid parameter. It\'s bad news for you and the developer';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.OAUTH_ERROR] = {
    tokenNumber: Dropbox.ApiError.OAUTH_ERROR,
    errorHandler: function () {
      console.log('OAUTH_ERROR');
      var message = 'This indicates a bug in dropbox.js and should never occur under normal circumstances.' +
      ' So this is not normal circumstances.';
      return message;
    }
  };

  dropboxService.errorHandlers[Dropbox.ApiError.INVALID_METHOD] = {
    tokenNumber: Dropbox.ApiError.INVALID_METHOD,
    errorHandler: function () {
      console.log('INVALID_METHOD');
      var message = 'This indicates a bug in dropbox.js and should never occur under normal circumstances.' +
      ' So this is not normal circumstances.';
      return message;
    }
  };

  return dropboxService;
}

angular.module('markdownNote').factory('dropboxService', dropboxService);