<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/Clientes.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Clientes($db);

// set ID property of record to read
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of obj to be edited
$obj->readOne();

// create array
$obj_arr = array(
			"id" => $id,
			"cliente" => $cliente,
			"descripcion" => $descripcion,
			"servicios_contratados" => $servicios_contratados,
			"nombre_contacto" => $nombre_contacto,
			"correo" => $correo,
			"telefono" => $telefono,
			"extension" => $extension,
			"celular" => $celular,
			"imagen" => $imagen,
			"ubicacion_imagen" => $ubicacion_imagen

);

// make it json format
print_r(json_encode($obj_arr));
?>
