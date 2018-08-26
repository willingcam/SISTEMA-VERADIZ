<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object file
include_once '../config/database.php';
include_once '../objects/Cetes.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$cetes = new Cetes($db);

// get product id
$data = json_decode(file_get_contents("php://input"));

// set product id to be deleted
$cetes->id = $data->id;

// delete the product
if($cetes->delete()){
	echo '{';
		echo '"message": "El registro fue eliminado exitosamente."';
	echo '}';
}

// if unable to delete the product
else{
	echo '{';
		echo '"message": "No se pudo eliminar el registro solicitado."';
	echo '}';
}
?>
