<?php
class DolarTemp{

	// database connection and table name
	private $conn;
	private $table_name = "dolarTemp";

	// object properties
	public $id;
	public $fecha;
	public $fix;
	public $dof;
	public $pagos;

	// constructor with $db as database connection
	public function __construct($db){
		$this->conn = $db;
	}
	
	

	// read products
	public function read(){

		// select all query
		$query = " SELECT fecha, fix, dof, pagos FROM  dolarTemp ORDER BY fecha ";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}
	

	
	


}
?>
