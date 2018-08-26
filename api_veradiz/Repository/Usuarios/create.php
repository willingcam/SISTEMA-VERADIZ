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
include_once '../../objects/Usuarios.php';

$database = new Database();
$db = $database->getConnection();

$obj = new Usuarios($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	isset($data->nombre) &&
	isset($data->correo) &&
	isset($data->usuario) &&
	isset($data->claveacceso) 
 ){

	// set obj property values
	$obj->nombre = $data->nombre;
	$obj->correo = $data->correo;
	$obj->usuario = $data->usuario;
	$obj->claveacceso = $data->claveacceso;
	$obj->telefono = $data->telefono;
	$obj->celular = $data->celular;
	$obj->extension = $data->extension;

	$obj->puesto = $data->puesto;
	$obj->imagen = $data->imagen;
	$obj->ubicacion_imagen = $data->ubicacion_imagen;
	$obj->activo = $data->activo;
	$obj->tipoUsuarioId = $data->tipoUsuarioId;
	$obj->rolID = $data->rolID;
	$obj->rol = $data->rol;
	$obj->contacto = $data->contacto;

	
	

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
