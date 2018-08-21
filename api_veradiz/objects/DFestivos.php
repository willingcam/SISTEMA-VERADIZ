<?php
class DFestivos{

	// database connection and table nombre
	private $conn;
	private $table_name = "festivos";

	// object properties
	public $id;
	public $descripcion;
	public $fecha;
	public $anio;
	

	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}
		
	// create product
	function create(){

		// query to insert record
		$query = "INSERT INTO	" . $this->table_name . "
				SET anio=:anio, descripcion=:descripcion, fecha=:fecha, anio=:anio ";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->fecha=strip_tags($this->fecha);
		

		// bind values
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":anio", $this->anio);
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
		$query = "SELECT id, descripcion, anio, fecha FROM festivos ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, descripcion, anio, fecha FROM " . $this->table_name . " 
				WHERE fecha = ?
				LIMIT 0,1";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind id of product to be updated
		$stmt->bindParam(1, $this->fecha);

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		$this->id = $row['id'];
		$this->descripcion = $row['descripcion'];
		$this->anio= $row['anio'];
		$this->fecha = $row['fecha'];
	
	}
	 
	
}
?>
