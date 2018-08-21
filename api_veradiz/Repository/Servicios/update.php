<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../../config/database.php';

// instantiate news object
include_once '../../objects/Servicios.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Servicios($db);

// get id of obj to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of obj to be edited
$obj->id = $data->id;
// set obj property values
$obj->servicio = $data->servicio;
$obj->descripcion = $data->descripcion;
$obj->imagen = $data->imagen;
$obj->ubicacion_imagen = $data->ubicacion_imagen;

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
