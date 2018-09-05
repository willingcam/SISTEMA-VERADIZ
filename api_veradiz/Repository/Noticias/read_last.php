<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// get database connection
include_once '../../config/database.php';

// instantiate news object
include_once '../../objects/Noticias.php';

// instantiate database and obj object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new Noticias($db);

// query products
$stmt = $obj->read_last();
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
			"titulo" => $titulo,
			"subtitulo" => $subtitulo,
			"descripcion" => $descripcion,
			"url_referencia" => $url_referencia,
			"fecha" =>   date("d/m/Y", strtotime($fecha)),
			"imagen" => $imagen,
			"ubicacion" => $ubicacion_imagen,
			"urlcompleta" => $ubicacion_imagen.$imagen,
			"autor" => $nombre
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
