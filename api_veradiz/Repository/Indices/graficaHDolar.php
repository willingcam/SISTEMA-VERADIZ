<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Calendario.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();


$obj = new Calendario($db);


$fecha1 = isset($_GET['fechai']) ? $_GET['fechai'] : die();
$fecha2 = isset($_GET['fechat']) ? $_GET['fechat'] : die();

$time1 = strtotime($fecha1);
$time2 = strtotime($fecha2);

$obj->fechaInicio = date('Y-m-d',$time1);
$obj->fechaTermino =  date('Y-m-d',$time2);

// query products
$stmt = $obj->graficaPeriodoDolar();
$num  = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

	// products array
	$tipo_arr=array();
	$tipo_arr["fechas"]=array();
	$tipo_arr["valores"]=array();


	// retrieve our table contents
	// fetch() is faster than fetchAll()
	// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make $row['name'] to
		// just $name only
		extract($row);
	
		array_push($tipo_arr["fechas"],date("d/m/Y", strtotime($fecha)));
		array_push($tipo_arr["valores"], $valor);
	}

	$datosUsuario = (object)['fechas' =>$tipo_arr["fechas"], 'valores' => $tipo_arr["valores"]];
	echo json_encode($tipo_arr);
}
else{
    echo json_encode(
		array("message" => "No hay registros disponibles.")
	);
}

?>
