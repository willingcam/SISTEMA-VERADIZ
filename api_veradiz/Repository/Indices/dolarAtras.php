<?php
// required headers

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Calendario.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new Calendario($db);


$fecha =  date("Y-m-d");

$year = date("Y",strtotime($fecha)); 
$month = date("m",strtotime($fecha)); 



// set ID property of record to read

$obj->mes = $month;
$obj->anio = $year;

// query products
$stmt = $obj->readOne();

// make it json format
print_r(json_encode($obj));



?>
