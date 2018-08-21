<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/TipoDocumento.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$tipo = new TipoDocumento($db);

// set ID property of record to read
$tipo->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of product to be edited
$tipo->readOne();

// create array
$tipo_arr = array(
	"id" =>  $tipo->id,
	"tipo_documento" => $tipo->tipo_documento,
);

// make it json format
print_r(json_encode($tipo_arr));
?>
