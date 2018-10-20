<?php
class EncargadoCuenta{

	
	private $conn;
	private $table_name = "encargado_cuenta";

	// object properties
	public $id;
    public $idcliente;
    public $idempleado;
    public $fechaasignacion;
    public $fechadesaccionacion;
    public $estatus;
    
	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}
	
	// create product
	function create(){

		// query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET idcliente=:idcliente, idempleado=:idempleado, fechaasignacion=:fechaasignacion, fechadesaccionacion=:fechadesaccionacion, estatus=:estatus";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
	
		$this->idcliente=strip_tags($this->idcliente);
        $this->idempleado=strip_tags($this->idempleado);
        $this->fechaasignacion=strip_tags($this->fechaasignacion);
        $this->fechadesaccionacion=strip_tags($this->fechadesaccionacion);
        $this->estatus=strip_tags($this->estatus);
       
	
		// bind values
		$stmt->bindParam(":idcliente", $this->idcliente);
        $stmt->bindParam(":idempleado", $this->idempleado);
        $stmt->bindParam(":fechaasignacion", $this->fechaasignacion);
        $stmt->bindParam(":fechadesaccionacion", $this->fechadesaccionacion);
        $stmt->bindParam(":estatus", $this->estatus);
					
		// execute query
		if($stmt->execute()){
			return true;
		}else{
			echo "<pre>";
				print_r($stmt->errorInfo());
			echo "</pre>";

			return false;
		}
	}

	 
	// read products
	public function read_asignations(){

		// select all query0 
		$query = " SELECT P.id, P.idcliente, P.idempleado, Q.nombre FROM encargado_cuenta  P LEFT JOIN  usuarios Q ON Q.id = P.idempleado  WHERE idcliente = ? AND estatus = 1 ";

		// prepare query statement
        $stmt = $this->conn->prepare($query);
        
       	// bind id of product to be updated
		$stmt->bindParam(1, $this->id);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	

	function desactiva(){

		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					estatus = 0			
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
	
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}

	


}
?>
