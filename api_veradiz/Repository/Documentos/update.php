<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Documentos.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Documentos($db);

// get id of obj to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of obj to be edited
$obj->id = $data->id;

// set obj property values

$obj->descripcion = $data->descripcion;
$obj->archivo = $data->archivo;
$obj->ubicacion = $data->ubicacion;
$obj->tipoAccesoId = $data->tipoAccesoId;
$obj->clienteId = $data->clienteId;
$obj->tipoDocumentoId = $data->tipoDocumentoId;

$obj->fechaRegistro = $data->fechaRegistro;
$obj->autorId = $data->autorId;

// update the obj
if($obj->update()){
	echo '{';
		echo '"message": "El registro fue actualizado exitosamente."';
	echo '}';
}

// if unable to update the obj, tell the user
else{
	echo '{';
		echo '"message": "Fallo la actualización del registro."';
	echo '}';
}
?>
