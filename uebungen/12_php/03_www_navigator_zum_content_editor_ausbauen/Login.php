<?php

require_once "./UserManagement.php";

class Login extends UserManagement
{
    protected $_userName;
    protected $_userPass;
    protected $_credentialsPath;
    protected $_minLength = 3;

    public function __construct($credentialsPath)
    {
        $this->_credentialsPath = $credentialsPath;
        $this->_userName = $this->_filteredPostVariable('user_name');
        $this->_userPass = $this->_filteredPostVariable('user_pass');

        if (
            $this->_isInputOk("Benutzername", $this->_userName, $this->_minLength)
            and
            $this->_isInputOk("Passwort", $this->_userPass, $this->_minLength)
            and
            $this->_login()
        ) {
            $this->_isSuccess = true;
        } else {
            $this->_hasError = true;
        }
    }

    protected function _login()
    {
        if ($this->_existsUser()) {
            //todo: use php's session functionality, and a random session id
            setcookie("eingeloggt", "1", time() + 300); // five-minute session
            $this->_successMessage = "Benutzer {$this->_userName} wurde eingeloggt.";

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
}

?>
