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
	public $estadodocumento;
	public $informedescargado;
	public $fechadescarga;

	public $comentarios;


	public $descripcionTipoDoc;
	public $nombreCliente;
	public $descripcionEstadoDoc;


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
				SET descripcion=:descripcion, archivo=:archivo, ubicacion=:ubicacion, clienteId=:clienteId, tipoAccesoId=:tipoAccesoId, 
				tipoDocumentoId=:tipoDocumentoId, autorId=:autorId, fechaRegistro=:fechaRegistro, estadodocumento=:estadodocumento, informedescargado=:informedescargado, fechadescarga=:fechadescarga  ";

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

		$this->estadodocumento=strip_tags($this->estadodocumento);	
		$this->informedescargado=strip_tags($this->informedescargado);	
		$this->fechadescarga=strip_tags($this->fechadescarga);	

		// bind values
		$stmt->bindParam(":descripcion", $this->descripcion);
		$stmt->bindParam(":archivo", $this->archivo);
		$stmt->bindParam(":ubicacion", $this->ubicacion);
		
		$stmt->bindParam(":clienteId", $this->clienteId);
		$stmt->bindParam(":tipoAccesoId", $this->tipoAccesoId);
		$stmt->bindParam(":tipoDocumentoId", $this->tipoDocumentoId);
	
		$stmt->bindParam(":autorId", $this->autorId);
		$stmt->bindParam(":fechaRegistro", $this->fechaRegistro);	

		$stmt->bindParam(":estadodocumento", $this->estadodocumento);	
		$stmt->bindParam(":informedescargado", $this->informedescargado);	
		$stmt->bindParam(":fechadescarga", $this->fechadescarga);	

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
		$query = "SELECT P.id, P.descripcion, P.ubicacion, P.archivo, P.tipoAccesoId, P.clienteId, P.tipoDocumentoId, P.fechaRegistro, P.autorId, P.estadodocumento, P.informedescargado, P.fechadescarga, Q.estado, R.tipo_documento, U.nombre FROM documentos P 
				   LEFT JOIN estado_documentos Q ON Q.id = P.estadodocumento
				   LEFT JOIN tipo_documento  R  ON R.id = P.tipoDocumentoId
				   LEFT JOIN usuarios   U ON U.id = P.clienteId";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

//read documentos por creador o autor en estado de edici�n
public function read_documents_by_author(){
	$query = "SELECT P.id, P.descripcion, P.ubicacion, P.archivo, P.tipoAccesoId, P.clienteId, P.tipoDocumentoId, P.fechaRegistro, P.autorId, P.estadodocumento, P.informedescargado, P.fechadescarga, Q.estado, R.tipo_documento, U.nombre FROM documentos P 
				   LEFT JOIN estado_documentos Q ON Q.id = P.estadodocumento
				   LEFT JOIN tipo_documento  R  ON R.id = P.tipoDocumentoId
				   LEFT JOIN usuarios   U ON U.id = P.clienteId
				   WHERE  P.autorid = ? ";
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// bind id of product to be readed
		$stmt->bindParam(1, $this->id);
		// execute query
		$stmt->execute();
		return $stmt;
}
		// read products
	public function read_client(){

	    $query = "SELECT P.id, P.descripcion, P.ubicacion, P.archivo, P.tipoAccesoId, P.clienteId, P.tipoDocumentoId, P.fechaRegistro, P.autorId, P.estadodocumento, P.informedescargado, P.fechadescarga, Q.estado, R.tipo_documento, U.nombre FROM documentos P 
		LEFT JOIN estado_documentos Q ON Q.id = P.estadodocumento
		LEFT JOIN tipo_documento  R  ON R.id = P.tipoDocumentoId
		LEFT JOIN usuarios   U ON U.id = P.clienteId  WHERE  P.clienteId = ?  ";

			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind id of product to be updated
		    $stmt->bindParam(1, $this->id);
	
			// execute query
			$stmt->execute();
	
			return $stmt;
	}
	

		// read products
	public function read_clients_documents(){

			$query = "SELECT P.idcliente, Q.descripcion, Q.archivo, Q.ubicacion, Q.tipoDocumentoId, Q.id, S.estado,  R.tipo_documento, U.nombre, Q.fechaRegistro,Q.autorId,P.idempleado as socioId,Q.nombreCreador FROM encargado_cuenta P 
			RIGHT JOIN 
            (
              SELECT D.id as idDocumento,U.id as idCreador,U.nombre as nombreCreador,D.clienteId,D.estadodocumento,
             D.descripcion, D.archivo, D.ubicacion, D.tipoDocumentoId, D.id,D.fechaRegistro,D.autorId
            FROM documentos D Left JOIN usuarios U on D.autorId=U.id
               ) Q
            ON Q.clienteId = P.idcliente AND Q.estadodocumento = 2
			LEFT JOIN estado_documentos S ON S.id = Q.estadodocumento
			LEFT JOIN tipo_documento  R  ON R.id = Q.tipoDocumentoId
			LEFT JOIN usuarios   U ON U.id = P.idcliente
			WHERE  P.idempleado = ?  ";
	
				// prepare query statement
				$stmt = $this->conn->prepare($query);
	
				// bind id of product to be updated
				$stmt->bindParam(1, $this->id);
		
				// execute query
				$stmt->execute();
		
				return $stmt;
	}


	public function documentos_publicados(){

		$query = "SELECT P.idcliente, Q.descripcion, Q.archivo, Q.ubicacion, Q.tipoDocumentoId, Q.id, S.estado,  R.tipo_documento, U.nombre, Q.informedescargado,Q.fechadescarga,Q.fechaRegistro FROM encargado_cuenta P 
		RIGHT JOIN documentos Q ON Q.clienteId = P.idcliente AND Q.estadodocumento = 3
		LEFT JOIN estado_documentos S ON S.id = Q.estadodocumento
		LEFT JOIN tipo_documento  R  ON R.id = Q.tipoDocumentoId
		LEFT JOIN usuarios   U ON U.id = P.idcliente
		WHERE  P.idempleado = ?  ";

			// prepare query statement
			$stmt = $this->conn->prepare($query);

			// bind id of product to be updated
			$stmt->bindParam(1, $this->id);
	
			// execute query
			$stmt->execute();
	
			return $stmt;
}


			// read products
			public function read_client_docs(){

				$query = "SELECT Q.clienteId, Q.descripcion, Q.archivo, Q.ubicacion, Q.tipoDocumentoId, Q.id FROM encargado_cuenta P 
				RIGHT JOIN documentos Q ON Q.clienteId = P.idcliente AND Q.estadodocumento = 3
				WHERE  P.idempleado = ?  ";
		
					// prepare query statement
					$stmt = $this->conn->prepare($query);
		
					// bind id of product to be updated
					$stmt->bindParam(1, $this->id);
			
					// execute query
					$stmt->execute();
			
					return $stmt;
		}


			// read products
			public function read_client_docs_pub(){

				$query = "SELECT Q.clienteId, Q.descripcion, Q.archivo, Q.ubicacion, Q.id, R.tipo_documento FROM Documentos Q 
				 LEFT JOIN tipo_documento  R  ON R.id = Q.tipoDocumentoId
				 WHERE  Q.clienteId = ? AND Q.estadodocumento = 3 ";
		
					// prepare query statement
					$stmt = $this->conn->prepare($query);
		
					// bind id of product to be updated
					$stmt->bindParam(1, $this->id);
			
					// execute query
					$stmt->execute();
			
					return $stmt;
		}

			public function read_client_docs_pub_tipo(){
				$query = "SELECT Q.clienteId, Q.descripcion, Q.archivo, Q.ubicacion, Q.id, R.tipo_documento,R.id AS idTipo,Q.fechaRegistro,Q.informedescargado FROM Documentos Q 
				 LEFT JOIN tipo_documento  R  ON R.id = Q.tipoDocumentoId
				 WHERE  Q.clienteId = ? AND Q.estadodocumento = 3 AND R.id= ? ORDER BY Q.fechaRegistro desc,Q.informedescargado asc ";
					// prepare query statement
					$stmt = $this->conn->prepare($query);
					// bind id of product to be updated
					$stmt->bindParam(1, $this->id);
					$stmt->bindParam(2, $this->tipo);
					// execute query
					$stmt->execute();
					return $stmt;
		}
			// Total por tipo de informes, existentes y nuevos
			public function read_client_docs_total_news(){
				$query = "SELECT D1.id,D1.tipo_documento,IFNULL(G1.contadorExiste,0) AS contadorExiste,IFNULL(G2.contadorNuevos,0) AS contadorNuevos FROM tipo_documento D1
						LEFT JOIN
						(
						SELECT T.id,T.tipo_documento,COUNT(D.clienteId) as contadorExiste FROM tipo_documento T left join documentos D 
						on T.id=D.tipoDocumentoId
						WHERE
						d.clienteId= ? 
						and d.estadodocumento=3
						group by 1,2
						) G1
						ON D1.id=G1.id
						LEFT JOIN
						(
						SELECT T.id,T.tipo_documento,COUNT(D.clienteId) as contadorNuevos FROM tipo_documento T left join documentos D 
						on T.id=D.tipoDocumentoId
						WHERE
						d.clienteId= ? 
						and d.estadodocumento=3
						and d.informedescargado=0
						group by 1,2
						) G2
						ON D1.id=G2.id";
					// prepare query statement
					$stmt = $this->conn->prepare($query);
					// bind id of product to be updated
					$stmt->bindParam(1, $this->id);
					$stmt->bindParam(2, $this->id);
					// execute query
					$stmt->execute();
					return $stmt;
		}


			// read products
			public function read_documents_client(){

				$query = "SELECT P.idcliente, Q.descripcion, Q.archivo, Q.ubicacion, Q.tipoDocumentoId, Q.id, S.estado, R.tipo_documento, U.nombre FROM encargado_cuenta P 
				RIGHT JOIN documentos Q ON Q.clienteId = P.idcliente AND Q.estadodocumento = 2
				LEFT JOIN estado_documentos S ON S.id = Q.estadodocumento
		        LEFT JOIN tipo_documento  R  ON R.id = Q.tipoDocumentoId
		        LEFT JOIN usuarios   U ON U.id = P.idcliente
				WHERE  P.idempleado = ? AND P.idcliente = ? ";
		
					// prepare query statement
					$stmt = $this->conn->prepare($query);
		
					// bind id of product to be updated
					$stmt->bindParam(1, $this->autorId);
					$stmt->bindParam(2, $this->clienteId);
			
					// execute query
					$stmt->execute();
			
					return $stmt;
		}


			// read products
			public function documentos_cliente_publicado(){

				$query = "SELECT P.idcliente, Q.descripcion, Q.archivo, Q.ubicacion, Q.tipoDocumentoId, Q.id, S.estado, R.tipo_documento, U.nombre, Q.informedescargado,Q.fechadescarga,Q.fechaRegistro  FROM encargado_cuenta P 
				RIGHT JOIN documentos Q ON Q.clienteId = P.idcliente AND Q.estadodocumento = 2
				LEFT JOIN estado_documentos S ON S.id = Q.estadodocumento
		        LEFT JOIN tipo_documento  R  ON R.id = Q.tipoDocumentoId
		        LEFT JOIN usuarios   U ON U.id = P.idcliente
				WHERE  P.idempleado = ? AND P.idcliente = ? ";
		
					// prepare query statement
					$stmt = $this->conn->prepare($query);
		
					// bind id of product to be updated
					$stmt->bindParam(1, $this->autorId);
					$stmt->bindParam(2, $this->clienteId);
			
					// execute query
					$stmt->execute();
			
					return $stmt;
		}


	public function read_client_type(){

		$query = "SELECT id, descripcion, ubicacion, archivo, tipoAccesoId, clienteId, tipoDocumentoId, fechaRegistro, autorId, estadodocumento, informedescargado, fechadescarga FROM " . $this->table_name . " WHERE  clienteId = ? AND tipoDocumentoId = ?";
	
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

		$query = "SELECT id, descripcion, ubicacion, archivo, tipoAccesoId, clienteId, tipoDocumentoId, fechaRegistro, autorId, estadodocumento, informedescargado, fechadescarga FROM " . $this->table_name . " WHERE clienteId = :cli AND tipoDocumentoId = :tip AND descripcion LIKE  :foo ";
	
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
		$query = "SELECT P.id, P.descripcion, P.ubicacion, P.archivo, P.clienteId, P.tipoAccesoId, P.tipoDocumentoId, P.fechaRegistro, P.autorId, P.estadodocumento, P.informedescargado, P.fechadescarga, P.comentarios FROM " . $this->table_name . " P LEFT JOIN estado_documentos Q ON Q.id = P.estadodocumento
				WHERE  P.id = ?
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

		$this->estadodocumento = $row['estadodocumento'];
		$this->informedescargado = $row['informedescargado'];
		$this->fechadescarga = $row['fechadescarga'];
		$this->comentarios = $row['comentarios'];
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
					comentarios = :comentarios					
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
		$this->comentarios=strip_tags($this->comentarios);
	
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':descripcion', $this->descripcion);
		$stmt->bindParam(':archivo', $this->archivo);
		$stmt->bindParam(':ubicacion', $this->ubicacion);
		$stmt->bindParam(':tipoAccesoId', $this->tipoAccesoId);
		$stmt->bindParam(':clienteId', $this->clienteId);
		$stmt->bindParam(':tipoDocumentoId', $this->tipoDocumentoId);
		$stmt->bindParam(':comentarios', $this->comentarios);
				 			
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}


	function cambioestado(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET
					estadodocumento=:estadodocumento,
					fecharegistro=NOW()							
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		

		$this->estadodocumento=strip_tags($this->estadodocumento);
		
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		
		$stmt->bindParam(':estadodocumento', $this->estadodocumento);
	   			
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}


	
	function regresaaempleado(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET
					estadodocumento=:estadodocumento,
					comentarios=:comentarios,
					fecharegistro=NOW()							
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		

		$this->estadodocumento=strip_tags($this->estadodocumento);
		$this->comentarios=htmlspecialchars(strip_tags($this->comentarios));
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		
		$stmt->bindParam(':estadodocumento', $this->estadodocumento);
		$stmt->bindParam(':comentarios', $this->comentarios);		
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}


	function fueDescargado(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET
				  informedescargado=:informedescargado,
                  fechadescarga = now()
				WHERE
					id = :id and informedescargado=0";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		

		$this->informedescargado=strip_tags($this->informedescargado);
		//$this->fechadescarga=strip_tags($this->fechadescarga);
		
		
		$this->id=strip_tags($this->id);

		// bind new values
		
		$stmt->bindParam(':informedescargado', $this->informedescargado);
		//$stmt->bindParam(':fechadescarga', $this->fechadescarga);
	   			
		$stmt->bindParam(':id', $this->id);

		// execute the query
		if($stmt->execute()){
			return true;
		}else{
			echo "<pre>";
				print_r($stmt->errorInfo());
			echo "</pre>";

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
