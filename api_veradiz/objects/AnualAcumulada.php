<?php
class AnualAcumulada{

	// database connection and table name
	private $conn;
	private $table_name = "inflacion_acumulada_anual";

	// object properties
	public $id;
	public $mes;
	public $anio;
	public $valor;
	public $tipoIndicador;
	

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
			      SET mes=:mes, anio=:anio, valor=:valor, tipoIndicador=:tipoIndicador";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		
		$this->mes=htmlspecialchars(strip_tags($this->mes));
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->valor=htmlspecialchars(strip_tags($this->valor));		
		$this->tipoIndicador=htmlspecialchars(strip_tags($this->tipoIndicador));
		
		// bind values
		
		$stmt->bindParam(":mes", $this->mes);
		$stmt->bindParam(":anio", $this->anio);
		$stmt->bindParam(":valor", $this->valor);		
		$stmt->bindParam(":tipoIndicador", $this->tipoIndicador);
		
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
		$query = "SELECT p.id , p.mes, p.anio, p.valor, p.tipoIndicador, c.indicador  
                  FROM " . $this->table_name . "  p
		          LEFT JOIN 	tipo_indicador c ON p.id = c.id 		";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT p.id,  p.mes, p.anio, p.valor, p.tipoIndicador, c.indicador
				FROM " . $this->table_name . "  p
				LEFT JOIN 	tipo_indicador c ON p.id = c.id 
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
		$this->id = $row['id'];
		$this->mes = $row['mes'];
		$this->anio = $row['anio'];
		$this->valor = $row['valor'];
		$this->tipoIndicador = $row['tipoIndicador'];
		
	}

	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){

		// select query
		$query = "SELECT p.id,  p.mes, p.anio, p.valor, p.tipoIndicador , c.indicador
				FROM  " . $this->table_name . " p 	
				LEFT JOIN 	tipo_indicador c ON p.id = c.id 			
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
					mes = :mes,
					anio = :anio,
					valor = :valor,
					tipoIndicador = :tipoIndicador				
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		
		$this->mes=htmlspecialchars(strip_tags($this->mes));
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->valor=htmlspecialchars(strip_tags($this->valor));
		$this->tipoIndicador=htmlspecialchars(strip_tags($this->tipoIndicador));
		
		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		
		$stmt->bindParam(':mes', $this->price);
		$stmt->bindParam(':anio', $this->anio);
		$stmt->bindParam(':valor', $this->valor);
		$stmt->bindParam(':tipoIndicador', $this->tipoIndicador);
		
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
