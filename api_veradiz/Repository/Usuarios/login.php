<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Usuarios.php';

include_once '../../objects/Funciones.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$obj = new Usuarios($db);

// initialize object
$objFunciones = new Funciones($db);

// set ID property of record to read
$obj->usuario = isset($_GET['usuario']) ? $_GET['usuario'] : die();
$obj->claveacceso = isset($_GET['claveacceso']) ? $_GET['claveacceso'] : die();

// read the details of product to be edited



 $obj->login();

 if($obj->id == null){
    print_r(json_encode("null"));
 }else{
// make it json format



// set ID property of record to read
$objFunciones->rol = $obj->rolID;

$stmt = $objFunciones->read();
$num  = $stmt->rowCount();

	// functions array
$obj_arr=array();
$obj_arr["records"]=array();

// check if more than 0 record found
if($num>0){

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


}


if($num > 0){
 $datosUsuario = (object)['usuario' => $obj, 'funciones' => $obj_arr["records"] ];
 print_r(json_encode($datosUsuario));
}else{
  $datosUsuario = (object)['usuario' => $obj, 'funciones' => 'null' ];
  print_r(json_encode($datosUsuario));
}






   
 }









?>
