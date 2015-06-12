// syncToDropbox.js

'use strict';

// Browser-side applications do not use the API secret.
var client = new Dropbox.Client({ key: 'pbqyznysf6jffyl' });
var eTokens = {
  INVALID_TOKEN: Dropbox.ApiError.INVALID_TOKEN,
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
  NOT_FOUND: Dropbox.ApiError.NOT_FOUND,
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
  OVER_QUOTA: Dropbox.ApiError.OVER_QUOTA,
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
  RATE_LIMITED: Dropbox.ApiError.RATE_LIMITED,
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
  NETWORK_ERROR: Dropbox.ApiError.NETWORK_ERROR,
    // An error occurred at the XMLHttpRequest layer.
    // Most likely, the user's network connection is down.
    // API calls will not succeed until the user gets back online.
  INVALID_PARAM: Dropbox.ApiError.INVALID_PARAM,
  OAUTH_ERROR: Dropbox.ApiError.OAUTH_ERROR,
  INVALID_METHOD: Dropbox.ApiError.INVALID_METHOD
};

var showError = {};

function createShowError (message) {
  var message = message || 'Something went wrong, error status code: ';
    return function (error) {
    console.log(message, error.status);
  };
}

function fillShowError () {
  for (var token in eTokens) {
    showError[token] = createShowError(token);
  }
}

function showError (error) {
  if (showError[error.status]) {
    showError[error.status](error);
  }

}

function doSomethingCool () {

  client.getAccountInfo(function(error, accountInfo) {
    if (error) {
      return  showError[error.status](error);  // Something went wrong.
    }
    window.alert('Hello, ' + accountInfo.name + '!');
  });
}

fillShowError();
client.authenticate(function(error, client) {
  if (error) {
    // Replace with a call to your own error-handling code.
    //
    // Don't forget to return from the callback, so you don't execute the code
    // that assumes everything went well.
    console.log('authentication error');
    return  showError[error.status](error);
  }

  // Replace with a call to your own application code.
  //
  // The user authorized your app, and everything went well.
  // client is a Dropbox.Client instance that you can use to make API calls.

  console.log('client is ready');
  doSomethingCool(client);
});





