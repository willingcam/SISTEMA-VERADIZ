<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/OtrasMonedas.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$objeto = new OtrasMonedas($db);

// query products
$stmt = $objeto->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

	// products array
	$objeto_arr=array();
	$objeto_arr["records"]=array();

	// retrieve our table contents
	// fetch() is faster than fetchAll()
	// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// extract row
		// this will make $row['name'] to
		// just $name only
		extract($row);

		$objeto_item=array(
			"id" => $id,
			"mes" => $mes,
			"anio" => $anio,
			"moneda" => $moneda,
			"cotizacion" => $cotizacion,
		);

		array_push($objeto_arr["records"], $objeto_item);
	}

	echo json_encode($objeto_arr);
}

else{
    echo json_encode(
		array("message" => "No hay información disponible.")
	);
}
?>
