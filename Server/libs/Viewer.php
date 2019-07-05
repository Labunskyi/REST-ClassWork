<?php

class Viewer {
		
        public function show_results($result, $viewType = '.json')
		{
        header('Access-Control-Allow-Origin: *');
        switch ($viewType) {
            case '.json':
                header('Content-Type: application/json');
                echo json_encode($result);
                break;
            case '.txt':
                header('Content-type: text/plain');
                echo self::toText($result);
                break;
            case '.html':
                header('Content-type: text/html');
                echo self::toHtml($result);
                break;
            case '.xml':
                header('Content-type: application/xml');
                echo self::toXml($result);
                break;
			case '':
                header('Content-Type: application/json');
                echo json_encode($result);
                break;
            default:
                echo 'No such type!';
                break;
        }
    }
	
    private function toText($obj)
    {
        return print_r($obj);
    }
	
    private function toHtml($obj)
    {
        $res = '<table>';

        $first = $obj[0];
        $res .= '<tr>';
        foreach ($first as $key => $val)
		{
			$res .= '<th>' . $key . '</th>';
        }
        $res .= '</tr>';
        foreach ($obj as $item)
        {
			$res .= '<tr>';
			foreach ($item as $field)
			{
				$res .= '<td>' . $field . '</td>';
			}
        }
        $res .= '</tr>';


        return $res;
    }
	
    private function toXml($obj)
    {
        $xml = new SimpleXMLElement('<cars/>');
        $arrToParse = $obj;
        if (is_object($obj))
        {
            $arrToParse = [$obj];
        }
        foreach ($arrToParse as $item)
        {
            $car = $xml->addChild('car');
            foreach ($item as $key => $val)
            {
                $car->addChild($key, $val);
            }
        }
        return $xml->asXML();
    }
}
?>