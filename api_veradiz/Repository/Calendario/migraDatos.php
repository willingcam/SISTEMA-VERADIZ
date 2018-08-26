<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/DolarTemp.php';
include_once '../../objects/Calendario.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new DolarTemp($db);
$calendario = new Calendario($db);

// query products
$stmt = $obj->read();
$num = $stmt->rowCount();

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

		
        if($fecha != "0000-00-00") { 
			
			 $year = date("Y",strtotime($fecha)); 
			 $month = date("m",strtotime($fecha)); 
			 $day = date("d",strtotime($fecha)); 
		  
			 $calendario->anio = $year;
			 $calendario->mes = $month;
			 $calendario->dia = $day;

			 if($fix == "N/E"){
				$calendario->fix = "";
				$calendario->dof = "";
			 }else{
				$calendario->fix = $fix;
				$calendario->dof = $dof;
			 }

			 $calendario->pago = $pagos;
			
			 $calendario->update();
			 
		}
	}

	
}


?>
