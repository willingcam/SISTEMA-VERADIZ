<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Documentos.php';

// instantiate database and obj object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new Documentos($db);

$obj->id = isset($_GET['id']) ? $_GET['id'] : die();

// query products
$stmt = $obj->read_client_docs_total_news();
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
			"idTipoDocumento" => $id,
			"descripcion" => $tipo_documento,
			"total" => $contadorExiste,
			"nuevos" => $contadorNuevos
			
		);

		array_push($obj_arr["records"], $obj_item);
	}

	echo json_encode($obj_arr);
}

else{
    echo json_encode(
		array("message" => "No hay registros diponibles.")
	);
}
?>