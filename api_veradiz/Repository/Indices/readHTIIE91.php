<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/TIIE91.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();



$obj = new TIIE91($db);


$fecha1 = isset($_GET['fechai']) ? $_GET['fechai'] : die();
$fecha2 = isset($_GET['fechat']) ? $_GET['fechat'] : die();

$time1 = strtotime($fecha1);
$time2 = strtotime($fecha2);

$obj->fechaInicio = date('Y-m-d',$time1);
$obj->fechaTermino =  date('Y-m-d',$time2);

// query products
$stmt = $obj->readPeriodo();
$num  = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

	// products array
	$tipo_arr=array();
	$tipo_arr["records"]=array();

	// retrieve our table contents
	// fetch() is faster than fetchAll()
	// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make $row['name'] to
		// just $name only
		extract($row);

		$tipo_item=array(
			"valor" => $valor,
			"fecha" => $fecha
		);

		array_push($tipo_arr["records"], $tipo_item);
	}

	echo json_encode($tipo_arr);
}

else{
    echo json_encode(
		array("message" => "No hay registros disponibles.")
	);
}
?>
