<?php
class TipoDocumento{

	// database connection and table name
	private $conn;
	private $table_name = "tipo_documento";

	// object properties
	public $id;
	public $tipo_documento;


	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

		
	// create product
	function create(){

		// query to insert record
		$query = "INSERT INTO 	" . $this->table_name . " SET tipo_documento=:tipo_documento";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->tipo_documento=htmlspecialchars(strip_tags($this->tipo_documento));
		

		// bind values
		$stmt->bindParam(":tipo_documento", $this->tipo_documento);
		
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
		$query = "SELECT id, tipo_documento 	FROM " . $this->table_name . " ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT  id, tipo_documento
				FROM " . $this->table_name . " 
				WHERE 	id = ?
				LIMIT  	0,1";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind id of product to be updated
		$stmt->bindParam(1, $this->id);

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		$this->id = $row['id'];
		$this->tipo_documento = $row['tipo_documento'];
	}
	
		
	// update the product
	function update(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET  tipo_documento = :tipo_documento					
				WHERE id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->tipo_documento=htmlspecialchars(strip_tags($this->tipo_documento));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':tipo_documento', $this->tipo_documento);
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
