'use strict';

 angular.module('config', [])

.constant('ENV', {name:'production',apiEndpoint:'',pageSize:30,fileName:'markdownNote.json',Android:{filePath:'download/'},iOS:{filePath:'Library/'}})

;