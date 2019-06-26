<?php
class SQL
{
    function __construct()
    {
        
		$this->conn = new PDO("mysql:host=".HOST.";dbname=".DB_NAME.";charset=utf8", PASSWORD, USER);
           
    }
    function select()
    {
        try
        {
            $res = $this->conn->query($this->sql);
        }catch(Exception $e)
        {
            $msg = "Error in query \n\"".$this->sql."\"\n: ".$e->getMessage();
            throw new Exception($msg);
        }
        return $res;
    }
    function insert($params)
    {
        $this->prepStmt($params);
    }
    function update($params)
    {
        $this->prepStmt($params);
    }
    function delete($params)
    {
        $this->prepStmt($params);
    }
    private function prepStmt($params)
    {
        if ($params && is_array($params))
        {
            try
            {
                $statement = $this->link->prepare($this->sql);
                $statement->execute($params);
            }catch(Exception $e)
            {
                throw new Exception("Error in query \n\"".$this->sql."\"\n: ".$e->getMessage());
            }
        }    
    }
    function validString($str)
    {
        if ($str && is_string($str))
        {
            return true;
        }else
        {
            return false;
        }
    }
    function setSql($sql)
    {
        $this->sql = $sql;
    }
    function getSql()
    {
        return $this->sql;
    }
    
}
?>