<?php
error_reporting(E_ALL ^ E_NOTICE);

class Login
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
            $this->_startSession()

        ) {
            $this->_successMessage = "Benutzer {$this->_userName} wurde angemeldet.";
            $this->_isSuccess = true;
        } else {
            $this->_hasError = true;
        }
    }

    private function _startSession()
    {
        if($this->_existsUser()){
            setcookie("eingeloggt", "1", time() + 300); // five minutes session
            $this->_successMessage = "Benutzer {$this->_userName} wurde angemeldet.";

            return true;
        }

        $this->_logError("Benutzer {$this->_userName} existiert nicht.");

        return false;
    }

    private function _existsUser()
    {
        $fileContent = $this->_readCredentialsFile();

        // source: https://stackoverflow.com/a/11165332
        $splittedByLines = preg_split("/\r\n|\n|\r/", $fileContent);

        // find user entry
        foreach ($splittedByLines as $line) {
            $splittedByTab = preg_split("/\t/", $line);
            $userName = $splittedByTab[0];
            $userPass = $splittedByTab[1];

            if (
                ($userName === $this->_userName)
                && ($userPass === $this->_userPass)
            ) {
                return true;
            }

        }
        return false;
    }

    private function _readCredentialsFile()
    {
        $fileContent = null;
        $file = fopen($this->_credentialsPath, "r");

        // LOCK_SH = "reader lock" for efficient multiple concurrent reading of file which may be locked
        if (flock($file, LOCK_SH)) {
            $fileContent = fread($file, pow(2, 16)); // read up to 2 gigabyte
            flock($file, LOCK_UN);
        } else {
            $this->_logError("Daten konnten nicht geladen werden.");
        }
        fclose($file);

        return $fileContent;
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

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login-Ergebnis</title>
</head>
<body>

<div>
    <?PHP

    if($_COOKIE["eingeloggt"] !== "1"){
        $login = new Login("../credentials.txt");

        if ($login->hasError()) {
            echo $login->getErrorMessage();
        } elseif ($login->isSuccess()) {
            echo $login->getSuccessMessage();
        }
    }else{
        echo "Sie sind bereits angemeldet.";
    }

    ?>
</div>

<input type="button" value="zurück" onclick="history.back();">

</body>
</html>