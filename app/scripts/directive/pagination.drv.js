// pagination.drv.js

'use strict';

function pagination () {

  function paginationController ($scope, pageService) {


   /*jshint validthis: true */
    var controller = this;
    controller.pageService = pageService;
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
