(function() {
    angular.module("ModuloPrincipal")
        .controller("IndicesGetCtrl", ["$scope", "$window", "IndicadoresService", IndicesGetCtrl]);

    function IndicesGetCtrl($scope, $window, IndicadoresService) {

        $scope.dolarFixDet = "";
        $scope.dolarFixLiq = "";
        $scope.cetes28 = "";
        $scope.tiie28 = "";
        $scope.tiie91 = "";
        $scope.tasaObjetivo = "";

        $scope.dolarAtras = "";

        $scope.TodasNoticias = {};
        $scope.UltimasNoticias = {};

        $scope.IsVisibleGrid = true;
        $scope.IsVisibleContenido = false;

        $scope.tituloSel = "";
        $scope.subtituloSel = "";
        $scope.descripcionSel = "";
        $scope.autorSel = "";
        $scope.imagenSel = "";
        $scope.fechaSel = "";
        $scope.nombre = "";
        $scope.correo = "";
        $scope.telefono = "";
        $scope.asunto = "";
        $scope.comentarios = "";
        $scope.encabezado1 = "";



        $scope.obtenerRegistros = function() {

            IndicadoresService.getDolarDet().then(function(exito) {
                $scope.dolarFixDet = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getCetes28().then(function(exito) {
                $scope.cetes28 = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });


            IndicadoresService.getTasaObjetivo().then(function(exito) {
                $scope.tasaObjetivo = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getDolar2Atras().then(
                function(exito) {
                    $scope.dolarAtras = exito.data.valor;


                },
                function(error) {
                    console.log("Error:", error);
                });


            IndicadoresService.getTIIE28().then(function(exito) {
                $scope.tiie28 = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getTIIE91().then(function(exito) {
                $scope.tiie91 = exito.data;
            }, function(error) {
                console.log("Error:", error);
            });

            IndicadoresService.getTodasLasNoticias().then(function(exito) {
                $scope.TodasNoticias = exito.data.records;

            }, function(error) {
                console.log("Error:", error);
            });
            IndicadoresService.getUltimasNoticias().then(function(exito) {
                $scope.UltimasNoticias = exito.data.records;
                $scope.encabezado1 = $scope.UltimasNoticias[0].titulo;
            }, function(error) {
                console.log("Error:", error);
            });
        }

        $scope.enviarcorreo = function() {
        }
        $scope.seccion = function(obj) {
            $scope.IsVisibleContenido = true;
            $scope.IsVisibleGrid = false;
            $scope.tituloSel = obj.titulo;
            $scope.subtituloSel = obj.subtitulo;
            $scope.descripcionSel = obj.descripcion;
            $scope.autorSel = obj.autor;
            $scope.imagenSel = obj.urlcompleta;
            $scope.fechaSel = obj.fecha;
        }
        $scope.cierra = function() {
            $scope.IsVisibleContenido = false;
            $scope.IsVisibleGrid = true;
        }
        $scope.obtenerRegistros();

        $scope.nube = function() {
            $window.open("indexApp.html", "_top");
        }


    }

})();