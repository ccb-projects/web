(function() {
'use strict';

    angular
        .module('ccb.web')
        .factory('DocumentService', DocumentService);

    function DocumentService($resource) {
        var baseUrl = 'document/:id';
        return $resource(baseUrl, {}, {
            'findByChurch' : {
                method : 'GET',
                url : 'document/find-church/:id',
                isArray : true
            }
        });
    }
})();