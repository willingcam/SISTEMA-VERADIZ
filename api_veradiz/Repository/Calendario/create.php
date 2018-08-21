<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../../config/database.php';

// instantiate product object
include_once '../../objects/Calendario.php';
include_once '../../objects/DFestivos.php';

$database = new Database();
$db = $database->getConnection();

$obj = new Calendario($db);
$festivo =  new DFestivos($db);


//OBTENEMOS EL AÑO ACTUAL
$fechaReg =  date("Y");

// ASIGNAMOS EL AÑO 
$obj->anio = $fechaReg;

$stmt = $obj->read_year();
$num = $stmt->rowCount();

$bisiesto = "";



 if($num == 0){
    
    // ENERO 31 
    for ($x = 1; $x <= 31; $x++) {
       
        $obj->anio = $fechaReg;
        $obj->mes =  1;
        $obj->dia = $x;
        $obj->fix = "";
        $obj->dof = "";
        $obj->pago = "";
        $obj->bitacora = "SIST";
        $obj->creado =  date("Y-m-d");
       
        $newdate = $fechaReg."-01-".$x;
        $newDateGet = strtotime($newdate);
        
        $dayWeekGet =  date("w", $newDateGet);
        
        $obj->habil = 1;

        if($dayWeekGet == 0){ 
           $obj->habil = 0;
        }
           
        if($dayWeekGet == 6 ){ 
            $obj->habil = 0;
         }


         $festivo->fecha = date("Y-m-d", $newDateGet);
         $festivo->readOne();
         
         $calculatedDate = date("Y-m-d", $newDateGet);
        
         if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
              $obj->habil = 0;
       
         $obj->create();
    }

    
        // FEBRERO 
        for ($x = 1; $x <= 28; $x++) {
       
            $obj->anio = $fechaReg;
            $obj->mes =  2;
            $obj->dia = $x;
           
            $obj->fix = "";
            $obj->dof = "";
            $obj->pago = "";
            $obj->bitacora = "SIST";
            $obj->creado =  date("Y-m-d");

            $newdate = $fechaReg."-02-".$x;
            $newDateGet = strtotime($newdate);
            
            $dayWeekGet =  date("w", $newDateGet);
            
            $obj->habil = 1;
    
            if($dayWeekGet == 0){ 
               $obj->habil = 0;
            }
               
            if($dayWeekGet == 6 ){ 
                $obj->habil = 0;
             }
    
    
             $festivo->fecha = date("Y-m-d", $newDateGet);
             $festivo->readOne();

             //echo $festivo->fecha;
             //echo "\n";
             
             $calculatedDate = date("Y-m-d", $newDateGet);
            
             if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                  $obj->habil = 0;

            //echo $obj->habil;
            //echo "\n";
            $obj->create();
        }

         // MARZO 
         for ($x = 1; $x <= 31; $x++) {
       
            $obj->anio = $fechaReg;
            $obj->mes =  3;
            $obj->dia = $x;
           
            $obj->fix = "";
            $obj->dof = "";
            $obj->pago = "";
            $obj->bitacora = "SIST";
            $obj->creado =  date("Y-m-d");

            $newdate = $fechaReg."-03-".$x;
            $newDateGet = strtotime($newdate);
            
            $dayWeekGet =  date("w", $newDateGet);
            
            $obj->habil = 1;
    
            if($dayWeekGet == 0){ 
               $obj->habil = 0;
            }
               
            if($dayWeekGet == 6 ){ 
                $obj->habil = 0;
             }
    
    
             $festivo->fecha = date("Y-m-d", $newDateGet);
             $festivo->readOne();

             //echo $festivo->fecha;
             //echo "\n";
             
             $calculatedDate = date("Y-m-d", $newDateGet);
            
             if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                  $obj->habil = 0;
        
            $obj->create();
            //echo $obj->habil;
            //echo "\n";
        }     
        

         // ABRIL 
        for ($x = 1; $x <= 30; $x++) {
       
            $obj->anio = $fechaReg;
            $obj->mes =  4;
            $obj->dia = $x;
           
            $obj->fix = "";
            $obj->dof = "";
            $obj->pago = "";
            $obj->bitacora = "SIST";
            $obj->creado =  date("Y-m-d");

            $newdate = $fechaReg."-04-".$x;
            $newDateGet = strtotime($newdate);
            
            $dayWeekGet =  date("w", $newDateGet);
            
            $obj->habil = 1;
    
            if($dayWeekGet == 0){ 
               $obj->habil = 0;
            }
               
            if($dayWeekGet == 6 ){ 
                $obj->habil = 0;
             }
    
    
             $festivo->fecha = date("Y-m-d", $newDateGet);
             $festivo->readOne();
             
             $calculatedDate = date("Y-m-d", $newDateGet);
            
             if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                  $obj->habil = 0;

            $obj->create();
        }  
        
               // MAYO 
        for ($x = 1; $x <= 31; $x++) {
       
                $obj->anio = $fechaReg;
                $obj->mes =  5;
                $obj->dia = $x;
              
                $obj->fix = "";
                $obj->dof = "";
                $obj->pago = "";
                $obj->bitacora = "SIST";
                $obj->creado =  date("Y-m-d");

                $newdate = $fechaReg."-05-".$x;
                $newDateGet = strtotime($newdate);
                
                $dayWeekGet =  date("w", $newDateGet);
                
                $obj->habil = 1;
        
                if($dayWeekGet == 0){ 
                   $obj->habil = 0;
                }
                   
                if($dayWeekGet == 6 ){ 
                    $obj->habil = 0;
                 }
        
        
                 $festivo->fecha = date("Y-m-d", $newDateGet);
                 $festivo->readOne();
                 
                 $calculatedDate = date("Y-m-d", $newDateGet);
                
                 if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                      $obj->habil = 0;

                $obj->create();
        }    

        // JUNO 
        for ($x = 1; $x <= 30; $x++) {
       
                        $obj->anio = $fechaReg;
                        $obj->mes =  6;
                        $obj->dia = $x;
                       
                        $obj->fix = "";
                        $obj->dof = "";
                        $obj->pago = "";
                        $obj->bitacora = "SIST";
                        $obj->creado =  date("Y-m-d");

                        $newdate = $fechaReg."-06-".$x;
                        $newDateGet = strtotime($newdate);
                        
                        $dayWeekGet =  date("w", $newDateGet);
                        
                        $obj->habil = 1;
                
                        if($dayWeekGet == 0){ 
                           $obj->habil = 0;
                        }
                           
                        if($dayWeekGet == 6 ){ 
                            $obj->habil = 0;
                         }
                
                
                         $festivo->fecha = date("Y-m-d", $newDateGet);
                         $festivo->readOne();
                         
                         $calculatedDate = date("Y-m-d", $newDateGet);
                        
                         if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                              $obj->habil = 0;
                        $obj->create();
        }  


        // JULIO 
        for ($x = 1; $x <= 31; $x++) {
       
                        $obj->anio = $fechaReg;
                        $obj->mes =  7;
                        $obj->dia = $x;
                       
                        $obj->fix = "";
                        $obj->dof = "";
                        $obj->pago = "";
                        $obj->bitacora = "SIST";
                        $obj->creado =  date("Y-m-d");

                        $newdate = $fechaReg."-07-".$x;
                        $newDateGet = strtotime($newdate);
                        
                        $dayWeekGet =  date("w", $newDateGet);
                        
                        $obj->habil = 1;
                
                        if($dayWeekGet == 0){ 
                           $obj->habil = 0;
                        }
                           
                        if($dayWeekGet == 6 ){ 
                            $obj->habil = 0;
                         }
                
                
                         $festivo->fecha = date("Y-m-d", $newDateGet);
                         $festivo->readOne();
                         
                         $calculatedDate = date("Y-m-d", $newDateGet);
                        
                         if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                              $obj->habil = 0;

                        $obj->create();
        } 



        // AGOSTO 
        for ($x = 1; $x <= 31; $x++) {
       
                        $obj->anio = $fechaReg;
                        $obj->mes =  8;
                        $obj->dia = $x;
                       
                        $obj->fix = "";
                        $obj->dof = "";
                        $obj->pago = "";
                        $obj->bitacora = "SIST";
                        $obj->creado =  date("Y-m-d");

                        $newdate = $fechaReg."-08-".$x;
                        $newDateGet = strtotime($newdate);
                        
                        $dayWeekGet =  date("w", $newDateGet);
                        
                        $obj->habil = 1;
                
                        if($dayWeekGet == 0){ 
                           $obj->habil = 0;
                        }
                           
                        if($dayWeekGet == 6 ){ 
                            $obj->habil = 0;
                         }
                
                
                         $festivo->fecha = date("Y-m-d", $newDateGet);
                         $festivo->readOne();
                         
                         $calculatedDate = date("Y-m-d", $newDateGet);
                        
                         if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                              $obj->habil = 0;

                        $obj->create();
        } 


        // SEPTIEMBRE 
        for ($x = 1; $x <= 30; $x++) {
       
                        $obj->anio = $fechaReg;
                        $obj->mes =  9;
                        $obj->dia = $x;
                       
                        $obj->fix = "";
                        $obj->dof = "";
                        $obj->pago = "";
                        $obj->bitacora = "SIST";
                        $obj->creado =  date("Y-m-d");

                        $newdate = $fechaReg."-09-".$x;
                        $newDateGet = strtotime($newdate);
                        
                        $dayWeekGet =  date("w", $newDateGet);
                        
                        $obj->habil = 1;
                
                        if($dayWeekGet == 0){ 
                           $obj->habil = 0;
                        }
                           
                        if($dayWeekGet == 6 ){ 
                            $obj->habil = 0;
                         }
                
                
                         $festivo->fecha = date("Y-m-d", $newDateGet);
                         $festivo->readOne();
                         
                         $calculatedDate = date("Y-m-d", $newDateGet);
                        
                         if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                              $obj->habil = 0;

                        $obj->create();
        } 

         // OCTUBRE 
         for ($x = 1; $x <= 31; $x++) {
       
            $obj->anio = $fechaReg;
            $obj->mes =  10;
            $obj->dia = $x;
           
            $obj->fix = "";
            $obj->dof = "";
            $obj->pago = "";
            $obj->bitacora = "SIST";
            $obj->creado =  date("Y-m-d");

            $newdate = $fechaReg."-10-".$x;
            $newDateGet = strtotime($newdate);
            
            $dayWeekGet =  date("w", $newDateGet);
            
            $obj->habil = 1;
    
            if($dayWeekGet == 0){ 
               $obj->habil = 0;
            }
               
            if($dayWeekGet == 6 ){ 
                $obj->habil = 0;
             }
    
    
             $festivo->fecha = date("Y-m-d", $newDateGet);
             $festivo->readOne();
             
             $calculatedDate = date("Y-m-d", $newDateGet);
            
             if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                  $obj->habil = 0;

            $obj->create();
       }  
       
                // NOVIEMBRE 
                for ($x = 1; $x <= 30; $x++) {
       
                    $obj->anio = $fechaReg;
                    $obj->mes =  11;
                    $obj->dia = $x;
                   
                    $obj->fix = "";
                    $obj->dof = "";
                    $obj->pago = "";
                    $obj->bitacora = "SIST";
                    $obj->creado =  date("Y-m-d");

                    $newdate = $fechaReg."-11-".$x;
                    $newDateGet = strtotime($newdate);
                    
                    $dayWeekGet =  date("w", $newDateGet);
                    
                    $obj->habil = 1;
            
                    if($dayWeekGet == 0){ 
                       $obj->habil = 0;
                    }
                       
                    if($dayWeekGet == 6 ){ 
                        $obj->habil = 0;
                     }
            
            
                     $festivo->fecha = date("Y-m-d", $newDateGet);
                     $festivo->readOne();
                     
                     $calculatedDate = date("Y-m-d", $newDateGet);
                    
                     if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                          $obj->habil = 0;

                  $obj->create();
               } 

                  // DICIEMBRE 
                  for ($x = 1; $x <= 31; $x++) {
       
                    $obj->anio = $fechaReg;
                    $obj->mes =  12;
                    $obj->dia = $x;
                   
                    $obj->fix = "";
                    $obj->dof = "";
                    $obj->pago = "";
                    $obj->bitacora = "SIST";
                    $obj->creado =  date("Y-m-d");

                    $newdate = $fechaReg."-12-".$x;
                    $newDateGet = strtotime($newdate);
                    
                    $dayWeekGet =  date("w", $newDateGet);
                    
                    $obj->habil = 1;
            
                    if($dayWeekGet == 0){ 
                       $obj->habil = 0;
                    }
                       
                    if($dayWeekGet == 6 ){ 
                        $obj->habil = 0;
                     }
            
            
                     $festivo->fecha = date("Y-m-d", $newDateGet);
                     $festivo->readOne();
                     
                     $calculatedDate = date("Y-m-d", $newDateGet);
                    
                     if(strtotime($festivo->fecha) == strtotime( $calculatedDate))
                          $obj->habil = 0;

                  $obj->create();
               }             


            
 }
 


?>
