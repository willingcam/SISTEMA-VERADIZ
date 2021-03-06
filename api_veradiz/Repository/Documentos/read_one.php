<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Documentos.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Documentos($db);

// set ID property of record to read
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of obj to be edited
$obj->readOne();


// make it json format
print_r(json_encode($obj));
?>
