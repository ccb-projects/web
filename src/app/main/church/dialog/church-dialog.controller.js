(function() {
	'use strict';

	angular
		.module('ccb.web')
		.controller('ChurchDialogController', ChurchDialogController);

	function ChurchDialogController($mdDialog, church, ChurchService, CityService, immobileType) {
		var vm = this;

		vm.church = church;
		vm.closeDialog = closeDialog;
		vm.immobileTypes = immobileType;
		vm.save = save;

		CityService.query().$promise.then(function(response) {
            vm.cities = response.content;
        }, function(error) {
            console.log(error);
        });

		vm.stepper = {
            church: {},
            address: {},
            ministry: {}
        };

        function save() {
        	if(vm.church.id == null) {
        		ChurchService.save(vm.church, onSaveSuccess, closeDialog);
        	} else {
        		ChurchService.update(vm.church, onSaveSuccess, closeDialog);
        	}
        }

        function onSaveSuccess (result) {
            $mdDialog.hide(result);
        }

		function closeDialog()
        {
            $mdDialog.cancel();
        }
	}

})();