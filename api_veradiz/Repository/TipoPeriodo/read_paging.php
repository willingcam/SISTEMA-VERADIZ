<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/core.php';
include_once '../../shared/utilities.php';
include_once '../../config/database.php';
include_once '../../objects/TipoPeriodo.php';

// utilities
$utilities = new Utilities();

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tipo = new TipoPeriodo($db);

// query products
$stmt = $tipo->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

	// products array
	$tipo_arr=array();
	$tipo_arr["records"]=array();
	$tipo_arr["paging"]=array();

	// retrieve our table contents
	// fetch() is faster than fetchAll()
	// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make $row['name'] to
		// just $name only
		extract($row);

		$tipo_item=array(
			"id" => $id,
			"periodo" => $periodo
			
		);

		array_push($tipo_arr["records"], $tipo_item);
	}


	// include paging
	$total_rows=$tipo->count();
	$page_url="{$home_url}product/read_paging.php?";
	$paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
	$tipo_arr["paging"]=$paging;

	echo json_encode($tipo_arr);
}

else{
    echo json_encode(
		array("message" => "No hay registros disponibles.")
	);
}
?>
