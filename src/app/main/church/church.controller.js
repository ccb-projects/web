(function() {
	'use strict';

	angular
		.module('ccb.web')
		.controller('ChurchController', ChurchController);

	function ChurchController($mdDialog, $document, ChurchService, immobileType, $state) {

		var vm = this;
		
		vm.selected = [];
		vm.pagination = {};
		vm.immobileTypes = immobileType;

		vm.list = list;
		vm.remove = remove;
		vm.onPaginate = onPaginate;
		
		vm.list(0, 5);

		////////////////

		function list(page, size) {
			return ChurchService.list({page: page, size: size, sort: 'id'}, listSucess);
		}

		function listSucess(response) {
			vm.churches = response.content;

			vm.pagination.page = response.number + 1;
			vm.pagination.totalPages = response.totalPages;
			vm.pagination.numberOfElements = response.numberOfElements;
			vm.pagination.totalElements = response.totalElements;
		}

		function remove(ev)
        {
            var confirm = $mdDialog.confirm({
                title              : 'Excluir Igreja',
                parent             : angular.element($document.body),
                textContent        : 'Deseja mesmo excluir esta Igreja?',
                ariaLabel          : 'Excluir igreja',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Excluir',
                cancel             : 'Cancelar'
            });

            $mdDialog.show(confirm).then(function () {
                ChurchService.delete({id: vm.selected[0].id}, function() {
                	$state.go($state.current, {}, {reload: true});
                });

            });
        }

        function onPaginate(page, limite) {
        	 vm.list(page - 1, limite);
        }
	}
	
})();