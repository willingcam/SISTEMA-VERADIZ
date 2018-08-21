<?php
class Database{

	// specify your own database credentials
	
	//SERVIDOR
	//private $host = "localhost";
	//private $db_name = "veradizc_sistema";
	//private $username = "veradizc";
	//private $password = "5y1mAilW41";
	
	//LOCAL
	private $host = "localhost";
	private $db_name = "veradiz";
	private $username = "root";
	private $password = "";

	public $conn;

	// get the database connection
	public function getConnection(){

		$this->conn = null;

		try{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
			$this->conn->exec("set names utf8");
		}catch(PDOException $exception){
			echo "Connection error: " . $exception->getMessage();
		}

		return $this->conn;
	}
}
?>
