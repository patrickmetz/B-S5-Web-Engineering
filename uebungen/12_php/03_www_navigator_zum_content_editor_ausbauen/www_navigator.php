<?php

// form urls add GET params to all POST requests
$do = array_key_exists('do', $_GET) ? $_GET['do'] : null;
$isLoggedIn = array_key_exists('eingeloggt', $_COOKIE);

$sessionMessage = null;

if (($do === 'login')) {
    require_once "./Login.php";
    $login = new Login("./credentials.txt");

    if ($login->hasError()) {
        $sessionMessage = $login->getErrorMessage();
    } else {
        $isLoggedIn = true;
        $sessionMessage = $login->getSuccessMessage();
    }
} elseif (($do === 'logout')) {
    require_once "./Logout.php";

    $logout = new Logout();

    if ($logout->hasError()) {
        $sessionMessage = $logout->getErrorMessage();
    } else {
        $isLoggedIn = false;
        $sessionMessage = $logout->getSuccessMessage();
    }
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
                <li><a href="www_navigator.php?do=showCreateEntry">neuer Inhalt</a></li>
                <li><a href="www_navigator.php?do=logout">Logout</a></li>
            <?php else: ?>
                <li><a href="www_navigator.php?do=showLogin">Login</a></li>
            <?php endif; ?>
        </ul>
    </nav>
</header>

<aside id="aside_left"></aside>

<article id="article">
    <?php if (($do === 'showLogin')): ?>
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
    <?php elseif (($do === 'login') || ($do === 'logout')): ?>
        <div>
            <?php echo $sessionMessage; ?>
        </div>
    <?php elseif (($do === 'showCreateEntry')): ?>
        <h1>Neuen Inhalt anlegen</h1>

        <form
                method="post" enctype="application/x-www-form-urlencoded"
                action="./www_navigator.php?do=doCreateEntry"
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
                    <td><input type="text" name="topic"></td>
                </tr>
                <tr>
                    <td>Inhalt</td>
                    <td><textarea name="content" cols="40" rows="20"></textarea></td>
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