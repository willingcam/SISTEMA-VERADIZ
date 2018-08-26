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
include_once '../../objects/OtrasMonedas.php';

$database = new Database();
$db = $database->getConnection();

$objeto = new OtrasMonedas($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	
	isset($data->mes) &&
	isset($data->anio) &&
	isset($data->moneda) &&
	isset($data->cotizacion) 
	
){

	// set product property values
	$objeto->mes = $data->mes;
	$objeto->anio = $data->anio;
	$objeto->moneda = $data->moneda;
	$objeto->cotizacion = $data->cotizacion;
	
	// create the product
	if($objeto->create()){
		echo '{';
			echo '"message": "Información registrada exitosamente."';
		echo '}';
	}

	// if unable to create the product, tell the user
	else{
		echo '{';
			echo '"message": "Se presento un problema al guardar la informacion solicitada."';
		echo '}';
	}
}
?>
