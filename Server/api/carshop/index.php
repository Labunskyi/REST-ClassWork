<?php
include_once "../../libs/RestServer.php";
include_once "../../libs/SQL.php";

include_once "../../config.php";
class Carshop
{
    public function getCarshop($params=false)
    {
        if ($params)
        {
            $id = $params[0];
            if (is_numeric($id))
            {
                return $this->getById($id);
            }
        }
        
        try
        {
            $mysql = new SQL();
            $mysql->setSql("SELECT * FROM car");

            $result = $mysql->select();
            
        }catch(Exception $e)
        {
            throw new Exception($e->getMessage());
        }
        return $result->fetchAll(PDO::FETCH_OBJ);
    }
 
    private function getById($id)
    {
        
        if ( !$id || !is_numeric($id) || $id<0)
        {
            throw new Exception(ERR_CAR_ID_INVALID);
        }
        try
        {
            $mysql = new SQL();
            $mysql->setSql("SELECT * FROM car WHERE carid=$id");
            $result = $mysql->select();
        }catch(Exception $e)
        {
            throw new Exception($e->getMessage());
        }
        return $result->fetch(PDO::FETCH_OBJ);
    }
   
    
}
$cars = new Carshop();

$server = new RestServer($cars);
