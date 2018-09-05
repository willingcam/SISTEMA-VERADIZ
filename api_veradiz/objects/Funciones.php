<?php
class Funciones{

	// database connection and table descripcion
	private $conn;
	private $table_name = "funciones";

	// object properties
	public $id;
	public $descripcion;
	public $url_referencia;
	public $nivel;
	public $secuencia;
	public $estado;
	public $idPadre;
	public $idModulo;
	public $nombre;
	public $clase_icono;
	public $campo_state;
	public $rol;

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
				SET descripcion=:descripcion, nivel=:nivel, url=:url, secuencia=:secuencia, estado:=estado, idPadre=:idPadre, idModulo=:idModulo, nombre=:nombre, clase_icono=:clase_icono, campo_state=:campo_state";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->url=htmlspecialchars(strip_tags($this->url));
		$this->nivel=htmlspecialchars(strip_tags($this->nivel));
		$this->secuencia=htmlspecialchars(strip_tags($this->secuencia));
		$this->estado=htmlspecialchars(strip_tags($this->estado));
		$this->idPadre=htmlspecialchars(strip_tags($this->idPadre));
		$this->idModulo=htmlspecialchars(strip_tags($this->idModulo));
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->clase_icono=htmlspecialchars(strip_tags($this->clase_icono));
		$this->campo_state=htmlspecialchars(strip_tags($this->campo_state));
			
		

		// bind values
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":url", $this->url);
		$stmt->bindParam(":nivel", $this->nivel);
		$stmt->bindParam(":secuencia", $this->secuencia);
		$stmt->bindParam(":estado", $this->estado);
		$stmt->bindParam(":idPadre", $this->idPadre);
		$stmt->bindParam(":idModulo", $this->idModulo);
		$stmt->bindParam(":nombre", $this->nombre);
		$stmt->bindParam(":clase_icono", $this->clase_icono);
		$stmt->bindParam(":campo_state", $this->campo_state);		

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
		$query = "SELECT id, descripcion,  url_referencia,  nivel, secuencia, estado, idPadre, idModulo, nombre, clase_icono, campo_state, rol FROM " . $this->table_name . " WHERE estado = 1 AND rol = ?";

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
		$query = "SELECT id, descripcion, url,  nivel, secuencia, estado, idPadre, idModulo, nombre, clase_icono, campo_state
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
		$this->url = $row['url'];
		$this->nivel = $row['nivel'];
		$this->secuencia = $row['secuencia'];
        $this->estado = $row['estado'];		
		$this->idPadre = $row['idPadre'];
		$this->idModulo = $row['idModulo'];
		$this->nombre = $row['nombre'];
		$this->clase_icono = $row['clase_icono'];
		$this->campo_state = $row['campo_state'];
	}

	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){

		// select query
		$query = "SELECT id, descripcion, url,  nivel, secuencia, estado, idPadre, idModulo, nombre, clase_icono, campo_state	FROM " . $this->table_name . " 					
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
					nivel = :nivel,
					url = :url,
					secuencia = :secuencia,
					estado = :estado,
					idPadre = :idPadre,
					idModulo = :idModulo,
					nombre = :nombre,
					clase_icono = :clase_icono,
					campo_state = :campo_state
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->nivel=htmlspecialchars(strip_tags($this->nivel));
		$this->url=htmlspecialchars(strip_tags($this->url));
		$this->secuencia=htmlspecialchars(strip_tags($this->secuencia));
		$this->estado=htmlspecialchars(strip_tags($this->estado));
		$this->idPadre=htmlspecialchars(strip_tags($this->idPadre));
		$this->idModulo=htmlspecialchars(strip_tags($this->idModulo));
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->clase_icono=htmlspecialchars(strip_tags($this->clase_icono));
		$this->campo_state=htmlspecialchars(strip_tags($this->campo_state));
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':nivel', $this->nivel);
		$stmt->bindParam(':url', $this->url);
		$stmt->bindParam(':secuencia', $this->secuencia);
		$stmt->bindParam(':estado', $this->estado);
		$stmt->bindParam(':idPadre', $this->idPadre);
		$stmt->bindParam(':idModulo', $this->idModulo);
		$stmt->bindParam(':nombre', $this->nombre);
		$stmt->bindParam(':clase_icono', $this->clase_icono);
		$stmt->bindParam(':campo_state', $this->campo_state);
		
		
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
