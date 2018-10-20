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
$data = json_decode(file_get_contents("php://input"));


// set obj property values
$obj->$imensual   = $data->imensual;
$obj->$acumuladaa = $data->acumuladaa;
$obj->$inflaciona = $data->inflaciona;
$obj->$fecha      =  date("Y-m-d");;


// create the obj
if($obj->create()){
	echo '{';
		echo '"message": "El registro fue creado exitosamente."';
	echo '}';
}else{
	echo '{';
		echo '"message": "Se presento un problema al registrar la informacion."';
	echo '}';
}

?>
