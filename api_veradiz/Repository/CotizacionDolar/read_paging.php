<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/core.php';
include_once '../../shared/utilities.php';
include_once '../../config/database.php';
include_once '../../objects/CotizacionDolar.php';

// utilities
$utilities = new Utilities();

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new CotizacionDolar($db);

// query products
$stmt = $obj->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

	// products array
	$obj_arr=array();
	$obj_arr["records"]=array();
	$obj_arr["paging"]=array();

	// retrieve our table contents
	// fetch() is faster than fetchAll()
	// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make $row['name'] to
		// just $name only
		extract($row);

		$obj_item=array(
			"id" => $id,
			"dia" => $dia,
			"mes" => $mes,
			"anio" => $anio,
			"valor" => $valor,
			"tipoIndicador" => $tipoPeriodo,
			"tipoPeriodo" => $tipoIndicador
		);

		array_push($obj_arr["records"], $obj_item);
	}


	// include paging
	$total_rows=$product->count();
	$page_url="{$home_url}product/read_paging.php?";
	$paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
	$obj_arr["paging"]=$paging;

	echo json_encode($obj_arr);
}

else{
    echo json_encode(
		array("message" => "No hay información disponible.")
	);
}
?>
