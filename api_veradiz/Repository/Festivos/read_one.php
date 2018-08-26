<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/DFestivos.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$obj = new DFestivos($db);

// set ID property of record to read
$obj->fecha = isset($_GET['fecha']) ? $_GET['fecha'] : die();

// read the details of product to be edited
$obj->readOne();

// make it json format
print_r(json_encode($obj));
?>
