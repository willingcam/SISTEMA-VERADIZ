<?php
// required headers


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../objects/cpp.php';

// instantiate database and database object
$database = new Database();
$db = $database->getConnection();


// initialize object
$obj = new cpp($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set obj property values

$obj->valor = $data->valor;
$obj->fecha = date("Y-m-d");
	

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






?>
