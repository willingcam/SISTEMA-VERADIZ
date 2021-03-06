<?php
class CotizacionDolar{

	// database connection and table name
	private $conn;
	private $table_name = "dolar";

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
	
	// create product
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
		$query = " SELECT valor, fecha FROM  dolar ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	

	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT valor FROM " . $this->table_name . " 
				WHERE  fecha = ?
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
		$this->valor = $row['valor'];
		
	}
	 

	


}
?>
