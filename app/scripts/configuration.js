'use strict';

 angular.module('config', [])

.constant('ENV', {name:'developmentOnline',apiEndpoint:'',pageSize:30,fileName:'markdownNote.json',receiverUrl:'http://localhost:8100/dropbox-oauth-receiver.html'})

;