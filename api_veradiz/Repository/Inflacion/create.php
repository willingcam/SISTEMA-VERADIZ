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
include_once '../../objects/Inflacion.php';

$database = new Database();
$db = $database->getConnection();

$obj = new Inflacion($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(
	isset($data->anio) &&
	isset($data->mes) &&
	isset($data->valor) &&
	isset($data->porcen_mensual) &&
	isset($data->porcen_acumulada) &&
	isset($data->porcen_acumvsanioanterior)

	
)
{

	// set obj property values

	$obj->anio = $data->anio;
	$obj->mes = $data->mes;
	$obj->valor = $data->valor;
	$obj->porcen_mensual = $data->porcen_mensual;
	$obj->porcen_acumulada = $data->porcen_acumulada;
	$obj->porcen_acumvsanioanterior = $data->porcen_acumvsanioanterior;

	// create the obj
	if($obj->create()){
		echo '{';
			echo '"message": "El registro fue creado exitosamente."';
		echo '}';
	}

	// if unable to create the obj, tell the user
	else{
		echo '{';
			echo '"message": "Se presento un problema al registrar la informacion."';
		echo '}';
	}
}
?>
