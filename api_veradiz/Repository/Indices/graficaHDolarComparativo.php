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

$tipo_arr=array();
$tipo_arr["fechas"]=array();
$tipo_arr["valores1"]=array();
$tipo_arr["valores2"]=array();
$tipo_arr["valores3"]=array();

$num1 = 0;
$num2 = 0;
$num3 = 0;

$fechaInicioC1 = isset($_GET['fechaiC1']) ? $_GET['fechaiC1'] : die();
$fechaTerminoC1 = isset($_GET['fechatC1']) ? $_GET['fechatC1'] : die();

if($fechaInicioC1 != "" && $fechaTerminoC1 != ""){
	$timeInicioC1 = strtotime($fechaInicioC1);
	$timeTerminoC1 = strtotime($fechaTerminoC1);

	$obj->fechaInicio = date('Y-m-d',$timeInicioC1);
    $obj->fechaTermino =  date('Y-m-d',$timeTerminoC1);

	$stmt = $obj->graficaPeriodoDolar();
	$num1  = $stmt->rowCount();
	
	if($num1 > 0){
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);		
			array_push($tipo_arr["fechas"],date("d/m/Y", strtotime($fecha)));
			array_push($tipo_arr["valores1"], $valor);
		}	
	}
}



$fechaInicioC2 = isset($_GET['fechaiC2']) ? $_GET['fechaiC2'] : die();
$fechaTerminoC2 = isset($_GET['fechatC2']) ? $_GET['fechatC2'] : die();

if($fechaInicioC2 != "" && $fechaTerminoC2 != ""){
	$timeInicioC2 = strtotime($fechaInicioC2);
	$timeTerminoC2 = strtotime($fechaTerminoC2);

	$obj->fechaInicio = date('Y-m-d',$timeInicioC2);
    $obj->fechaTermino =  date('Y-m-d',$timeTerminoC2);

	$stmt = $obj->graficaPeriodoDolar();
	$num2  = $stmt->rowCount();
	
	if($num2 > 0){
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);		
			array_push($tipo_arr["valores2"], $valor);
		}	
	}
}


$fechaInicioC3 = isset($_GET['fechaiC3']) ? $_GET['fechaiC3'] : die();
$fechaTerminoC3 = isset($_GET['fechatC3']) ? $_GET['fechatC3'] : die();

if($fechaInicioC3 != "" && $fechaTerminoC3 != ""){
	$timeInicioC3 = strtotime($fechaInicioC3);
	$timeTerminoC3 = strtotime($fechaTerminoC3);

	$obj->fechaInicio = date('Y-m-d',$timeInicioC3);
    $obj->fechaTermino =  date('Y-m-d',$timeTerminoC3);

	$stmt = $obj->graficaPeriodoDolar();
	$num3  = $stmt->rowCount();
	
	if($num3 > 0){
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);		
			array_push($tipo_arr["valores3"], $valor);
		}	
	}
}



if($num1 > 0 && $num2 > 0){

	$datosUsuario = (object)['fechas' =>$tipo_arr["fechas"], 'valores1' => $tipo_arr["valores1"], 'valores2' => $tipo_arr["valores2"]];
	echo json_encode($tipo_arr);

}else{

	if($num1 > 0 && $num2 > 0 && $num3 > 0){
		$datosUsuario = (object)['fechas' =>$tipo_arr["fechas"], 'valores1' => $tipo_arr["valores1"], 'valores2' => $tipo_arr["valores2"], 'valores3' => $tipo_arr["valores3"]];
		echo json_encode($tipo_arr);
	}else{
		echo json_encode(
			array("message" => "No hay información disponible.")
		);
	}
}

echo "hola";


?>
