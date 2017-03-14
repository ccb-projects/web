(function() {
'use strict';

    angular
        .module('ccb.web')
        .controller('ChurchDocumentController', ChurchDocumentController);

    function ChurchDocumentController($stateParams, DocumentService, church, documentTypes, documents) {
        var vm = this;

        vm.church = church;
        vm.entity = {};
        vm.entity.church = church;
        vm.documentTypes = documentTypes.content;
        vm.documents = documents;

        vm.ngFlowOptions = {
            target                   : 'api/media/image',
            simultaneousUploads      : 1,
            singleFile : true
        };
        vm.ngFlow = {
            flow: {}
        };

        vm.fileAdded = fileAdded;
        vm.saveFile = saveFile;

        function saveFile() {
            DocumentService.save(vm.entity);
        }

        function fileAdded(flowFile) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                vm.entity.documentBase64 = btoa(uri);     
            };
            fileReader.readAsDataURL(flowFile.file);
            vm.documentName = flowFile.name;
        }

    }
})();