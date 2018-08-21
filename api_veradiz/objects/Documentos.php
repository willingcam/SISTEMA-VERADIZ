<?php
class Documentos{

	// database connection and table descripcion
	private $conn;
	private $table_name = "documentos";

	// object properties
	public $id;
	public $descripcion;
	public $archivo;
	public $ubicacion;
	public $tipoAccesoId;
	public $clienteId;
	public $tipoDocumentoId;
	public $fechaRegistro;
	public $autorId;

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
				SET descripcion=:descripcion, archivo=:archivo, ubicacion=:ubicacion, clienteId=:clienteId, tipoAccesoId=:tipoAccesoId, tipoDocumentoId=:tipoDocumentoId, autorId=:autorId, fechaRegistro=:fechaRegistro  ";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->archivo=htmlspecialchars(strip_tags($this->archivo));
		$this->ubicacion=htmlspecialchars(strip_tags($this->ubicacion));
		
		$this->clienteId=htmlspecialchars(strip_tags($this->clienteId));
		$this->tipoAccesoId=htmlspecialchars(strip_tags($this->tipoAccesoId));
		$this->tipoDocumentoId=strip_tags($this->tipoDocumentoId);
		$this->autorId=strip_tags($this->autorId);
		$this->fechaRegistro=strip_tags($this->fechaRegistro);	

		// bind values
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":archivo", $this->archivo);
		$stmt->bindParam(":ubicacion", $this->ubicacion);
		
		$stmt->bindParam(":clienteId", $this->clienteId);
		$stmt->bindParam(":tipoAccesoId", $this->tipoAccesoId);
		$stmt->bindParam(":tipoDocumentoId", $this->tipoDocumentoId);
	
		$stmt->bindParam(":autorId", $this->autorId);
		$stmt->bindParam(":fechaRegistro", $this->fechaRegistro);	

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
		$query = "SELECT id, descripcion, ubicacion, archivo, tipoAccesoId, clienteId, tipoDocumentoId, fechaRegistro, autorId FROM documentos ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

		// read products
	public function read_client(){

		$query = "SELECT id, descripcion, ubicacion, archivo, tipoAccesoId, clienteId, tipoDocumentoId, fechaRegistro, autorId FROM " . $this->table_name . " WHERE  clienteId = ?";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind id of product to be updated
		    $stmt->bindParam(1, $this->id);
	
			// execute query
			$stmt->execute();
	
			return $stmt;
	}
	

	public function read_client_type(){

		$query = "SELECT id, descripcion, ubicacion, archivo, tipoAccesoId, clienteId, tipoDocumentoId, fechaRegistro, autorId FROM " . $this->table_name . " WHERE  clienteId = ? AND tipoDocumentoId = ?";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind id of product to be updated
			$stmt->bindParam(1, $this->cliente);
			$stmt->bindParam(2, $this->tipo);
	
			// execute query
			$stmt->execute();
	
			return $stmt;
	}


	public function verify_document(){

		$query = "SELECT id, descripcion, ubicacion, archivo, tipoAccesoId, clienteId, tipoDocumentoId, fechaRegistro, autorId FROM " . $this->table_name . " WHERE clienteId = :cli AND tipoDocumentoId = :tip AND descripcion LIKE  :foo ";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind id of product to be updated
			$stmt->bindParam(':cli', $this->cliente, PDO::PARAM_INT);
			$stmt->bindParam(':tip', $this->tipo, PDO::PARAM_INT);

            $likeString = "%$this->descripcion%";


            $stmt->bindParam(':foo',  $likeString ,  PDO::PARAM_STR);

		
	
			// execute query
			$stmt->execute();
	
			return $stmt;
	}


	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT id, descripcion, ubicacion, archivo, clienteId, tipoAccesoId, tipoDocumentoId, fechaRegistro, autorId FROM " . $this->table_name . " 
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
		$this->descripcion = $row['descripcion'];
		$this->ubicacion= $row['ubicacion'];
		$this->archivo = $row['archivo'];
		$this->tipoacceso = $row['tipoAccesoId'];
		$this->clienteId = $row['clienteId'];
		$this->tipoDocumentoId = $row['tipoDocumentoId'];
		$this->fechaRegistro = $row['fechaRegistro'];
		$this->autorId = $row['autorId'];
	}
	
	


	
	// update the product
	function update(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET
					descripcion = :descripcion,
					archivo = :archivo,
					ubicacion = :ubicacion,
					tipoAccesoId = :tipoAccesoId,
					clienteId = :clienteId,
					tipoDocumentoId = :tipoDocumentoId,
					fechaRegistro = :fechaRegistro,
					autorId = :autorId
										
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->descripcion=htmlspecialchars(strip_tags($this->descripcion));
		$this->archivo=htmlspecialchars(strip_tags($this->archivo));
		$this->ubicacion=htmlspecialchars(strip_tags($this->ubicacion));
		$this->tipoAccesoId=htmlspecialchars(strip_tags($this->tipoAccesoId));
		$this->clienteId=htmlspecialchars(strip_tags($this->clienteId));
		$this->tipoDocumentoId=strip_tags($this->tipoDocumentoId);
		$this->fechaRegistro=strip_tags($this->fechaRegistro);
		$this->autorId=strip_tags($this->autorId);
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':archivo', $this->archivo);
		$stmt->bindParam(':ubicacion', $this->ubicacion);
		$stmt->bindParam(':tipoAccesoId', $this->tipoAccesoId);
		$stmt->bindParam(':clienteId', $this->clienteId);
		$stmt->bindParam(':tipoDocumentoId', $this->tipoDocumentoId);
		$stmt->bindParam(':fechaRegistro', $this->fechaRegistro);
     	$stmt->bindParam(':autorId', $this->autorId);
				
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
