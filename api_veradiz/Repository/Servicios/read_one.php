<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// get database connection
include_once '../../config/database.php';

// instantiate news object
include_once '../../objects/Servicios.php';

$database = new Database();
$db = $database->getConnection();

// prepare product object
$obj = new Servicios($db);

// set ID property of record to read
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of product to be edited
$obj->readOne();

// make it json format
print_r(json_encode($obj));
?>
