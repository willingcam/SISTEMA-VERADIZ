<?php
class Servicios{

	// database connection and table servicio
	private $conn;
	private $table_name = "servicios";

	// object properties
	public $id;
	public $servicio;
	public $descripcion;
	public $imagen;
	public $ubicacion_imagen;


	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

		
	// create product
	function create(){

		// query to insert record
		$query = "INSERT INTO	" . $this->table_name . "
				SET servicio=:servicio, descripcion=:descripcion, imagen=:imagen, ubicacion_imagen=:ubicacion_imagen, activo=:activo";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->servicio=htmlspecialchars(strip_tags($this->servicio));
	    $this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->ubicacion_imagen=htmlspecialchars(strip_tags($this->ubicacion_imagen));
		$this->activo=strip_tags($this->activo);

		// bind values
	    $stmt->bindParam(":servicio", $this->servicio);
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":imagen", $this->imagen);
		$stmt->bindParam(":ubicacion_imagen", $this->ubicacion_imagen);
		$stmt->bindParam(":activo", $this->activo);
	
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
		$query = "SELECT id, servicio, descripcion, imagen, ubicacion_imagen FROM servicios WHERE  activo = 1 ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, servicio, descripcion, imagen, ubicacion_imagen FROM " . $this->table_name . " 
				WHERE  id = ?
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
		$this->titulo = $row['servicio'];
		$this->descripcion = $row['descripcion'];
		$this->imagen = $row['imagen'];
		$this->ubicacion_imagen = $row['ubicacion_imagen'];
		
	}

	function desactiva(){

		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET				
					activo = :activo			
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		
		$this->activo=htmlspecialchars(strip_tags($this->activo));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':activo', $this->activo);
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}

	// update the product
	function update(){

		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
				    servicio = :servicio,
					descripcion = :descripcion,
					imagen = :imagen							
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->servicio=htmlspecialchars(strip_tags($this->servicio));
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
				
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':servicio', $this->servicio);
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':imagen', $this->imagen);
				
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
