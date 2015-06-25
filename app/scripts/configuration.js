'use strict';

 angular.module('config', [])

.constant('ENV', {name:'development',apiEndpoint:'',pageSize:30,fileName:'markdownNote.json',Android:{filePath:'download/'},iOS:{filePath:'Library/'}})

;