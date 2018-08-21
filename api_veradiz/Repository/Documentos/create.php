<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../../config/database.php';

// instantiate obj object
include_once '../../objects/Documentos.php';

$database = new Database();
$db = $database->getConnection();

$obj = new Documentos($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(	isset($data->descripcion) ){

	// set obj property values
	$obj->descripcion = $data->descripcion;
	$obj->archivo = $data->archivo;
	$obj->ubicacion = $data->ubicacion;

	$obj->clienteId = $data->clienteId;
	$obj->tipoAccesoId = $data->tipoAccesoId;
	$obj->tipoDocumentoId = $data->tipoDocumentoId;

	$obj->fechaRegistro = $data->fechaRegistro;
    $obj->autorId = $data->autorId;

	// create the obj
	if($obj->create()){
		echo '{';
			echo '"message": "El registro fue creado exitosamente."';
		echo '}';
	}

	// if unable to create the obj, tell the user
	else{
		echo '{';
			echo '"message": "Se presento un problema al registrar la información."';
		echo '}';
	}
}
?>
