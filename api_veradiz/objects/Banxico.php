<?php
class Banxico{

	const banxicourl = 'http://www.banxico.org.mx:80/DgieWSWeb/DgieWS?WSDL';
    private $_client;
	private $_debug = false;
	

	//Tipo de cambio Pesos por dólar E.U.A. Tipo de cambio para solventar obligaciones denominadas en moneda extranjera Fecha de determinación (FIX)
    public function getExRateDet()
    {
        $client = $this->_getClient();
        try
        {
            $result = $client->tiposDeCambioBanxico();
        }
        catch (SoapFault $e)
        {
            return $e->getMessage();
        }
        if(!empty($result))
        {
            $dom = new DOMDocument();
            $dom->loadXML($result);
            $xpath = new DOMXPath($dom);
            $xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
            $val = $xpath->evaluate("//*[@IDSERIE='SF43718']/*/@OBS_VALUE");
            return ($val->item(0)->value);
        }
	}
	
	//Tipo de cambio pesos por dólar E.U.A. Tipo de cambio para solventar obligaciones denominadas en moneda extranjera Fecha de liquidación
    public function getExRateLiq()
    {
        $client = $this->_getClient();
        try
        {
            $result = $client->tiposDeCambioBanxico();
        }
        catch (SoapFault $e)
        {
            return $e->getMessage();
        }
        if(!empty($result))
        {
            $dom = new DOMDocument();
            $dom->loadXML($result);
            $xpath = new DOMXPath($dom);
            $xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
            $val = $xpath->evaluate("//*[@IDSERIE='SF60653']/*/@OBS_VALUE");
            return ($val->item(0)->value);
        }
	}


	//Valores gubernamentales, Resultados de la subasta semanal Cetes a 28 días - Tasa de rendimiento - Fecha subasta
    public function getCetes28()
    {
        $client = $this->_getClient();
        try
        {
            $result = $client->tasasDeInteresBanxico();
        }
        catch (SoapFault $e)
        {
            return $e->getMessage();
        }
        if(!empty($result))
        {
            $dom = new DOMDocument();
            $dom->loadXML($result);
            $xpath = new DOMXPath($dom);
            $xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
            $val = $xpath->evaluate("//*[@IDSERIE='SF60633']/*/@OBS_VALUE");
            return ($val->item(0)->value);
        }
	}

	//Tasa objetivo
	public function getTasasObjetivo()
	{
			$client = $this->_getClient();
			try
			{
				$result = $client->tasasDeInteresBanxico();
			}
			catch (SoapFault $e)
			{
				return $e->getMessage();
			}
			if(!empty($result))
			{
				$dom = new DOMDocument();
				$dom->loadXML($result);
				$xpath = new DOMXPath($dom);
				$xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
				$val = $xpath->evaluate("//*[@IDSERIE='SF61745']/*/@OBS_VALUE");
				return ($val->item(0)->value);
			}
	}


	//Tasas de Interés Interbancarias TIIE a 28 días - Fecha determinación
	public function getTIIE28()
	{
		$client = $this->_getClient();
		try
		{
			$result = $client->tasasDeInteresBanxico();
		}
		catch (SoapFault $e)
		{
	        return $e->getMessage();
		}
		if(!empty($result))
		{
			$dom = new DOMDocument();
			$dom->loadXML($result);
			$xpath = new DOMXPath($dom);
			$xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
			$val = $xpath->evaluate("//*[@IDSERIE='SF60648']/*/@OBS_VALUE");
			return ($val->item(0)->value);
		}
	}



	//Tasas de Interés Interbancarias TIIE a 91 días - Fecha determinación
	public function getTIIE91()
	{
		$client = $this->_getClient();
		try
		{
			$result = $client->tasasDeInteresBanxico();
		}
		catch (SoapFault $e)
		{
	        return $e->getMessage();
		}
		if(!empty($result))
		{
			$dom = new DOMDocument();
			$dom->loadXML($result);
			$xpath = new DOMXPath($dom);
			$xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
			$val = $xpath->evaluate("//*[@IDSERIE='SF60649']/*/@OBS_VALUE");
			return ($val->item(0)->value);
		}
	}

	//Valor de UDIS
    public function getUDIS()
    {
        $client = $this->_getClient();
        try
        {
            $result = $client->udisBanxico();
        }
        catch (SoapFault $e)
        {
            return $e->getMessage();
        }
        if(!empty($result))
        {
            $dom = new DOMDocument();
            $dom->loadXML($result);
            $xpath = new DOMXPath($dom);
            $xpath->registerNamespace('bm', "http://ws.dgie.banxico.org.mx");
            $val = $xpath->evaluate("//*[@IDSERIE='SP68257']/*/@OBS_VALUE");
            return ($val->item(0)->value);
        }
	}

    /**
     * @return SoapClient
     */
    private function _getClient()
    {
        if(empty($this->_client)) {
            $this->_client = $this->_setClient();
        }
        return $this->_client;
    }
    /**
     * @return SoapClient
     */
    private function _setClient()
    {
        return new SoapClient(null,
            array('location' => self::banxicourl,
            'uri'      => 'http://DgieWSWeb/DgieWS?WSDL',
            'encoding' => 'ISO-8859-1',
            'trace'    => 1
            ));
    }
    private function _getDebug()
    {
        return $this->_debug;
    }

}
?>
