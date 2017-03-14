(function() {
	'use strict';

	angular
		.module('ccb.web')
		.service('CityService', CityService);

	function CityService($resource) {

		return $resource('/city', {}, {
            'list': { method: 'GET'},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });

	}
	
})();