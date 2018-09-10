<?php
class Cetes91{

	// database connection and table name
	private $conn;
	private $table_name = "cetes91";

	// object properties
	public $id;
	public $valor;
	public $fecha;
	public $fechaInicio;
	public $fechaTermino;
		
	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	// create object
	function create(){

		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET valor=:valor, fecha=:fecha";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
	
		$this->valor=strip_tags($this->valor);
		$this->fecha=strip_tags($this->fecha);
	
		// bind values
		$stmt->bindParam(":valor", $this->valor);
		$stmt->bindParam(":fecha", $this->fecha);
					
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
	public function read(){

		// select all query
		$query = " SELECT valor, fecha FROM  cetes91 ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	
		// read products
		public function readPeriodo(){

			// select all query
			$query = " SELECT valor, fecha FROM  cetes91 WHERE fecha BETWEEN '".$this->fechaInicio."' AND '".$this->fechaTermino."' ";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);
	

		    // bind id of product to be updated
		    $stmt->bindValue(':start', $this->fechaInicio);
		    $stmt->bindValue(':end', $this->fechaTermino);

			// execute query
			$stmt->execute();
	
			return $stmt;
		}





}
?>
