<?php

require_once "./Loggable.php";
require_once "./FormHelper.php";

class Login extends Loggable
{
    protected $_userName;
    protected $_userPass;
    protected $_credentialsPath;
    protected $_minLength = 3;

    public function __construct($credentialsPath, $userName, $userPass)
    {
        $this->_credentialsPath = $credentialsPath;
        $this->_userName = $userName;
        $this->_userPass = $userPass;
    }

    public function login()
    {
        if (
            $this->_isInputOk("Benutzername", $this->_userName, $this->_minLength)
            &&
            $this->_isInputOk("Passwort", $this->_userPass, $this->_minLength)
        ) {
            $this->_login();
        }
    }

    protected function _login()
    {
        if ($this->_existsUser()) {
            //todo: use php's session functionality, and a random session id
            setcookie("eingeloggt", "1", time() + 300); // five-minute session
            $this->logSuccess("Benutzer {$this->_userName} wurde eingeloggt.");

            return true;
        }

        $this->logError("Benutzer {$this->_userName} existiert nicht.");

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
            $this->logError("Daten konnten nicht geladen werden.");
        }
        fclose($file);

        return $fileContent;
    }

    protected function _isInputOk($name, $value, $minLength)
    {
        if (FormHelper::isTooShort($value, $minLength)) {
            $this->logError(
                $name . " muss mindestens $minLength Zeichen lang sein.\n"
            );
            return false;
        }

        return true;
    }
}

?>
