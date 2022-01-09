<?php

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING ^ E_DEPRECATED);

class UserManagement
{
    protected $_isSuccess;
    protected $_hasError;

    protected $_successMessage;
    protected $_errorMessage;


    public function getSuccessMessage()
    {
        return $this->_successMessage;
    }

    public function getErrorMessage()
    {
        return $this->_errorMessage;
    }

    public function hasError()
    {
        return $this->_hasError;
    }

    public function isSuccess()
    {
        return $this->_isSuccess;
    }

    protected function _logError($error)
    {
        $this->_errorMessage .= $error . "</br>";
    }

    protected function _filteredPostVariable($name)
    {
        return filter_input(INPUT_POST, $name, FILTER_SANITIZE_STRING);
    }

    protected function _isInputOk($name, $value, $minLength)
    {
        $value = trim($value);

        if ((empty($value)) or (strlen($value) < $minLength)) {
            $this->_logError(
                $name . " muss mindestens $minLength Zeichen lang sein.\n"
            );
            return false;
        }

        return true;
    }
}