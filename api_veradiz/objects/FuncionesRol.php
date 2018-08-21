<?php
class FuncionesRol{

	// database connection and table name
	private $conn;
	private $table_name = "funciones_rol";

	// object properties
	public $id;
	public $rol;
	public $funcion;
	public $estado;
	public $descripcion;
	public $url;
	public $nivel;
	public $secuencia;
	public $estado_funcion;
	public $idPadre;
	public $idModulo;
	public $nombre;
	public $clase_icono;
	public $campo_state;


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
				SET	rol=:rol, funcion=:funcion, estado :=estado";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->rol=htmlspecialchars(strip_tags($this->rol));
		$this->funcion=htmlspecialchars(strip_tags($this->funcion));
		$this->estado=htmlspecialchars(strip_tags($this->estado));
		
		// bind values
		$stmt->bindParam(":rol", $this->rol);
		$stmt->bindParam(":funcion", $this->funcion);
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
		$query = "SELECT id, rol, funcion, estado
				FROM " . $this->table_name . " ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}



	// read products
	public function GetFuncionesRol(){

		// select all query
		$query = "SELECT p.funcion, p.estado, c.descripcion, c.url, c.nivel, c.secuencia, c.estado, c.idPadre, c.idModulo, c.nombre, c.clase_icono, c.campo_state FROM " . $this->table_name . " p
				  LEFT JOIN funciones  c ON  c.id = p.funcion
				  WHERE p.rol = ? ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind id of product to be updated
		$stmt->bindParam(1, $this->rol);


		// execute query
		$stmt->execute();

		return $stmt;
	}



	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, rol, funcion, estado
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
		$this->rol = $row['rol'];
		$this->funcion = $row['funcion'];
		$this->estado = $row['estado'];
	}
	
	// update the product
	function update(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET rol = :rol, funcion := funcion, estado:= estado					
				WHERE id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->rol=htmlspecialchars(strip_tags($this->rol));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(':rol', $this->rol);
		$stmt->bindParam(':funcion', $this->funcion);
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
