// saveFile.drv.js

'use strict';

function saveFile (fileService) {

  function saveFileController () {

    var controller = this;

    /*jshint validthis: true */
    controller.saveText = function () {
    };
  }

  return {
    restrict: 'E',
    controller: saveFileController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/save-file.drv.html'
  };
}

angular.module('simpleNote').directive('saveFile', saveFile);
