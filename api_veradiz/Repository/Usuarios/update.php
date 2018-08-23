<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Usuarios.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Usuarios($db);

// get id of obj to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of obj to be edited
$obj->id = $data->id;

// set obj property values
$obj->nombre = $data->nombre;
$obj->correo = $data->correo;
$obj->puesto = $data->puesto;
$obj->telefono = $data->telefono;
$obj->extension = $data->extension;
$obj->celular = $data->celular;
$obj->imagen = $data->imagen;
$obj->rolID = $data->rolID;
$obj->rol = $data->rol;



// update the obj
if($obj->update()){
	echo '{';
		echo '"message": "obj was updated."';
	echo '}';
}

// if unable to update the obj, tell the user
else{
	echo '{';
		echo '"message": "Unable to update obj."';
	echo '}';
}

?>