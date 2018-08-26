<?php
class Clientes{

	// database connection and table cliente
	private $conn;
	private $table_name = "clientes";

	// object properties
	public $id;
	public $cliente;
	public $descripcion;
	public $servicios_contratados;
	public $nombre_contacto;
	public $correo;
	public $telefono;
	public $extension;
	public $celular;
	public $imagen;
	public $ubicacion_imagen;

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
				SET cliente=:cliente, servicios_contratados=:servicios_contratados, descripcion=:descripcion, nombre_contacto=:nombre_contacto, correo=:correo, telefono=:telefono, extension=:extension, celular=:celular,imagen=:imagen, ubicacion_imagen=:ubicacion_imagen";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->cliente=htmlspecialchars(strip_tags($this->cliente));
		$this->servicios_contratados=htmlspecialchars(strip_tags($this->servicios_contratados));
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->nombre_contacto=htmlspecialchars(strip_tags($this->nombre_contacto));
		$this->correo=htmlspecialchars(strip_tags($this->correo));
		$this->telefono=htmlspecialchars(strip_tags($this->telefono));
		$this->extension=htmlspecialchars(strip_tags($this->extension));
		$this->celular=htmlspecialchars(strip_tags($this->celular));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->ubicacion_imagen=htmlspecialchars(strip_tags($this->ubicacion_imagen));

		// bind values
		$stmt->bindParam(":cliente", $this->cliente);
		$stmt->bindParam(":servicios_contratados", $this->servicios_contratados);
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":nombre_contacto", $this->nombre_contacto);
		$stmt->bindParam(":correo", $this->correo);
		$stmt->bindParam(":telefono", $this->telefono);
		$stmt->bindParam(":extension", $this->extension);
		$stmt->bindParam(":celular", $this->celular);
		$stmt->bindParam(":imagen", $this->imagen);
		$stmt->bindParam(":ubicacion_imagen", $this->ubicacion_imagen);

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
		$query = "SELECT * FROM " . $this->table_name . " ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

	
		
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT cliente, descripcion, servicios_contratados, nombre_contacto, correo, telefono, extension, celular, imagen, ubicacion_imagen
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
		$this->cliente = $row['cliente'];
		$this->servicios_contratados = $row['servicios_contratados'];
		$this->descripcion = $row['descripcion'];
		$this->nombre_contacto = $row['nombre_contacto'];
		$this->correo = $row['correo'];
		$this->telefono = $row['telefono'];
		$this->extension = $row['extension'];
		$this->celular = $row['celular'];
		$this->imagen = $row['imagen'];
		$this->ubicacion_imagen = $row['ubicacion_imagen'];
	}

	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){

		// select query
		$query = "SELECT cliente, descripcion, servicios_contratados, nombre_contacto, correo, telefono, extension, celular, imagen, ubicacion_imagen	FROM 	" . $this->table_name . " 
				  ORDER BY cliente DESC
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
					cliente = :cliente,
					servicios_contratados = :servicios_contratados,
					descripcion = :descripcion,
					nombre_contacto = :nombre_contacto,
					correo = :correo,
					telefono = :telefono,
					extension = :extension,
					celular = :celular,
					imagen = :imagen,
					ubicacion_imagen = :ubicacion_imagen
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->cliente=htmlspecialchars(strip_tags($this->cliente));
		$this->servicios_contratados=htmlspecialchars(strip_tags($this->servicios_contratados));
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->nombre_contacto=htmlspecialchars(strip_tags($this->nombre_contacto));
		$this->correo=htmlspecialchars(strip_tags($this->correo));
		$this->telefono=htmlspecialchars(strip_tags($this->telefono));
		$this->extension=htmlspecialchars(strip_tags($this->extension));
		$this->celular=htmlspecialchars(strip_tags($this->celular));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->imagen_ubicacion=htmlspecialchars(strip_tags($this->imagen_ubicacion));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':cliente', $this->cliente);
		$stmt->bindParam(':servicios_contratados', $this->servicios_contratados);
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':nombre_contacto', $this->nombre_contacto);
		$stmt->bindParam(':correo', $this->correo);
		$stmt->bindParam(':telefono', $this->telefono);
		$stmt->bindParam(':extension', $this->extension);
		$stmt->bindParam(':celular', $this->celular);
		$stmt->bindParam(':imagen', $this->imagen);
		$stmt->bindParam(':imagen_ubicacion', $this->imagen_ubicacion);
		
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
