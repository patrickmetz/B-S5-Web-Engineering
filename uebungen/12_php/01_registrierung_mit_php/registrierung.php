<?php

class Registration
{
    private $_userName;
    private $_userPass;
    private $_minLength = 3;

    private $_hasError;
    private $_errorMessage;

    private $_isSuccess;
    private $_successMessage;
    private $_credentialsPath;

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
            $this->_saveCredentials()  //todo: also check existing users

        ) {
            $this->_successMessage = "Benutzer {$this->_userName} wurde angelegt.";
            $this->_isSuccess = true;
        } else {
            $this->_hasError = true;
        }
    }

    private function _filteredPostVariable($name)
    {
        return filter_input(INPUT_POST, $name, FILTER_SANITIZE_STRING);
    }

    private function _isInputOk($name, $value)
    {
        $value = trim($value);

        if ((empty($value)) or (strlen($value) < $this->_minLength)) {
            $this->_logError(
                $name . " muss mindestens {$this->_minLength} Zeichen lang sein.\n"
            );
            return false;
        }

        return true;
    }

    private function _saveCredentials()
    {
        if (file_put_contents(
            $this->_credentialsPath,
            // tab separated. users can't enter tabs
            $this->_userName . "\t" . $this->_userPass . "\n",
            FILE_APPEND | LOCK_EX
        )) {
            return true;
        }

        $this->_logError("Daten konnten nicht gespeichert werden.");

        return false;
    }

    private function _logError($error)
    {
        $this->_errorMessage .= $error . "</br>";
    }

    public function hasError()
    {
        return $this->_hasError;
    }

    public function isSuccess()
    {
        return $this->_isSuccess;
    }

    public function getErrorMessage()
    {
        return $this->_errorMessage;
    }

    public function getSuccessMessage()
    {
        return $this->_successMessage;
    }
}

$registration = new Registration("../credentials.txt");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div>
    <?PHP
    if ($registration->hasError()) {
        echo $registration->getErrorMessage();
    } elseif ($registration->isSuccess()) {
        echo $registration->getSuccessMessage();
    }
    ?>
</div>

<input type="button" value="zurück" onclick="history.back();">

</body>
</html>