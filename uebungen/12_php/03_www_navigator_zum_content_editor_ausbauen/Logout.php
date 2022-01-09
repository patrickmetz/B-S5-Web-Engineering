<?php

require_once "./Loggable.php";

class Logout extends Loggable
{
    public function __construct()
    {
        if (isset($_COOKIE['eingeloggt'])) {
            unset($_COOKIE['eingeloggt']);
            setcookie("eingeloggt", "1", time() -1);

            $this->logSuccess("Benutzer wurde ausgeloggt.");
        } else {
            $this->_hasError = true;
            $this->logError("Es ist Niemand eingeloggt.");
        }
    }
}