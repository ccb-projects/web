(function() {
'use strict';

    angular
        .module('ccb.web')
        .factory('DocumentTypeService', DocumentTypeService);

    function DocumentTypeService($resource) {
        var baseUrl = 'document-type/:id';
        return $resource(baseUrl, {}, {
            'list' : {
                method : 'GET'
            }
        });
    }
})();