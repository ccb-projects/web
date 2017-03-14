(function() {
	'use strict';

	angular
		.module('crud.maintenance', [])
		.directive('crudMaintenance', crudMaintenance);

	function crudMaintenance() {
		return {
			restrict: 'E',
			controller: CrudMaintenanceController,
			controllerAs: 'vm',
			templateUrl: 'app/components/crud-maintenance/crud-maintenance.html',
			scope: {
				title: '@',
				parent: '=',
				add: '&onAdd'
			},
			transclude : {
            	table : 'crudMaintenanceTable'
        	}
		}

	}

	function CrudMaintenanceController() {
		var vm = this;

		vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };

	}

})();