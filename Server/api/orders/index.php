<?php
include_once "../../libs/RestServer.php";
include_once "../../config.php";

class Orders
{
	
	function __construct()
    {
        
		$this->conn = new PDO("mysql:host=".HOST.";dbname=".DB_NAME.";charset=utf8", USER, PASSWORD);
           
    }
	public function postOrders()
    {
        
		$order = $_POST['orderData'];
        $carid = $order['carid'];
		$userid = $order['userid'];
        $name = $order['name'];
		$payment = $order['payment'];
       
        $sqlQuery = "INSERT INTO `order` (`carid`, `userid`, `name`, `payment`) VALUES ('$carid', '$userid', '$name', '$payment')";
		$result = $this->conn->query($sqlQuery) ;
       
        return ['carid' => $carid];

    }
	
	public function postOrderList()
    {
		$userid = $_POST['userid'];
        
		$sqlQuery = "SELECT car.Brand, car.Model, car.Capacity, car.Year, car.Speed, car.Price FROM car INNER JOIN `order` AS ord ON car.carid = ord.carid 
		WHERE ord.userid = '$userid'";
		$result = $this->conn->query($sqlQuery);    
        
		$resultArray = array ();
		while ($row = $result->fetchAll(PDO::FETCH_OBJ) ) {
			$resultArray[] = $row;
		}
		$resultArr = array ();
		foreach ($resultArray as $resultArr) {
			return $resultArr;
		}


    }
	
	public function postToken()
	{	
		if (isset($_POST['token'])) {
		$token = $_POST['token'];
		$sqlQuery = "SELECT UserId, username, password, token FROM `users` WHERE token = '$token'";
        $result = $this->conn->query($sqlQuery);
		
		$resultArray = array ();
			while ($row = $result->fetchAll(PDO::FETCH_ASSOC) ) {
				$resultArray[] = $row;
			}
		$tokenComperative = $resultArray[0][0]['token'];
		$userid = $resultArray[0][0]['UserId'];
        if($token === $tokenComperative) {
            return ['token' => $token, 'userid' => $userid ];
        }
        return false;
		}
		
	}
	
}
$orders = new Orders();
$server = new RestServer($orders);
