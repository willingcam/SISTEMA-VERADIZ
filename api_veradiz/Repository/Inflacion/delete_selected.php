<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object file
include_once '../../config/database.php';
include_once '../../objects/Inflacion.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Inflacion($db);

$data = json_decode(file_get_contents("php://input"));

// delete the obj
if($obj->deleteSelected($data->ids)){
	// records were deleted
	echo '{';
		echo '"message": "Registro eliminado."';
	echo '}';
}

// if unable to delete the obj
else{
	echo '{';
		echo '"message": "No se pudo eliminar el registro."';
	echo '}';
}
?>
