/*AYUDA:
FooEntitiesService nombre de factory en RolesEdit.service.js
*/

(function() {
    "use strict";


    angular
        .module("veradizDOC")
        .controller("DocumentosEditCtrl", ['AuthService', '$scope', 'DocumentosService', 'globalGet', '$state', '$stateParams', '$filter', "uploadFileACH", DocumentosEditCtrl]);

    function DocumentosEditCtrl(AuthService, $scope, DocumentosService, globalGet, $state, $stateParams, uploadFileACH, $filter) {

        //Variable API
        var API = globalGet.get("api");

        var id = $stateParams.id;

        $scope.registro = {};


        //Obtene ambito
        DocumentosService.getById(id).then(
            function(result) {
                // $scope.registro = result.data.records;
                $scope.registro = result.data;
                $scope.regFile = false;
                console.log(result.data);
            },
            function(err) {
                console.error(err);
            }
        );


        //Guardar Cambios
        $scope.update = function() {
            DocumentosService.Update($scope.registro).then(
                function(result) {
                    $state.go("usuarios");
                },
                function(err) {
                    console.error(err);
                }
            );
        }

        $scope.deleteFile = function() {
            $scope.registro.archivo = "eliminar";
            $scope.registro.id = null;
            $scope.archivos = 0;
            $scope.regFile = true;
            angular.element("input[type='file']").val(null);
            $(":file").filestyle('clear');
            $scope.ValidForm.$setDirty();
        }





    }
})();