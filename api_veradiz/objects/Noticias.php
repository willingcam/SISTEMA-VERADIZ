<?php
class Noticias{

	// database connection and table titulo
	private $conn;
	private $table_name = "noticia";

	// object properties
	public $id;
	public $titulo;
	public $subtitulo;
	public $descripcion;
	public $fecha;
	public $url_referencia;
	public $imagen;
	public $ubicacion_imagen;
	public $activo;
	public $url;
	public $autorId;

	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	

	
	// create product
	function create(){

		// query to insert record
		$query = "INSERT INTO	" . $this->table_name . "
				SET titulo=:titulo, subtitulo=:subtitulo, descripcion=:descripcion, fecha=:fecha, url_referencia=:url_referencia, imagen=:imagen, ubicacion_imagen=:ubicacion_imagen, activo=:activo, autorId=:autorId";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->titulo=htmlspecialchars(strip_tags($this->titulo));
		$this->subtitulo=htmlspecialchars(strip_tags($this->subtitulo));
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
	
		$this->url_referencia=htmlspecialchars(strip_tags($this->url_referencia));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->ubicacion_imagen=htmlspecialchars(strip_tags($this->ubicacion_imagen));
		$this->activo=strip_tags($this->activo);
	
		$this->fecha=strip_tags($this->fecha);
		$this->autorId=strip_tags($this->autorId);
	

		// bind values
	    $stmt->bindParam(":titulo", $this->titulo);
		$stmt->bindParam(":subtitulo", $this->subtitulo);
		$stmt->bindParam(":descripcion", $this->descripcion);
		
		$stmt->bindParam(":url_referencia", $this->url_referencia);
		$stmt->bindParam(":imagen", $this->imagen);
		$stmt->bindParam(":ubicacion_imagen", $this->ubicacion_imagen);
		$stmt->bindParam(":activo", $this->activo);

		$stmt->bindParam(":autorId", $this->autorId);
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
		$query = "SELECT id, titulo, subtitulo, descripcion, url_referencia, fecha, autorId, imagen, ubicacion_imagen FROM noticia WHERE  activo = 1 ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, titulo, subtitulo, descripcion, url_referencia, fecha, imagen, ubicacion_imagen, autorId FROM " . $this->table_name . " 
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
		$this->titulo = $row['titulo'];
		$this->subtitulo = $row['subtitulo'];
		$this->descripcion = $row['descripcion'];
		$this->url_referencia = $row['url_referencia'];
		$this->fecha = $row['fecha'];
		$this->imagen = $row['imagen'];
		$this->ubicacion_imagen = $row['ubicacion_imagen'];
		$this->autorId = $row['autorId'];
		
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

		
		$this->activo=strip_tags($this->activo);
		$this->id=strip_tags($this->id);

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
		$query = " UPDATE " . $this->table_name . "
				SET
					titulo = :titulo,
					descripcion = :descripcion,
					subtitulo = :subtitulo,
					url_referencia = :url_referencia										
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->titulo=htmlspecialchars(strip_tags($this->titulo));
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->subtitulo=htmlspecialchars(strip_tags($this->subtitulo));
		$this->url_referencia=htmlspecialchars(strip_tags($this->url_referencia));
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':titulo', $this->titulo);
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':subtitulo', $this->subtitulo);
		$stmt->bindParam(':url_referencia', $this->url_referencia);

		
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
