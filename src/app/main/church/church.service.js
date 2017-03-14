(function() {
	'use strict';

	angular
		.module('ccb.web')
		.factory('ChurchService', ChurchService);

	function ChurchService($resource) {

		return $resource('church/:id', {}, {
            'list': { method: 'GET'},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'save': {method: 'POST'}
        });

	}
	
})();