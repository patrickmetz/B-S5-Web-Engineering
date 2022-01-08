<?php

require_once "../UserManagement.php";

class Registration extends UserManagement
{
    protected function _userAction()
    {
        if (file_put_contents(
            $this->_credentialsPath,
            // tab separated. users can't enter tabs
            $this->_userName . "\t" . $this->_userPass . "\n",
            FILE_APPEND | LOCK_EX
        )) {
            $this->_successMessage = "Benutzer $this->_userName wurde registriert.";
            return true;
        }

        $this->_logError("Daten konnten nicht gespeichert werden.");

        return false;
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