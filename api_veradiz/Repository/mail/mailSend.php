<?php
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    require("../../../PHPMailer-6.0.5/src/PHPMailer.php");
    

    $from = "jltapia@ineel.mx";
    $to = "jwingram@gineel.mx";
    $subject = "Revisando PHP mail";
    $message = "PHP mail works just fine";
    $headers = "From:" . $from;
    mail($to,$subject,$message, $headers);
    echo "The email message was sent.";
?> 