<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../../config/database.php';

// instantiate obj object
include_once '../../objects/INFLACIONACUMULADA.php';

$database = new Database();
$db = $database->getConnection();

$obj = new INFLACIONACUMULADA($db);

// get posted data
$obj->anio = isset($_GET['anio']) ? $_GET['anio'] : die();
$obj->mes = isset($_GET['mes']) ? $_GET['mes'] : die();
	
$obj->imensual= isset($_GET['mensual']) ? $_GET['mensual'] : die();
$obj->acumuladaa=isset($_GET['acumulada']) ? $_GET['acumulada'] : die();
$obj->inflaciona=isset($_GET['anterior']) ? $_GET['anterior'] : die();


$obj->readOne();


if($obj->update()){
		echo '{';
			echo '"message": "El registro fue actualizado exitosamente."';
		echo '}';
}else{
		echo '{';
			echo '"message": "Se presento un problema al actualizar la informacion."';
		echo '}';
}




?>
