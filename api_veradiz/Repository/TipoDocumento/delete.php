<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object file
include_once '../../config/database.php';
include_once '../../objects/TipoDocumento.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$tipo = new TipoDocumento($db);

// get product id
$data = json_decode(file_get_contents("php://input"));

// set product id to be deleted
$tipo->id = $data->id;

// delete the product
if($tipo->delete()){
	echo '{';
		echo '"message": "Registro eliminado exitosamente."';
	echo '}';
}

// if unable to delete the product
else{
	echo '{';
		echo '"message": "No fue posible eliminar el registro seleccionado."';
	echo '}';
}
?>
