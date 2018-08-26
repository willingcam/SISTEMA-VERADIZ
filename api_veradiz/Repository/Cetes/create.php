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
include_once '../../objects/cetes.php';

$database = new Database();
$db = $database->getConnection();

$cetes = new Cetes($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	isset($data->dia) &&
	isset($data->mes) &&
	isset($data->anio) &&
	isset($data->valor) &&
	isset($data->tipoIndicador) &&
	isset($data->tipoPeriodo) 
){

	// set product property values
	$cetes->dia = $data->dia;
	$cetes->mes = $data->mes;
	$cetes->anio = $data->anio;
	$cetes->valor = $data->valor;
	$cetes->tipoIndicador = $data->tipoIndicador;
	$cetes->tipoPeriodo = $data->tipoPeriodo;
	
	

	// create the product
	if($cetes->create()){
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
