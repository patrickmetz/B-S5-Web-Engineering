<?php
$action = array_key_exists('action', $_GET) ? $_GET['action'] : null;
$showLogin = ($action === 'showLogin');
$doLogin = ($action === 'doLogin');

if($doLogin){

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
            <li><a href="www_navigator.php?action=showLogin">Login</a></li>
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
                    <td><input type="password" name="user_pass" value="12345"></td>
                </tr>
                <tr>
                    <td><input type="submit"></td>
                </tr>
            </table>
        </form>
    <?php elseif($doLogin): ?>
        <div>
            <?php
                require_once "./login.php";

                if ($_COOKIE["eingeloggt"] !== "1") {
                    $login = new Login("./credentials.txt");

                    if ($login->hasError()) {
                        echo $login->getErrorMessage();
                    } elseif ($login->isSuccess()) {
                        echo $login->getSuccessMessage();
                    }
                } else {
                    echo "Sie sind bereits angemeldet.";
                }
            ?>
        </div>
    <?php endif; ?>
</article>

<aside id="aside_right"></aside>
<footer id="footer"></footer>

</body>
</html>