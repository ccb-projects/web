(function () {
    'use strict';

    angular
        .module('ccb.web')
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.church', {
                url    : '/church',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/church/church.html',
                        controller : 'ChurchController',
                        controllerAs : 'vm'
                    }
                }
            })
            .state('app.church.new', {
                url: '/new',
                onEnter: ['$mdDialog', '$document', '$state', function($mdDialog, $document, $state) {
                    $mdDialog.show({
                        controller         : 'ChurchDialogController',
                        controllerAs       : 'vm',
                        templateUrl        : 'app/main/church/dialog/church-dialog.html',
                        parent             : angular.element($document.body),
                        clickOutsideToClose: true,
                        locals             : {
                            church: {
                                address: {}
                            }
                        }
                    }).then(function (response) {
                        $state.go('app.church', null, { reload: true });
                    }, function() {
                        $state.go('app.church');
                    });
                }]
            })
            .state('app.church.edit', {
                url: '/{id}/edit',
                onEnter: ['$mdDialog', '$document', '$state', '$stateParams', 'ChurchService', function($mdDialog, $document, $state, $stateParams, ChurchService) {
                    $mdDialog.show({
                        controller         : 'ChurchDialogController',
                        controllerAs       : 'vm',
                        templateUrl        : 'app/main/church/dialog/church-dialog.html',
                        parent             : angular.element($document.body),
                        clickOutsideToClose: true,
                        locals             : {
                            church: ChurchService.get({id: $stateParams.id}).$promise
                        }
                    }).then(function (response) {
                        $state.go('app.church', null, { reload: true });
                    }, function() {
                        $state.go('app.church');
                    });
                }]
            })
            .state('app.church.document', {
                url: '/{churchId}/document',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/church/document/church-document.html',
                        controller : 'ChurchDocumentController',
                        controllerAs : 'vm'
                    }
                },
                resolve : {
                    church : ['ChurchService', '$stateParams', function (ChurchService, $stateParams) {
                            return ChurchService.get({id : $stateParams.churchId});
                    }],
                    documentTypes : ['DocumentTypeService', function (DocumentTypeService) {
                            return DocumentTypeService.list();
                    }],
                    documents : ['DocumentService', '$stateParams', function (DocumentService, $stateParams) {
                            return DocumentService.findByChurch({id : $stateParams.churchId});
                    }]
                }
            });

        $translatePartialLoaderProvider.addPart('app/main/church');

        msNavigationServiceProvider.saveItem('register', {
            title : 'Cadastros',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('register.church', {
            title    : 'Igrejas',
            icon     : 'icon-church',
            state    : 'app.church',
            translate: 'church.title_nav',
            weight   : 1
        });
    }
})();