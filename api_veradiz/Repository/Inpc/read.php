<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../objects/Inpc.php';

// instantiate database and obj object
$database = new Database();
$db = $database->getConnection();

// initialize object
$obj = new Inpc($db);

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
		$nombremes = "";  
		
       if($mes == 1){
		$nombremes = "Enero";  
	   }

	   if($mes == 2){
		$nombremes = "Febrero";  
	   }

	   if($mes == 3){
		$nombremes = "Marzo";  
	   }


	   if($mes == 4){
		$nombremes = "Abril";  
	   }

	   if($mes == 5){
		$nombremes = "Mayo";  
	   }

	   if($mes == 6){
		$nombremes = "Junio";  
	   }

	   if($mes == 7){
		$nombremes = "Julio";  
	   }

	   if($mes == 8){
		$nombremes = "Agosto";  
	   }

       if($mes == 9){
		$nombremes = "Septiembre";  
	   }

	   if($mes == 10){
		$nombremes = "Octubre";  
	   }

	   if($mes == 11){
		$nombremes = "Noviembre";  
	   }

	   if($mes == 12){
		$nombremes = "Diciembre";  
	   }

		$obj_item=array(
			"id" => $id,
			"anio" => $anio,
			"mes" => $nombremes ,
			"valor" => $valor,
			"fecha" => $fecha
		);

		array_push($obj_arr["records"], $obj_item);
	}

	echo json_encode($obj_arr);
}

else{
    echo json_encode(
		array("message" => "No hay registros diponibles.")
	);
}
?>
