<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/TipoArea.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$tipo = new TipoArea($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$tipo->id = $data->id;

// set product property values
$tipo->area = $data->area;

// update the product
if($tipo->update()){
	echo '{';
		echo '"message": "Registro actualizado exitosamente."';
	echo '}';
}

// if unable to update the product, tell the user
else{
	echo '{';
		echo '"message": "Se presento un problema al actualizar el registro solicitado."';
	echo '}';
}
?>
