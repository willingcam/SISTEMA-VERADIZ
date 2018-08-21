<?php
class OtrasMonedas{

	// database connection and table name
	private $conn;
	private $table_name = "otras_monedas";

	// object properties
	public $id;
	public $mes;
	public $anio;
	public $cotizacion;
	public $moneda;
	

	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	
	// used for paging products
	public function count(){
		$query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";

		$stmt = $this->conn->prepare( $query );
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		return $row['total_rows'];
	}

	// create product
	function create(){

		// query to insert record
		$query = "INSERT INTO " . $this->table_name . "
			      SET mes=:mes, anio=:anio, cotizacion=:cotizacion, moneda=:moneda";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		
		$this->mes=htmlspecialchars(strip_tags($this->mes));
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->cotizacion=htmlspecialchars(strip_tags($this->cotizacion));		
		$this->moneda=htmlspecialchars(strip_tags($this->moneda));
		

		// bind values	
		$stmt->bindParam(":mes", $this->mes);
		$stmt->bindParam(":anio", $this->anio);
		$stmt->bindParam(":cotizacion", $this->cotizacion);		
		$stmt->bindParam(":moneda", $this->moneda);
		
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
		$query = "SELECT id, mes, anio, moneda, cotizacion FROM " . $this->table_name . " ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, mes, anio, moneda, cotizacion
				FROM " . $this->table_name . "  
				WHERE id = ?
				LIMIT 0,1";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind id of product to be updated
		$stmt->bindParam(1, $this->id);

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		
		$this->mes = $row['mes'];
		$this->anio = $row['anio'];
		$this->cotizacion = $row['cotizacion'];
		$this->moneda = $row['moneda'];
		
	}

	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){

		// select query
		$query = "SELECT id, mes, anio, cotizacion,  moneda, 
				FROM  " . $this->table_name . " 				
				LIMIT ?, ?";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind variable values
		$stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
		$stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);

		// execute query
		$stmt->execute();

		// return values from database
		return $stmt;
	}

	// update the product
	function update(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET
					mes = :mes,
					anio = :anio,
					cotizacion = :cotizacion,
					moneda = :moneda,					
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		
		$this->mes=htmlspecialchars(strip_tags($this->mes));
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->cotizacion=htmlspecialchars(strip_tags($this->cotizacion));
		$this->moneda=htmlspecialchars(strip_tags($this->moneda));
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		
		$stmt->bindParam(':mes', $this->price);
		$stmt->bindParam(':anio', $this->anio);
		$stmt->bindParam(':cotizacion', $this->cotizacion);
		$stmt->bindParam(':moneda', $this->moneda);
		
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}

	// delete the product
	function delete(){

		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind id of record to delete
		$stmt->bindParam(1, $this->id);

		// execute query
		if($stmt->execute()){
			return true;
		}

		return false;

	}

	// delete selected products
	public function deleteSelected($ids){

		$in_ids = str_repeat('?,', count($ids) - 1) . '?';

		// query to delete multiple records
		$query = "DELETE FROM " . $this->table_name . " WHERE id IN ({$in_ids})";

		$stmt = $this->conn->prepare($query);

		if($stmt->execute($ids)){
			return true;
		}else{
			return false;
		}
	}



}
?>
