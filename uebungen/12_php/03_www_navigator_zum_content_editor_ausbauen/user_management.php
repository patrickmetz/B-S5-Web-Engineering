<?php

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING ^ E_DEPRECATED);

abstract class UserManagement
{
    protected $_userName;
    protected $_userPass;
    protected $_minLength = 3;

    protected $_isSuccess;
    protected $_hasError;

    protected $_successMessage;
    protected $_errorMessage;

    protected $_credentialsPath;

    public function __construct($credentialsPath)
    {
        $this->_credentialsPath = $credentialsPath;
        $this->_userName = $this->_filteredPostVariable('user_name');
        $this->_userPass = $this->_filteredPostVariable('user_pass');

        if (
            $this->_isInputOk("Benutzername", $this->_userName)
            and
            $this->_isInputOk("Passwort", $this->_userPass)
            and
            $this->_userAction()
        ) {
            $this->_isSuccess = true;
        } else {
            $this->_hasError = true;
        }
    }

    abstract protected function _userAction();

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

    protected function _isInputOk($name, $value)
    {
        $value = trim($value);

        if ((empty($value)) or (strlen($value) < $this->_minLength)) {
            $this->_logError(
                $name . " muss mindestens $this->_minLength Zeichen lang sein.\n"
            );
            return false;
        }

        return true;
    }
}