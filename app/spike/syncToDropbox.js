// syncToDropbox.js

'use strict';

// Browser-side applications do not use the API secret.
var client = new Dropbox.Client({ key: 'pbqyznysf6jffyl' });

var dropErrorHandlers = {
  showTokenNumber: function (tokenNumber, message) {
    var message = message || 'Something went wrong: ';
    console.log(message, tokenNumber);
  }
};

dropErrorHandlers[Dropbox.ApiError.INVALID_TOKEN] = {
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
  tokenNumber: Dropbox.ApiError.INVALID_TOKEN,
  errorHandler: function () {
    var message = 'The user token expired.';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.NOT_FOUND] = {
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
  tokenNumber: Dropbox.ApiError.NOT_FOUND,
  errorHandler: function () {
    var message = 'The file or folder you tried to access is not in the user\'s Dropbox';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.OVER_QUOTA] = {
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
  tokenNumber: Dropbox.ApiError.OVER_QUOTA,
  errorHandler: function () {
    var message = 'The user is over their Dropbox quota';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.RATE_LIMITED] = {
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
  tokenNumber: Dropbox.ApiError.RATE_LIMITED,
  errorHandler: function () {
    var message = 'Too many API requests, try again later';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.NETWORK_ERROR] = {
    // An error occurred at the XMLHttpRequest layer.
    // Most likely, the user's network connection is down.
    // API calls will not succeed until the user gets back online.
  tokenNumber: Dropbox.ApiError.NETWORK_ERROR,
  errorHandler: function () {
    var message = 'An error occurred at the XMLHttpRequest layer';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.INVALID_PARAM] = {
  tokenNumber: Dropbox.ApiError.INVALID_PARAM,
  errorHandler: function () {
    var message = 'Invalid parameter';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.OAUTH_ERROR] = {
  tokenNumber: Dropbox.ApiError.OAUTH_ERROR,
  errorHandler: function () {
    var message = 'Authentication error';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

dropErrorHandlers[Dropbox.ApiError.INVALID_METHOD] = {
  tokenNumber: Dropbox.ApiError.INVALID_METHOD,
  errorHandler: function () {
    var message = 'Invalid method';
    dropErrorHandlers.showTokenNumber(this.tokenNumber, message);
  }
};

function doSomethingCool () {

  client.getAccountInfo(function(error, accountInfo) {
    if (error) {
      return  dropErrorHandlers[error.status].errorHandler();  // Something went wrong.
    }
    else {
      var mockData = JSON.stringify({mockData: 'mockData'});
      writeFile({fileName: 'markdownNote.json'}, mockData);
      window.alert('Hello, ' + accountInfo.name + '!');
      client.signOut();
    }
  });
}

function writeFile (options, data) {
  var fileName = options.fileName;

  client.writeFile(fileName, data, function(error, stat) {
    if (error) {
      return dropErrorHandlers[error.status].errorHandler();
    }
    console.log('The ' + fileName + ' file has been succesfully written');
    readFile({fileName: 'markdownNote.json'});
  });
}

function readFile (options) {
  var fileName = options.fileName;

  client.readFile(fileName, function(error, data) {
    if (error) {
      return dropErrorHandlers[error.status].errorHandler();
    }
    console.log('The ' + fileName + ' file has been succesfully read');
    console.log(data);
  });
}

client.authenticate(function(error, client) {
  if (error) {
    // Replace with a call to your own error-handling code.
    //
    // Don't forget to return from the callback, so you don't execute the code
    // that assumes everything went well.
    console.log('authentication error');
    return  dropErrorHandlers[error.status].errorHandler();
  }

  // Replace with a call to your own application code.
  //
  // The user authorized your app, and everything went well.
  // client is a Dropbox.Client instance that you can use to make API calls.

  console.log('client is ready');
  //doSomethingCool(client);

});





