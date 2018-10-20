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
	

$destinatario = "jwramz@hotmail.com"; 
$asunto = "Este mensaje es de prueba"; 
$cuerpo = ' 
<html> 
<head> 
   <title>Prueba de correo</title> 
</head> 
<body> 
<h1>Hola amigos!</h1> 
<p> 
<b>Bienvenidos a mi correo electrónico de prueba</b>. Estoy encantado de tener tantos lectores. Este cuerpo del mensaje es del artículo de envío de mails por PHP. Habría que cambiarlo para poner tu propio cuerpo. Por cierto, cambia también las cabeceras del mensaje. 
</p> 
</body> 
</html> 
'; 

//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
$headers .= "From: Miguel Angel Alvarez <jwramz@hotmail.com>\r\n"; 

//dirección de respuesta, si queremos que sea distinta que la del remitente 
$headers .= "Reply-To: jingramramirez@gmail.com\r\n"; 

//ruta del mensaje desde origen a destino 
$headers .= "Return-path: jwramz@hotmail.com\r\n"; 



mail($destinatario,$asunto,$cuerpo,$headers) 
?>


