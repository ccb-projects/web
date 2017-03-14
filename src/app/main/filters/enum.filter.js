(function() {
	'use strict';

	angular
		.module('ccb.web')
		.filter('enumFilter', enumFilter);

	function enumFilter($filter) {
		return function(enumId, enumValues) {
			
			var enumName = $filter('filter')(enumValues, {id: enumId})[0].name;

			return enumName;
		};
	}

})();