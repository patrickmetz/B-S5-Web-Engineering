<?php

// form urls add GET params to all POST requests
$do = array_key_exists('do', $_GET) ? $_GET['do'] : null;
$isLoggedIn = array_key_exists('eingeloggt', $_COOKIE);

$result = null;
$showBackButton = false;

function prepareResult(Loggable $loggable)
{
    global $result, $showBackButton;

    if ($loggable->hasError()) {
        $result = $loggable->getErrorMessage();
        $showBackButton = true;
    } else {
        $result = $loggable->getSuccessMessage();
    }
}

if ($do === 'login') {
    require_once "./Login.php";
    $login = new Login("./credentials.txt", $_POST["user_name"], $_POST["user_pass"]);
    $login->login();

    if (!$login->hasError()) {
        $isLoggedIn = true;
    }
    prepareResult($login);
} elseif ($do === 'logout') {
    require_once "./Logout.php";
    $logout = new Logout();
    $logout->logout();

    if (!$logout->hasError()) {
        $isLoggedIn = false;
    }

    prepareResult($logout);
} elseif ($do === 'createEntry') {
    require_once "./Content.php";
    $content = new Content(
        './contents.json',
        $_POST["topic"],
        $_POST["subtopic"],
        $_POST["reference"],
        $_POST["content"]
    );
    $content->write();

    prepareResult($content);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ü 12.3 </title>

    <link href="style.css" rel="stylesheet"/>

    <script src="www_navigator.js"></script>
</head>

<?php if (!($do === 'showLogin')): ?>
<body onload='new WwwNavigator(
    "header", "aside_left", "article", "aside_right",
    "./contents.json"
);'>
<?php else: ?>
<body>
<?php endif; ?>

<header id="header">
    <nav class="user_management">
        <ul>
            <?php if ($isLoggedIn): ?>
                <li><a href="www_navigator.php?do=showContentForm">neuer
                        Inhalt</a></li>
                <li><a href="www_navigator.php?do=logout">Logout</a></li>
            <?php else: ?>
                <li><a href="www_navigator.php?do=showLogin">Login</a></li>
            <?php endif; ?>
        </ul>
    </nav>
</header>

<aside id="aside_left"></aside>

<article id="article">
    <?php if ($result !== null): ?>
        <div>
            <?php echo $result; ?>

            <?php if ($showBackButton): ?>
                <input type="button" value="zurück" onclick="history.back();">
            <?php endif; ?>
        </div>
    <?php elseif (($do === 'showLogin')): ?>
        <h1>Einloggen</h1>

        <form
                method="post" enctype="application/x-www-form-urlencoded"
                action="./www_navigator.php?do=login"
        >
            <table>
                <tr>
                    <td>Benutzer</td>
                    <td><input type="text" name="user_name" value="admin"></td>
                </tr>
                <tr>
                    <td>Passwort</td>
                    <td><input type="password" name="user_pass" value="12345">
                    </td>
                </tr>
                <tr>
                    <td><input type="submit"></td>
                </tr>
            </table>
        </form>
    <?php elseif (($do === 'showContentForm') && $isLoggedIn): ?>
        <h1>Neuen Inhalt anlegen</h1>

        <form
                method="post" enctype="application/x-www-form-urlencoded"
                action="./www_navigator.php?do=createEntry"
        >
            <table>
                <tr>
                    <td>Thema</td>
                    <td><input type="text" name="topic"></td>
                </tr>
                <tr>
                    <td>Unterhema</td>
                    <td><input type="text" name="subtopic"></td>
                </tr>
                <tr>
                    <td>Quelle</td>
                    <td><input type="text" name="reference"></td>
                </tr>
                <tr>
                    <td>Inhalt</td>
                    <td><textarea name="content" cols="40" rows="20"></textarea>
                    </td>
                </tr>
                <tr>
                    <td><input type="submit"></td>
                </tr>
            </table>
        </form>
    <?php endif; ?>
</article>

<aside id="aside_right"></aside>
<footer id="footer"></footer>

</body>
</html>