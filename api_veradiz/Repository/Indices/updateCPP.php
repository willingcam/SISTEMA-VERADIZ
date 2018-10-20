<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/cpp.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new cpp($db);

// get id of obj to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of obj to be edited
$obj->id = $data->id;
$obj->valor = $data->valor;


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
