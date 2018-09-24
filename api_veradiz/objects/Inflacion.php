<?php
class inflacion{

	// database connection and table name
	private $conn;
	private $table_name = "inflacion";

	// object properties
	public $id;
	public $anio;
	public $mes;
	public $valor;
	public $porcen_mensual;
	public $porcen_acumulada;
	public $porcen_acumvsanioanterior;
	
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
				SET anio=:anio, mes=:mes,  valor=:valor, porcen_mensual=:porcen_mensual,porcen_acumulada=:porcen_acumulada,porcen_acumvsanioanterior=:porcen_acumvsanioanterior ";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->anio=strip_tags($this->anio);
		$this->mes=strip_tags($this->mes);
		$this->valor=strip_tags($this->valor);
		$this->porcen_mensual=strip_tags($this->porcen_mensual);
		$this->porcen_acumulada=strip_tags($this->porcen_acumulada);
		$this->porcen_acumvsanioanterior=strip_tags($this->porcen_acumvsanioanterior);

				

		// bind values
		$stmt->bindParam(":anio", $this->anio);
		$stmt->bindParam(":mes", $this->mes);
		$stmt->bindParam(":valor", $this->valor);
		$stmt->bindParam(":porcen_mensual", $this->porcen_mensual);
		$stmt->bindParam(":porcen_acumulada", $this->porcen_acumulada);
		$stmt->bindParam(":porcen_acumvsanioanterior", $this->porcen_acumvsanioanterior);
		

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
		$query = "SELECT p.id, p.anio,p.mes, p.valor, p.porcen_mensual, p.porcen_acumulada, p.porcen_acumvsanioanterior FROM " . $this->table_name . " p  ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT p.id, p.anio,p.mes, p.valor, p.porcen_mensual, p.porcen_acumulada, p.porcen_acumvsanioanterior
				FROM " . $this->table_name . "  p
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
		$this->anio = $row['anio'];
		$this->mes = $row['mes'];
		$this->valor = $row['valor'];

		$this->porcen_mensual=$row['porcen_mensual'];
		$this->porcen_acumulada=$row['porcen_acumulada'];
		$this->porcen_acumvsanioanterior=$row['porcen_acumvsanioanterior'];

			
		
	}


	// update the product
	function update(){

		// update query
		$query = "UPDATE " . $this->table_name . "
				SET
					anio = :anio,
					mes = :mes,
					valor = :valor,
					porcen_mensual =:porcen_mensual,
					porcen_acumulada =:porcen_acumulada,
					porcen_acumvsanioanterior =:porcen_acumvsanioanterior
				WHERE
					id = :id";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->mes=htmlspecialchars(strip_tags($this->mes));
		$this->valor=htmlspecialchars(strip_tags($this->valor));
		$this->porcen_mensual=htmlspecialchars(strip_tags($this->porcen_mensual));
		$this->porcen_acumulada=htmlspecialchars(strip_tags($this->porcen_acumulada));
		$this->porcen_acumvsanioanterior=htmlspecialchars(strip_tags($this->porcen_acumvsanioanterior));

		$this->id=htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(':anio', $this->anio);
		$stmt->bindParam(':mes', $this->mes);
		$stmt->bindParam(':valor', $this->valor);
		$stmt->bindParam(':porcen_mensual', $this->porcen_mensual);
		$stmt->bindParam(':porcen_acumulada', $this->porcen_acumulada);
		$stmt->bindParam(':porcen_acumvsanioanterior', $this->porcen_acumvsanioanterior);
				
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
