<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
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

$obj->activo = $data->activo;


// update the obj
if($obj->desactiva()){
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
