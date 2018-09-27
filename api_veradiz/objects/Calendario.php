<?php
class Calendario{

	
	private $conn;
	private $table_name = "calendario";

	// object properties
	public $id;
    public $anio;
    public $mes;
    public $dia;
    public $habil;
    public $fix;
    public $dof;
    public $pago;
    public $bitacora;
	public $creado;
	
	public $fechaInicio;
	public $fechaTermino;

	public $valor;
	public $fecha;

	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}
	
	// create product
	function create(){

		// query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET anio=:anio, mes=:mes, dia=:dia, habil=:habil, fix=:fix, dof=:dof, pago=:pago, bitacora=:bitacora, creado=:creado";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
	
		$this->anio=strip_tags($this->anio);
        $this->mes=strip_tags($this->mes);
        $this->dia=strip_tags($this->dia);
        $this->habil=strip_tags($this->habil);
        $this->fix=strip_tags($this->fix);
        $this->dof=strip_tags($this->dof);
        $this->pago=strip_tags($this->pago);
        $this->bitacora=strip_tags($this->bitacora);
        $this->creado=strip_tags($this->creado);
	
		// bind values
		$stmt->bindParam(":anio", $this->anio);
        $stmt->bindParam(":mes", $this->mes);
        $stmt->bindParam(":dia", $this->dia);
        $stmt->bindParam(":habil", $this->habil);
        $stmt->bindParam(":fix", $this->fix);
        $stmt->bindParam(":dof", $this->dof);
        $stmt->bindParam(":pago", $this->pago);
        $stmt->bindParam(":bitacora", $this->bitacora);
        $stmt->bindParam(":creado", $this->creado);
					
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



// create product
function registroDolar(){

	// query to insert record
	$query = "INSERT INTO  dolar SET valor=:valor, fecha=:fecha";

	// prepare query
	$stmt = $this->conn->prepare($query);

	// sanitize

	$this->valor=strip_tags($this->valor);
	$this->fecha=strip_tags($this->fecha);

	// bind values
	$stmt->bindParam(":valor", $this->valor);
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




	// used when filling up the update product form
	function readOne(){

		// query to read single record
		$query = "SELECT pago FROM " . $this->table_name . " 
				WHERE  anio = ? AND mes = ? AND pago >0  ORDER BY dia DESC
				LIMIT 0,1";

		// prepare query statement
		$stmt = $this->conn->prepare( $query );

		// bind id of product to be updated
		$stmt->bindParam(1, $this->anio);
		$stmt->bindParam(2, $this->mes);
		

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		$this->valor = $row['pago'];
		
	}
	 
	// read products
	public function read_year(){

		// select all query
		$query = " SELECT * FROM  Calendario  WHERE anio = ?";

		// prepare query statement
        $stmt = $this->conn->prepare($query);
        
       	// bind id of product to be updated
		$stmt->bindParam(1, $this->anio);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	
	// update the product
	function update(){

		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					fix = :fix,
					dof = :dof,
					pago = :pago
					
				WHERE anio =:anio AND mes=:mes AND dia=:dia";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->fix=htmlspecialchars(strip_tags($this->fix));
		$this->dof=htmlspecialchars(strip_tags($this->dof));
		$this->pago=htmlspecialchars(strip_tags($this->pago));
		$this->anio=htmlspecialchars(strip_tags($this->anio));
		$this->mes=htmlspecialchars(strip_tags($this->mes));
		$this->dia=htmlspecialchars(strip_tags($this->dia));

		// bind new values
		$stmt->bindParam(':fix', $this->fix);
		$stmt->bindParam(':dof', $this->dof);
		$stmt->bindParam(':pago', $this->pago);
		$stmt->bindParam(':anio', $this->anio);
		$stmt->bindParam(':mes', $this->mes);
		$stmt->bindParam(':dia', $this->dia);

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


		// used when filling up the update product form
		function readLastRecordsValid(){

	
		// select all query
		$query = " SELECT anio, mes, dia , fix FROM  Calendario WHERE anio = ? AND mes = ? AND dia < ? AND habil = 1  ORDER BY  dia desc  LIMIT 2 ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

				// bind id of product to be updated
				$stmt->bindParam(1, $this->anio);
				$stmt->bindParam(2, $this->mes);
				$stmt->bindParam(3, $this->dia);
	

		// execute query
		$stmt->execute();

		return $stmt;
			
		}

		// read products
		public function readPeriodoDolar(){

			// select all query
			   			$query = " SELECT a.id, a.fecha, a.valor, TRUNCATE(a.valor-COALESCE(b.valor,a.valor),4) as difDiaAnterior 
					   FROM dolar a 
					   LEFT JOIN dolar b on a.fecha=b.fecha+1
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
                        
                             
                   
		// read products
		public function  graficaPeriodoDolar(){

					// select all query
							  $query = " SELECT  a.fecha, a.valor  
							   FROM dolar a 
							   WHERE a.fecha BETWEEN '".$this->fechaInicio."' AND '".$this->fechaTermino."'
							   order by a.fecha asc ";
					
					// prepare query statement
					$stmt = $this->conn->prepare($query);
					
					// execute query
					$stmt->execute();
					
					return $stmt;
		}

}
?>
