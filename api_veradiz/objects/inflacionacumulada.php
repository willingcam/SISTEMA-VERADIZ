<?php
class INFLACIONACUMULADA{

	// database connection and table name
	private $conn;
	private $table_name = "inflacion_acumulada_anual";

	// object properties
	public $id;
	public $imensual;
	public $acumuladaa;
	public $inflaciona;
	public $fecha;
	public $fechaInicio;
	public $fechaTermino;
	public $datoinflacion;

	public $mes;
	public $anio;
		
	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	// create object
	function create(){

		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET imensual=:imensual, acumuladaa=:acumuladaa, inflaciona=:inflaciona, fecha=:fecha, mes=:mes, anio=:anio";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
	
		$this->imensual=strip_tags($this->imensual);
		$this->acumuladaa=strip_tags($this->acumuladaa);
		$this->inflaciona=strip_tags($this->inflaciona);
		
		$this->mes=strip_tags($this->mes);
		$this->anio=strip_tags($this->anio);
		$this->fecha=strip_tags($this->fecha);
	
		// bind values
		$stmt->bindParam(":imensual", $this->imensual);
		$stmt->bindParam(":acumuladaa", $this->acumuladaa);
		$stmt->bindParam(":inflaciona", $this->inflaciona);
		$stmt->bindParam(":fecha", $this->fecha);
		$stmt->bindParam(":mes", $this->mes);
		$stmt->bindParam(":anio", $this->anio);
					
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
		$query = " SELECT id, imensual, acumuladaa, inflaciona , fecha FROM  inflacion_acumulada_anual ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
		// read products
	public function readPeriodo(){

			// select all query
			//$query = " SELECT valor, fecha FROM  cetes28 WHERE fecha BETWEEN '".$this->fechaInicio."' AND '".$this->fechaTermino."' ";
			$query = " SELECT a.id, a.fecha, a.imensual, a.acumuladaa, a.inflaciona  
			FROM inflacion_acumulada_anual  a 
			WHERE a.fecha BETWEEN '".$this->fechaInicio."' AND '".$this->fechaTermino."'
			order by a.fecha desc ";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);
	

		    // bind id of product to be updated
		    $stmt->bindValue(':start', $this->fechaInicio);
		    $stmt->bindValue(':end', $this->fechaTermino);

			// execute query
			$stmt->execute();
	
			return $stmt;
	}

	public function  graficaInflacion(){

			// select all query
					  $query = " SELECT  a.fecha, a.imensual, a.acumuladaa, a.inflaciona  
					   FROM inflacion_acumulada_anual  a 
					   WHERE a.fecha BETWEEN '".$this->fechaInicio."' AND '".$this->fechaTermino."'
					   order by a.fecha asc ";
			
			// prepare query statement
			$stmt = $this->conn->prepare($query);
			
			// execute query
			$stmt->execute();
			
			return $stmt;
    }


		// delete the product
	function delete(){

			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE anio = ? AND mes = ?";

			// prepare query
			$stmt = $this->conn->prepare($query);

			// sanitize
			$this->anio= strip_tags($this->anio);
			$this->mes= strip_tags($this->mes);

			// bind id of record to delete
			$stmt->bindParam(1, $this->anio);
			$stmt->bindParam(2, $this->mes);

			// execute query
			if($stmt->execute()){
				return true;
			}else{ 
			  return false;
			}

	}

	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT p.id 
				FROM " . $this->table_name . "  p
				WHERE mes = ? AND anio = ?
				LIMIT 0,1";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind id of product to be updated
		$stmt->bindParam(1, $this->mes);
		$stmt->bindParam(2, $this->anio);

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		$this->id = $row['id'];

		
	}


	function update(){

			// update query
			$query = "UPDATE inflacion_acumulada_anual
					SET imensual =:imensual, acumuladaa=:acumuladaa, inflaciona=:inflaciona
					WHERE id =:id ";
	
			// prepare query statement
			$stmt = $this->conn->prepare($query);
	

			$stmt->bindParam(":id", $this->id);
			$stmt->bindParam(":imensual", $this->imensual);
			$stmt->bindParam(":acumuladaa", $this->acumuladaa);
			$stmt->bindParam(":inflaciona", $this->inflaciona);

					
			// execute the query
			if($stmt->execute()){
				return true;
			}else{
				return false;
			}
	}


}
?>
