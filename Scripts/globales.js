//SERVIDOR
//var webAPIhost = "http://veradiz.com.mx/api_veradiz/";
//var webAPIhostToken = "http://veradiz.com.mx/token";


//var fichaPersonal = "Ficha curricular";


//LOCAL
var webAPIhost = "http://localhost/api_veradiz/";
var webAPIhostToken = "http://localhost.com.mx/token";

var fotoEmpleado = "api_veradiz/Repository/Upload/images/user.png";

/*IE nena*/
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

/**
 * Global webAPI
 * @author Adrian Cruz <adriancruz.k@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular) {
    var isDefined = angular.isDefined;

    angular
        .module('Globales', [])
        .provider('globalGet', function() {
            this.$get = ['$rootScope', '$window', '$document', '$parse', function($rootScope, $window, $document, $parse) {
                //var $window = $windowProvider.$get();        
                var webAPIhost = $window.webAPIhost;
                var webAPIhostToken = $window.webAPIhostToken;
                var self = this;
                var getFromLocalStorage = function(key) {
                    if (key === "api") {
                        return webAPIhost;
                    } else if (key === "token") {
                        return webAPIhostToken;
                    } else return "error in get global"
                };

                return {
                    get: getFromLocalStorage
                };
            }];
        })


})(window, window.angular);

function getRangoDeFechaDefault(addDias, addMes, addAnios) {
    if (addDias == undefined || addDias == null) {
        addDias = 0;
    }
    if (addMes == undefined || addMes == null) {
        addMes = 0;
    }
    if (addAnios == undefined || addAnios == null) {
        addAnios = 0;
    }
    var fechaActualD = new Date();
    var _minDate = new Date(1975, 10, 25);
    var _maxDate = new Date(fechaActualD.getFullYear() + addAnios, fechaActualD.getMonth() + addMes, fechaActualD.getDate() + addDias);
    var datePicker = { FechaOptions: { minDate: _minDate, maxDate: _maxDate, datepickerMode: 'year' } };
    return datePicker;
}

function setRangoDeFecha(diaInicio, mesInicio, anioInicio, diaFin, mesFin, anioFin) {
    if (diaFin == undefined || diaFin == null) {
        diaFin = 0;
    }
    if (mesFin == undefined || mesFin == null) {
        mesFin = 0;
    }
    if (anioFin == undefined || anioFin == null) {
        anioFin = 0;
    }
    if (diaInicio == undefined || diaInicio == null) {
        diaInicio = 0;
    }
    if (mesInicio == undefined || mesInicio == null) {
        mesInicio = 0;
    }
    if (anioInicio == undefined || anioInicio == null) {
        anioInicio = 0;
    }
    var fechaActualD = new Date();
    var _minDate = new Date(anioInicio, mesInicio, diaInicio);
    var _maxDate = new Date(fechaActualD.getFullYear() + anioFin, fechaActualD.getMonth() + mesFin, fechaActualD.getDate() + diaFin);
    var datePicker = { FechaOptions: { minDate: _minDate, maxDate: _maxDate, datepickerMode: 'year' } };
    return datePicker;
}

function RangoDeFechaStart(addDias, addMes, addAnios) {
    if (addDias == undefined || addDias == null) {
        addDias = 1;
    }
    if (addMes == undefined || addMes == null) {
        addMes = 0;
    }
    if (addAnios == undefined || addAnios == null) {
        addAnios = 2006;
    }
    var fechaActualD = new Date();
    var _minDate = new Date(addAnios, addMes, addDias);
    var _maxDate = new Date(fechaActualD.getFullYear(), fechaActualD.getMonth(), fechaActualD.getDate());
    var datePicker = { FechaOptions: { minDate: _minDate, maxDate: _maxDate } };
    return datePicker;
}

function plantillaTour() {
    return "<div class='popover tour'><div class='arrow' ></div ><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'> << </button><span data-role='separator'></span><button class='btn btn-default' data-role='next'> >> </button></div><button class='btn btn-default' data-role='end'>Finalizar</button></div > ";
};

function existeArchivo(listaArchivos, nuevoArchivo) {
    if (listaArchivos == undefined || listaArchivos == null || listaArchivos.length == 0) {
        return false;
    }
    for (var i = 0; i < listaArchivos.length; i++) {
        if (listaArchivos[i].nameFile == nuevoArchivo.nameFile) {
            toastr.error(nuevoArchivo.nameFile, "Documento duplicado");
            return true;
        }
    }
    return false;
}

function anioActual() {
    var fechaActualD = new Date();
    return fechaActualD.getFullYear();
}


var _idDatatbleTMP = null;

function privateResetDatatable(tablaId) {

    if ($.fn.DataTable.isDataTable("#" + tablaId + "")) {
        _idDatatbleTMP.destroy();
        //_idDatatbleTMP.empty();
        //alert(".destroy();");
    } else {
        //alert("foo");
    }
}

function removeAccents(data) {
    return data
        .replace(/έ/g, 'ε')
        .replace(/[ύϋΰ]/g, 'υ')
        .replace(/ό/g, 'ο')
        .replace(/ώ/g, 'ω')
        .replace(/ά/g, 'α')
        .replace(/[ίϊΐ]/g, 'ι')
        .replace(/ή/g, 'η')
        .replace(/\n/g, ' ')
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .replace(/ê/g, 'e')
        .replace(/î/g, 'i')
        .replace(/ô/g, 'o')
        .replace(/è/g, 'e')
        .replace(/ï/g, 'i')
        .replace(/ü/g, 'u')
        .replace(/ã/g, 'a')
        .replace(/õ/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/ì/g, 'i');
}