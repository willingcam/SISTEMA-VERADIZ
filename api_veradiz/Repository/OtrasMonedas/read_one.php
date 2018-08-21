<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/OtrasMonedas.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$objeto = new OtrasMonedas($db);

// set ID property of record to read
$objeto->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of product to be edited
$objeto->readOne();

// create array
$objeto_arr = array(
	"id" =>  $product->id,
	"mes" => $product->mes,
	"anio" => $product->anio,
	"moneda" => $product->moneda,
	"cotizacion" => $product->cotizacion,
	

);

// make it json format
print_r(json_encode($objeto_arr));
?>
