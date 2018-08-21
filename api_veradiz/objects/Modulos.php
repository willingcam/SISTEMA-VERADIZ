<?php
class Modulos{

	// database connection and table descripcion
	private $conn;
	private $table_name = "modulo";

	// object properties
	public $id;
	public $descripcion;
	public $estado;
	public $url;
	public $url_imagen;

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
		$query = "INSERT INTO	" . $this->table_name . "
				SET descripcion=:descripcion, estado=:estado, url=:url, url_imagen=:url_imagen";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->estado=htmlspecialchars(strip_tags($this->estado));
		$this->url=htmlspecialchars(strip_tags($this->url));
		$this->url_imagen=htmlspecialchars(strip_tags($this->url_imagen));
		

		// bind values
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":estado", $this->estado);
		$stmt->bindParam(":url", $this->url);
		$stmt->bindParam(":url_imagen", $this->url_imagen);
		

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
		$query = "SELECT id, descripcion, estado, url, url_imagen FROM " . $this->table_name . " ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, descripcion, estado, url, url_imagen
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
		$this->id = $row('id');
		$this->descripcion = $row['descripcion'];
		$this->estado = $row['estado'];
		$this->url = $row['url'];
		$this->url_imagen = $row['url_imagen'];
		
	}

	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){

		// select query
		$query = "SELECT id, descripcion, estado, url, url_imagen 	FROM " . $this->table_name . " 					
				ORDER BY descripcion DESC
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
					descripcion = :descripcion,
					estado = :estado,
					url = :url,
					url_imagen = :url_imagen
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->estado=htmlspecialchars(strip_tags($this->estado));
		$this->url=htmlspecialchars(strip_tags($this->url));
		$this->url_imagen=htmlspecialchars(strip_tags($this->url_imagen));
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':estado', $this->estado);
		$stmt->bindParam(':url', $this->url);
		$stmt->bindParam(':url_imagen', $this->url_imagen);
		
		
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
