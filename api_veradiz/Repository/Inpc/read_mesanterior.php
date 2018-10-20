<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Inpc.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare obj object
$obj = new Inpc($db);

// set ID property of record to read
$obj->anio = isset($_GET['anio']) ? $_GET['anio'] : die();
$obj->mes = isset($_GET['mes']) ? $_GET['mes'] : die();
// read the details of obj to be edited
$obj->readValorMesAnterior();

print_r(json_encode($obj));

?>
