// pagination.drv.js

'use strict';

function pagination () {

  function paginationController ($scope, pageService) {


   /*jshint validthis: true */
    var controller = this;
    controller.pageService = pageService;

    controller.setCurrentPage = function (offset) {
      var currentPage = controller.pageService.currentPage;
      if (offset > 0) {
        if (currentPage < controller.pageService.numberOfPages) {
          controller.pageService.currentPage = currentPage + offset;
        }
      }
      else {
        if (currentPage > 0) {
          controller.pageService.currentPage = currentPage + offset;
        }
      }
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
