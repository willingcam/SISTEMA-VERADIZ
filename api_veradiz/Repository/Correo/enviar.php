<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate obj object
include_once '../objects/Clientes.php';

$database = new Database();
$db = $database->getConnection();

$obj = new Clientes($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	isset($data->cliente) &&
	isset($data->descripcion) &&
	isset($data->servicios_contratados) &&
	isset($data->nombre_contacto) &&
	isset($data->correo) &&
	isset($data->telefono) &&
	isset($data->extension) &&
	isset($data->celular) &&
	isset($data->imagen) &&
	isset($data->ubicacion_imagen)
 ){

	// set obj property values
	$obj->cliente = $data->cliente;
	$obj->descripcion = $data->descripcion;
	$obj->servicios_contratados = $data->servicios_contratados;
	$obj->nombre_contacto = $data->nombre_contacto;
	$obj->correo = $data->correo;
	$obj->telefono = $data->telefono;
    $obj->extension = $data->extension;
	$obj->celular = $data->celular;
	$obj->imagen = $data->imagen;
	$obj->ubicacion_imagen = $data->ubicacion_imagen;

	
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
