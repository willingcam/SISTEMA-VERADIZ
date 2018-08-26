<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/cetes.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$cetes = new Cetes($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$cetes->id = $data->id;

// set product property values
$cetes->dia = $data->name;
$cetes->mes = $data->price;
$cetes->anio = $data->description;
$cetes->valor = $data->valor;
$cetes->tipoIndicador = $data->tipoIndicador;
$cetes->tipoPeriodo = $data->tipoPeriodo;

// update the product
if($cetes->update()){
	echo '{';
		echo '"message": "Datos actualizados correctamente."';
	echo '}';
}

// if unable to update the product, tell the user
else{
	echo '{';
		echo '"message": "Se presento un problema al actualizar los datos solicitados."';
	echo '}';
}
?>
