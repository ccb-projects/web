(function() {
	'use strict';

	angular
		.module('ccb.web')
		.value('immobileType', [
				{id: 0, name: 'Próprio'},
				{id: 1, name: 'Alugado'},
				{id: 2, name: 'Cedido'}
		]);
})();