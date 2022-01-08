<?php

require_once "../UserManagement.php";

class Login extends UserManagement
{
    protected function _userAction()
    {
        if($this->_existsUser()){
            setcookie("eingeloggt", "1", time() + 60); // one-minute session
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