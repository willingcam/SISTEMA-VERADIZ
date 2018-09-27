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
		
	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}

	// create object
	function create(){

		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET imensual=:imensual, acumuladaa=:acumuladaa, inflaciona=:inflaciona, fecha=:fecha";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
	
		$this->imensual=strip_tags($this->imensual);
		$this->acumuladaa=strip_tags($this->acumuladaa);
		$this->inflaciona=strip_tags($this->inflaciona);
		$this->fecha=strip_tags($this->fecha);
	
		// bind values
		$stmt->bindParam(":imensual", $this->imensual);
		$stmt->bindParam(":acumuladaa", $this->acumuladaa);
		$stmt->bindParam(":inflaciona", $this->inflaciona);
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




}
?>
