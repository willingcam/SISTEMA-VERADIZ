<?php
class Usuarios{

	// database connection and table nombre
	private $conn;
	private $table_name = "usuarios";

	// object properties
	public $id;
	public $nombre;
	public $correo;
	public $usuario;
	public $claveacceso;
	public $telefono;
	public $extension;
	public $celular;
	public $imagen;
	public $ubicacion_imagen;

	public $rolID;
	public $rol;
	public $tipoUsuarioId;
	public $activo;
	public $puesto;
	public $contacto;

	

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
				SET nombre=:nombre, usuario=:usuario, correo=:correo, claveacceso=:claveacceso, telefono=:telefono, extension=:extension, celular=:celular, puesto=:puesto, imagen=:imagen, ubicacion_imagen=:ubicacion_imagen, activo=:activo, tipoUsuarioId=:tipoUsuarioId , rolID=:rolID, rol=:rol, contacto=:contacto";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->usuario=htmlspecialchars(strip_tags($this->usuario));
		$this->correo=htmlspecialchars(strip_tags($this->correo));
		$this->claveacceso=htmlspecialchars(strip_tags($this->claveacceso));
		$this->telefono=htmlspecialchars(strip_tags($this->telefono));
		$this->celular=htmlspecialchars(strip_tags($this->celular));
		$this->extension=htmlspecialchars(strip_tags($this->extension));

		$this->puesto=htmlspecialchars(strip_tags($this->puesto));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->ubicacion_imagen=htmlspecialchars(strip_tags($this->ubicacion_imagen));

		$this->activo=strip_tags($this->activo);
		$this->tipoUsuarioId=strip_tags($this->tipoUsuarioId);

		$this->rolID=strip_tags($this->rolID);
		$this->rol=strip_tags($this->rol);

		$this->contacto=strip_tags($this->contacto);
		

		// bind values
		$stmt->bindParam(":nombre", $this->nombre);
		$stmt->bindParam(":usuario", $this->usuario);
		$stmt->bindParam(":correo", $this->correo);
		$stmt->bindParam(":claveacceso", $this->claveacceso);
		$stmt->bindParam(":telefono", $this->telefono);
		$stmt->bindParam(":celular", $this->celular);
		$stmt->bindParam(":extension", $this->extension);

		$stmt->bindParam(":puesto", $this->puesto);
		$stmt->bindParam(":imagen", $this->imagen);
		$stmt->bindParam(":ubicacion_imagen", $this->ubicacion_imagen);
		$stmt->bindParam(":activo", $this->activo);
		$stmt->bindParam(":tipoUsuarioId", $this->tipoUsuarioId);
		

		$stmt->bindParam(":rolID", $this->rolID);
		$stmt->bindParam(":rol", $this->rol);

		$stmt->bindParam(":contacto", $this->contacto);

	
	
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
		$query = "SELECT id, nombre, correo, usuario, claveacceso, telefono, extension, celular, imagen, ubicacion_imagen, tipoUsuarioId, activo, puesto, rol, rolID, contacto FROM usuarios WHERE  activo = 1 AND tipoUsuarioId = 1 ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}


	// read products
	public function obtenSocios(){

		// select all query
		$query = "SELECT id, nombre, correo, usuario, claveacceso, telefono, extension, celular, imagen, ubicacion_imagen, tipoUsuarioId, activo, puesto, rol, rolID, contacto FROM usuarios WHERE  activo = 1  AND rolID = 2  AND tipoUsuarioId = 1 ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}


	// read products
	public function readClient(){

			// select all query
			$query = "SELECT id, nombre, correo, usuario, claveacceso, telefono, extension, celular, imagen, ubicacion_imagen, tipoUsuarioId, activo, puesto, rol, rolID, contacto FROM usuarios WHERE  activo = 1 AND tipoUsuarioId = 2 ";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);
	
			// execute query
			$stmt->execute();
	
			return $stmt;
	}
		
		// read products
		public function readOnlyMyClient(){

			// select all query
			$query = "SELECT  P.idcliente, Q.nombre FROM encargado_cuenta P LEFT JOIN usuarios Q ON Q.id = P.idcliente WHERE P.idempleado = ? ";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind id of product to be updated
			$stmt->bindParam(1, $this->id);
	
			// execute query
			$stmt->execute();
	
			return $stmt;
	}
	

	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, nombre, correo, usuario, claveacceso, telefono, extension, celular, imagen, ubicacion_imagen, tipoUsuarioId, activo, puesto, rol, rolID, contacto FROM " . $this->table_name . " 
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
		$this->nombre = $row['nombre'];
		$this->correo= $row['correo'];
		$this->usuario = $row['usuario'];
		$this->claveacceso = $row['claveacceso'];
		$this->telefono = $row['telefono'];
		$this->extension = $row['extension'];
		$this->celular = $row['celular'];
		$this->imagen = $row['imagen'];
		$this->ubicacion_imagen = $row['ubicacion_imagen'];
		$this->tipoUsuarioId = $row['tipoUsuarioId'];
		$this->activo = $row['activo'];
		$this->puesto = $row['puesto'];
		$this->rol = $row['rol'];
		$this->rolID = $row['rolID'];
		$this->contacto = $row['contacto'];
	}
	 
	
	// used when filling up the update product form
	function login(){

		// query to read single record
		$query = "SELECT p.id, p.nombre, p.correo, p.usuario, p.claveacceso, p.imagen, p.ubicacion_imagen, p.tipoUsuarioId, p.rol, p.rolID, contacto FROM " . $this->table_name . "  p
		           WHERE  p.usuario = ? and p.claveacceso = ?
				  LIMIT 0,1";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind id of product to be updated
		$stmt->bindParam(1, $this->usuario);
		$stmt->bindParam(2, $this->claveacceso);

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		$this->id = $row['id'];
		$this->nombre = $row['nombre'];
		$this->correo= $row['correo'];
		$this->usuario = $row['usuario'];
		$this->claveacceso = $row['claveacceso'];
	}	



		// used when filling up the update product form
	function userData(){

			// query to read single record
			$query = "SELECT id, nombre, correo, usuario, claveacceso, rolID, rol, telefono, extension, celular, imagen, ubicacion_imagen, tipoUsuarioId, activo, puesto, contacto FROM " . $this->table_name . "  
					  WHERE  id = ?  AND activo = 1 
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
			$this->nombre = $row['nombre'];
			$this->correo= $row['correo'];
			$this->usuario = $row['usuario'];
			$this->claveacceso = $row['claveacceso'];
			$this->rol = $row['rol'];
			$this->rolID = $row['rolID'];
			$this->telefono = $row['telefono'];
			$this->extension = $row['extension'];
			$this->celular = $row['celular'];
			$this->imagen = $row['imagen'];
			$this->ubicacion_imagen = $row['ubicacion_imagen'];
			$this->tipoUsuarioId = $row['tipoUsuarioId'];
			$this->activo = $row['activo'];
			$this->puesto = $row['puesto'];
			$this->contacto = $row['contacto'];


	}	
	

	// update the product
	function update(){

		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					nombre = :nombre,
					correo = :correo,
					puesto = :puesto,
					telefono = :telefono,		
					extension = :extension,		
					celular = :celular,		
					imagen = :imagen,
					rolID = :rolID,
					rol = :rol,
					contacto=:contacto,
					usuario =:usuario,
					claveacceso=:claveacceso
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->correo=htmlspecialchars(strip_tags($this->correo));
		$this->puesto=htmlspecialchars(strip_tags($this->puesto));
		$this->telefono=htmlspecialchars(strip_tags($this->telefono));
		$this->extension=htmlspecialchars(strip_tags($this->extension));
		$this->celular=htmlspecialchars(strip_tags($this->celular));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->rolID=htmlspecialchars(strip_tags($this->rolID));
		$this->rol=htmlspecialchars(strip_tags($this->rol));
		$this->contacto=htmlspecialchars(strip_tags($this->contacto));
		$this->usuario=htmlspecialchars(strip_tags($this->usuario));
		$this->claveacceso=htmlspecialchars(strip_tags($this->claveacceso));

	

		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':nombre', $this->nombre);
		$stmt->bindParam(':correo', $this->correo);
		$stmt->bindParam(':puesto', $this->puesto);
		$stmt->bindParam(':telefono', $this->telefono);
		$stmt->bindParam(':extension', $this->extension);
		$stmt->bindParam(':celular', $this->celular);
		$stmt->bindParam(':imagen', $this->imagen);
		$stmt->bindParam(':rolID', $this->rolID);
		$stmt->bindParam(':rol', $this->rol);
		$stmt->bindParam(':contacto', $this->contacto);
		$stmt->bindParam(':usuario', $this->usuario);
		$stmt->bindParam(':claveacceso', $this->claveacceso);


		
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}


	function updateCliente(){

		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					nombre = :nombre,
					correo = :correo,
					puesto = :puesto,
					telefono = :telefono,		
					extension = :extension,		
					celular = :celular,		
					imagen = :imagen,
					rolID = :rolID,
					rol = :rol,
					contacto = :contacto
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->nombre=htmlspecialchars(strip_tags($this->nombre));
		$this->correo=htmlspecialchars(strip_tags($this->correo));
		$this->puesto=htmlspecialchars(strip_tags($this->puesto));
		$this->telefono=htmlspecialchars(strip_tags($this->telefono));
		$this->extension=htmlspecialchars(strip_tags($this->extension));
		$this->celular=htmlspecialchars(strip_tags($this->celular));
		$this->imagen=htmlspecialchars(strip_tags($this->imagen));
		$this->rolID=htmlspecialchars(strip_tags($this->rolID));
		$this->rol=htmlspecialchars(strip_tags($this->rol));
		$this->contacto=htmlspecialchars(strip_tags($this->contacto));


		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':nombre', $this->nombre);
		$stmt->bindParam(':correo', $this->correo);
		$stmt->bindParam(':puesto', $this->puesto);
		$stmt->bindParam(':telefono', $this->telefono);
		$stmt->bindParam(':extension', $this->extension);
		$stmt->bindParam(':celular', $this->celular);
		$stmt->bindParam(':imagen', $this->imagen);
		$stmt->bindParam(':rolID', $this->rolID);
		$stmt->bindParam(':rol', $this->rol);
		$stmt->bindParam(':contacto', $this->contacto);

		
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
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
