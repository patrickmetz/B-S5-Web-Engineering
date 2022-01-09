<?php

require_once "./UserManagement.php";

class Logout extends UserManagement
{
    public function __construct()
    {
        if (isset($_COOKIE['eingeloggt'])) {
            unset($_COOKIE['eingeloggt']);
            setcookie("eingeloggt", "1", time() -1);

            $this->_isSuccess = true;
            $this->_successMessage = "Benutzer wurde ausgeloggt.";
        } else {
            $this->_hasError = true;
            $this->_logError("Es ist Niemand eingeloggt.");
        }
    }
}