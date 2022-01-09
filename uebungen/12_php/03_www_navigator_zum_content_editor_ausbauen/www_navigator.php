<?php
$action = array_key_exists('action', $_GET) ? $_GET['action'] : null;

$showLogin = ($action === 'showLogin');
$doLogin = ($action === 'doLogin');
$isLoggedIn = array_key_exists('eingeloggt', $_COOKIE);

$doLogout = ($action === 'doLogout');

$sessionStateMessage = null;

if ($doLogin) {
    require_once "./Login.php";
    $login = new Login("./credentials.txt");

    if (!$login->hasError()) {
        $isLoggedIn = true;
        $sessionStateMessage = $login->getSuccessMessage();
    } else {
        $sessionStateMessage = $login->getErrorMessage();
    }
} elseif ($doLogout) {
    require_once "./Logout.php";

    $logout = new Logout();

    if (!$logout->hasError()) {
        $isLoggedIn = false;
        $sessionStateMessage = $logout->getSuccessMessage();
    } else {
        $sessionStateMessage = $logout->getErrorMessage();
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

<?php if (!$showLogin): ?>
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
                <li><a href="www_navigator.php?action=doLogout">Logout</a></li>
            <?php else: ?>
                <li><a href="www_navigator.php?action=showLogin">Login</a></li>
            <?php endif; ?>
        </ul>
    </nav>
</header>

<aside id="aside_left"></aside>

<article id="article">
    <?php if ($showLogin): ?>
        <h1>Einloggen</h1>

        <form
                method="post" enctype="application/x-www-form-urlencoded"
                action="./www_navigator.php?action=doLogin"
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
    <?php elseif ($doLogin || $doLogout): ?>
        <div>
            <?php echo $sessionStateMessage; ?>
        </div>
    <?php endif; ?>
</article>

<aside id="aside_right"></aside>
<footer id="footer"></footer>

</body>
</html>