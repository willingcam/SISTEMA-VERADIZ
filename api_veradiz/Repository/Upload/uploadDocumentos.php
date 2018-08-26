<?php

$location = 'documentos/';
$filename = $_FILES['file']['name'];

if(!empty($_FILES['file'])){
        $ext = pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
        $newName = time().$filename;
        move_uploaded_file($_FILES["file"]["tmp_name"], $location.$newName);
        echo $newName;
     
}else{
        echo "Error en la carga del archivo";
}


?>
