<?php

$location = 'images/';
$filename = $_FILES['file']['name'];

if(!empty($_FILES['file'])){
        $ext = pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
        $image = time().'.'.$ext;
        move_uploaded_file($_FILES["file"]["tmp_name"], $location.$filename);



        echo "Archivo cargado exitosamente";
     
}else{
        echo "Invalid File or Empty File";
}


?>
