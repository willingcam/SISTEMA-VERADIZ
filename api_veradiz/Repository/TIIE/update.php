<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/TIIE.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$obj = new TIIE($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$obj->id = $data->id;

// set product property values
$obj->dia = $data->name;
$obj->mes = $data->price;
$obj->anio = $data->description;
$obj->valor = $data->valor;
$obj->tipoIndicador = $data->tipoIndicador;
$obj->tipoPeriodo = $data->tipoPeriodo;

// update the product
if($obj->update()){
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
