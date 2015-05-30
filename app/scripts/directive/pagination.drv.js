// pagination.drv.js

'use strict';

function pagination () {

  function paginationController ($scope) {


   /*jshint validthis: true */
    var controller = this;

    controller.setCurrentPage = function (offset) {

    };
  }

  return {
    restrict: 'E',
    controller: paginationController,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    templateUrl: 'scripts/directive/pagination.drv.html'
  };
}

angular.module('simpleNote').directive('pagination', pagination);
