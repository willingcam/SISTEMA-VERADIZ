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

$database = new Database();
$db = $database->getConnection();

$obj = new Servicios($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	isset($data->servicio) &&
	isset($data->descripcion)
	
 ){

	// set obj property values
	$obj->servicio = $data->servicio;
	$obj->descripcion = $data->descripcion;
	$obj->imagen = $data->imagen;
	$obj->ubicacion_imagen = $data->ubicacion_imagen;
	$obj->activo = $data->activo;
	

	// create the obj
	if($obj->create()){
		echo '{';
			echo '"message": "El registro fue creado exitosamente."';
		echo '}';
	}

	// if unable to create the obj, tell the user
	else{
		echo '{';
			echo '"message": "Se presento un problema al registrar la informacion."';
		echo '}';
	}

}
?>
