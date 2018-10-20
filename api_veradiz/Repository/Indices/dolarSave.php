<?php
// required headers


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../objects/Banxico.php';
include_once '../../config/database.php';
include_once '../../objects/Calendario.php';
include_once '../../objects/DFestivos.php';



// instantiate database and database object
$database = new Database();
$db = $database->getConnection();

// initialize object
$objCalendario = new Calendario($db);


$festivo =  new DFestivos($db);
$festivo->fecha = date("Y-m-d");
$festivo->readOne();


$diaActual =  date("Y-m-d");

$ESFESTIVO = 0;
if(strtotime($festivo->fecha) == strtotime($diaActual)) 
   $ESFESTIVO = 1;



$year = date("Y",strtotime($diaActual)); 
$month = date("m",strtotime($diaActual)); 
$day = date("d",strtotime($diaActual)); 

$newDateGet = strtotime($diaActual);      
$dayWeekGet =  date("w", $newDateGet);

$objCalendario->anio = $year;
$objCalendario->mes = $month;
$objCalendario->dia = $day;




// query products
$stmt = $objCalendario->readLastRecordsValid();;
$num = $stmt->rowCount();


$CONT = 0;
$PAGOS = "";

// check if more than 0 record found
if($num>0){

	
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		
		extract($row);
	 
		if($CONT == 1){
			$PAGOS =  $fix;
		}
	   		
        $CONT =$CONT  + 1;
	}
	
}



// initialize object
$objBanxico = new Banxico();

if($dayWeekGet == 0 || $dayWeekGet == 6 ||  $ESFESTIVO == 1){
	$objCalendario->anio = $year;
	$objCalendario->mes = $month;
	$objCalendario->dia = $day;
	$objCalendario->fix = "";
	$objCalendario->dof = "";
	$objCalendario->pago = $PAGOS;
	$objCalendario->update();

}else{
	$objCalendario->anio = $year;
	$objCalendario->mes = $month;
	$objCalendario->dia = $day;
	$objCalendario->fix =  $objBanxico->getExRateDet();
	$objCalendario->dof = "";
	$objCalendario->pago = $PAGOS;
    $objCalendario->update();


	$objCalendario->fecha = date("Y-m-d");
	$objCalendario->valor =  $objBanxico->getExRateDet();
	$objCalendario->obligaciones = $PAGOS;

	$objCalendario->registroDolar();

}
	

?>
