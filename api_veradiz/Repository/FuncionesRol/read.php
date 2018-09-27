<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Funciones.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new Funciones($db);

// set ID property of record to read
$obj->rol = isset($_GET['rol']) ? $_GET['rol'] : die();

// query products
$stmt = $obj->read();
$num  = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

	// products array
	$obj_arr=array();
	$obj_arr["records"]=array();

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
			"rol" => $rol,
			"nombre" => $nombre,
			"url_referencia" => $url_referencia,
			"campo_state" => $campo_state
		);

		array_push($obj_arr["records"], $obj_item);
	}

	echo json_encode($obj_arr);
}

else{
    echo json_encode(
		array("message" => "No hay registros disponibles.")
	);
}
?>
