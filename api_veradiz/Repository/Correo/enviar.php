<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// get posted data
$data = json_decode(file_get_contents("php://input"));


// make sure data is not empty
//if(
//	isset($data->nombre) &&
//	isset($data->correo) &&
//	isset($data->telefono) &&
//	isset($data->asunto) &&
//	isset($data->comentarios) 
// ){

	// set obj property values
//	$nombre = $data->nombre;
//	$correo = $data->correo;
//	$telefono = $data->telefono;
//	$asunto = $data->asunto;
//	$comentarios = $data->comentarios;
	
	$to = "jingramramirez@gmail.com";
	$subject = "subject";
	$message = "comentarios";
	

	$header = "MIME-Version: 1.0" . "\r\n";
	$header .= "Content-type:text/html;charset=utf-8" . "\r\n";
	$header .= "From: mail@mail.com" . "\r\n";

	$retval = mail($to,$subject,$message,$header);


	if($retval){
		echo '{';
			echo '"message": "El mensaje fue enviado exitosamente."';
		echo '}';
	}else{
		echo '{';
			echo '"message": "Su mensaje no pudo ser enviado."';
		echo '}';
	}

//}
?>
