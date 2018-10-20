(function() {
    "use strict";

    angular.module("directivas", [])
        .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', ModalInstanceCtrl])

    .directive('noDirtyCheck', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$pristine = false;
            }
        }
    })

    .directive('ngReallyClick', ['$uibModal',
        function($uibModal) {
            // debugger;
            return {
                restrict: 'A',
                scope: {
                    ngReallyClick: "&",
                    item: "=",
                    ngReallyCancel: "&"
                },
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        var message = attrs.ngReallyMessage || "&iquest;Seguro de ejecutar esta operaci&oacute;n&#63;";

                        var modalHtml = '<div class="modal-header">Confirmaci&oacuten<button type="button" class="close" ng-click="cancel()" data-dissmiss="modal">x</button></div><div class="modal-body">' + message + '</div>';
                        modalHtml += '<div class="modal-footer"><button class="btn btn-success" ng-click="ok()">Confirmar</button><button class="btn btn-primary" ng-click="cancel()">Cancelar</button></div>';

                        var modalInstance = $uibModal.open({
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });

                        modalInstance.result.then(function() {
                            // debugger;
                            scope.ngReallyClick({ item: scope.item });
                        }, function() {
                            //Modal dismissed
                            scope.ngReallyCancel({ item: scope.item });
                        });
                        //*/

                    });

                }
            }
        }
    ])


    .directive('ngReallyPublicar', ['$uibModal',
        function($uibModal) {
            // debugger;
            return {
                restrict: 'A',
                scope: {
                    ngReallyPublicar: "&",
                    item: "=",
                    ngReallyCancel: "&"
                },
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        var message = attrs.ngReallyMessage || "&iquest;Seguro que desea enviar este documento al cliente&#63;";

                        var modalHtml = '<div class="modal-header">Confirmaci&oacuten<button type="button" class="close" ng-click="cancel()" data-dissmiss="modal">x</button></div><div class="modal-body">' + message + '</div>';
                        modalHtml += '<div class="modal-footer"><button class="btn btn-success" ng-click="ok()">Confirmar</button><button class="btn btn-primary" ng-click="cancel()">Cancelar</button></div>';

                        var modalInstance = $uibModal.open({
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });

                        modalInstance.result.then(function() {
                            // debugger;
                            scope.ngReallyPublicar({ item: scope.item });
                        }, function() {
                            //Modal dismissed
                            scope.ngReallyCancel({ item: scope.item });
                        });
                        //*/

                    });

                }
            }
        }
    ])


    .directive('loadStatus', function() {
        return {
            restrict: 'ACE',
            template: '<a ng-click="openModal()" class="linkTabla">{{descripcion}}</a>',
            controller: "loadImageModalCtrl",
            require: 'ngModel',
            scope: {
                tipo: '@',
                estado: "@",
                descripcion: '@'
            }
        };
    })

    .directive('autoFocusCampo', function($timeout) {
        return {
            restrict: 'AC',
            link: function(_scope, _element) {
                $timeout(function() {
                    _element[0].focus();
                }, 0);
            }
        };
    })

    .directive('confirmaRegresar', ['$uibModal',
        function($uibModal) {
            return {
                restrict: 'A',
                scope: {
                    stateForm: "=",
                    confirmaRegresar: "&", //estas propiedades son las que se ponen en el html y que bind-iaremos a la directiva
                    cancelarRegresar: "&",
                    mensaje: "@",
                    // coleccion: "<"
                }, //no lleva controlador esta directiva, porque como tal en la funcion link se tiene toda la logica, para mas informacion ver el tema de $compile en angular js
                //tema a profundidad: https://docs.angularjs.org/api/ng/service/$compile#-scope-
                //ayuda en general sobre directivas: https://docs.angularjs.org/guide/directive
                link: function(scope, element, attr) { //Se hace un bind al momento de hace clic
                    element.bind("click", function() {

                        if (scope.stateForm.$dirty) { //validamos el formulario, si ha sido tocado entonces se desplega un modal para confirmar
                            var msj = scope.mensaje || "La información ingresada no se guardará, ¿seguro desea salir sin guardar los cambios?"; //Si no se agrega un mesaje se carga uno default
                            var modalHtml = '<div class="modal-header">Confirmaci&oacuten<button type="button" class="close" ng-click="cancel()" data-dissmiss="modal">x</button></div><div class="modal-body">' + msj + '</div>';
                            modalHtml += '<div class="modal-body"><button class="btn btn-success" ng-click="ok()">Confirmar</button><button class="btn btn-primary" ng-click="cancel()">Cancelar</button></div>';


                            //abre el modal preguntando al usuario su confirmacion 
                            var modalInstance = $uibModal.open({
                                template: modalHtml,
                                controller: ModalInstanceCtrl
                            });

                            modalInstance.result.then(function() {
                                //cuando el usuario acepta regresar
                                scope.confirmaRegresar()
                            }, function() {
                                //Cuando el modal se cierra
                                scope.cancelarRegresar()
                            });
                        } else {
                            scope.confirmaRegresar()
                        }
                    })
                }

            } //end return
        } //end funcion
    ]);


    function ModalInstanceCtrl($scope, $uibModalInstance) {
        $scope.ok = function() {
            $uibModalInstance.close();
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };

}());