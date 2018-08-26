<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../../config/database.php';

// instantiate product object
include_once '../../objects/TipoPeriodo.php';

$database = new Database();
$db = $database->getConnection();

$tipo = new TipoPeriodo($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	isset($data->periodo) 
	
){

	// set product property values
	$tipo->periodo = $data->periodo;
	

	// create the product
	if($tipo->create()){
		echo '{';
			echo '"message": "Registro creado exitosamente."';
		echo '}';
	}

	// if unable to create the product, tell the user
	else{
		echo '{';
			echo '"message": "No fue posible agregar el nuevo registro."';
		echo '}';
	}
}
?>
