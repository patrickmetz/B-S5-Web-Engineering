<?php

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING ^ E_DEPRECATED);

class Loggable
{
    private $_isSuccess = false;
    private $_hasError = false;

    private $_successMessage;
    private $_errorMessage;

    public function getSuccessMessage()
    {
        return $this->_successMessage;
    }

    public function getErrorMessage()
    {
        return $this->_errorMessage;
    }

    public function isSuccess()
    {
        return $this->_isSuccess;
    }

    public function logSuccess($reason)
    {
        $this->_successMessage .= $reason . "</br>";

        $this->_isSuccess = true;
    }

    public function hasError()
    {
        return $this->_hasError;
    }

    public function logError($reason)
    {
        $this->_errorMessage .= $reason . "</br>";

        $this->_hasError = true;
    }

}