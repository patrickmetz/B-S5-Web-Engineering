<?php
error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING ^ E_DEPRECATED);

// https://stackoverflow.com/a/3729513
if (empty($_SERVER['HTTPS'])) {
    echo Session::ERROR_ONLY_HTTPS_SUPPORTED;
    exit;
}

final class Session
{
    private static $_credentialsPath = "/upgrade_php/passwords.txt";
    private static $_errors = [];

    const ERROR_ONLY_HTTPS_SUPPORTED = "Bitte benutzen Sie das HTTPS-Protokoll.";
    const ERROR_USER_DOES_NOT_EXIST = "Der Benutzer wurde nicht gefunden.";
    const ERROR_NO_PASSWORD_FILE = "Es existiert keine Password-Datei.";

    const ACTION = "session_action";
    const ACTION_LOGIN = "login";
    const ACTION_LOGOUT = "logout";

    const ACTION_LOGIN_PASS = "password";
    const ACTION_LOGIN_USER = "username";

    const SESSION_USER = "username";

    public static function loginIfAttempted()
    {
        if (self::_isLoginAttempt() === true) {
            self::_login();
        }
    }

    public static function logoutIfAttempted()
    {
        if (self::_isLogoutAttempt() === true) {
            self::_logout();
        }
    }

    public static function isLoggedIn()
    {
        return isset($_SESSION[self::SESSION_USER]);
    }

    public static function getUser()
    {
        return htmlspecialchars($_SESSION[self::SESSION_USER]);
    }

    public static function hasError()
    {
        return count(Session::$_errors) > 0;
    }

    public static function getErrors()
    {
        return Session::$_errors;
    }

    private static function _isLoginAttempt()
    {
        return isset($_POST[self::ACTION])
            && ($_POST[self::ACTION] === self::ACTION_LOGIN)
            && !empty($_POST[self::ACTION_LOGIN_USER])
            && !empty($_POST[self::ACTION_LOGIN_PASS]);
    }

    public static function _isLogoutAttempt()
    {
        return isset($_POST[self::ACTION])
            && ($_POST[self::ACTION] === self::ACTION_LOGOUT);
    }

    private static function _login()
    {
        $user = filter_input(INPUT_POST, self::ACTION_LOGIN_USER);
        $password = filter_input(INPUT_POST, self::ACTION_LOGIN_PASS);

        if (Session::_existsUser($user, $password)) {
            session_start();
            $_SESSION[self::SESSION_USER] = $user;
        } else {
            Session::_logError(self::ERROR_USER_DOES_NOT_EXIST);
        }
    }

    private static function _logout()
    {
        session_abort();
    }

    private static function _logError($error)
    {
        Session::$_errors[] = $error;
    }

    private static function _existsUser($user, $password)
    {
        $fileContent = Session::_readCredentialsFile();

        if ($fileContent === false) {
            return false;
        }

        // source: https://stackoverflow.com/a/11165332
        $splittedByLines = preg_split("/\r\n|\n|\r/", $fileContent);

        // find user entry
        foreach ($splittedByLines as $line) {
            $splittedByTab = preg_split("/\t/", $line);
            $userFound = $splittedByTab[0];
            $passwordFound = $splittedByTab[1];
            $saltFound = $splittedByTab[2];

            if (
                ($userFound === hash('sha384', $user))
                && ($passwordFound === hash('sha384', $password . $saltFound))
            ) {
                return true;
            }
        }

        return false;
    }

    private static function _readCredentialsFile()
    {
        $fileContent = null;

        $file = fopen(getcwd() . self::$_credentialsPath, "r");

        if ($file === false) {
            Session::_logError(self::ERROR_NO_PASSWORD_FILE);
            return false;
        }

        // LOCK_SH = "reader lock" for efficient multiple concurrent reading of file which may be locked
        if (flock($file, LOCK_SH)) {
            $fileContent = fread($file, pow(2, 16)); // read up to 2 gigabyte
            flock($file, LOCK_UN);
        }
        fclose($file);

        return $fileContent;
    }

}

?>
