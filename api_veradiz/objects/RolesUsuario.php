<?php
class rolIDesusuarioID{

	// database connection and table name
	private $conn;
	private $table_name = "rolIDes_usuarioID";

	// object properties
	public $id;
	public $rolID;
	public $usuarioID;
	public $estado;


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
				SET	rolID=:rolID, usuarioID=:usuarioID, estado :=estado";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->rolID=htmlspecialchars(strip_tags($this->rolID));
		$this->usuarioID=htmlspecialchars(strip_tags($this->usuarioID));
		$this->estado=htmlspecialchars(strip_tags($this->estado));
		
		// bind values
		$stmt->bindParam(":rolID", $this->rolID);
		$stmt->bindParam(":usuarioID", $this->usuarioID);
		$stmt->bindParam(":estado", $this->estado);
		
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
		$query = "SELECT id, rolID, usuarioID, estado
				FROM " . $this->table_name . " ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, rolID, usuarioID, estado
				FROM " . $this->table_name . " 
				WHERE 	id = ?
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
		$this->id = $row['id'];
		$this->rolID = $row['rolID'];
		$this->usuarioID = $row['usuarioID'];
		$this->estado = $row['estado'];
	}
	
	// update the product
	function update(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET rolID = :rolID, usuarioID := usuarioID, estado:= estado					
				WHERE id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->rolID=htmlspecialchars(strip_tags($this->rolID));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(':rolID', $this->rolID);
		$stmt->bindParam(':usuarioID', $this->usuarioID);
		$stmt->bindParam(':estado', $this->estado);

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
