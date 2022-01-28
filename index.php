<?php
require_once "./upgrade_php/Session.php";
Session::loginIfAttempted();
Session::logoutIfAttempted();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, user-scalable=yes"
          name="viewport">

    <title>Web Engineering - Semesterprojekt</title>

    <link href="./style.css" rel="stylesheet">

    <?php if (Session::isLoggedIn()): ?>
        <!-- javascript+dom-upgrade: adds a table of contents to the menu -->
        <script defer src="upgrade_javascript_and_dom.js"></script>

        <!-- ecmascript-upgrade: adds a fulltext search to the menu -->
        <script defer src="upgrade_ecmascript.js"></script>

        <!-- typscript+functional+async-upgrade: adds json based content-loading -->
        <script defer src="upgrade_typescript_and_functional_and_async.js"></script>
    <?php endif; ?>

    <!-- vue-upgrade: add dynamic login form to the menu -->
    <script defer src="./upgrade_vue/dist/js/app.6689ceb9.js"></script>
    <script defer src="./upgrade_vue/dist/js/chunk-vendors.4102dc7c.js"></script>

</head>

<body>

<div id="menu">
    <div id="menuToggle">
        <!-- scalable "burger menu", source: https://icons8.com/icons/set/menu -->
        <svg viewBox="0 0 24 24" x="0px" xmlns="http://www.w3.org/2000/svg"
             y="0px">
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/>
        </svg>
        <span>Menü</span>
    </div>

    <div id="menuContent">
        <?php if (Session::isLoggedIn()): ?>
            <form method="post" action="./index.php">
                <input type ="hidden" name="session_action" value="logout">
                <input type="submit" value="Abmelden">
            </form>
        <?php else: ?>
            <div id="app"></div>
        <?php endif; ?>
    </div>
</div>

<header>
    <h1><span>Ein&shy;führ&shy;ung in </span>Web En&shy;gi&shy;nee&shy;ring</h1>
    <h2>Se&shy;mes&shy;ter&shy;pro&shy;jekt <span>"ei&shy;ge&shy;ne Home&shy;page"</span>
    </h2>
</header>


<article>
    <?php if (Session::isLoggedIn()): ?>
        <section></section>
    <?php else: ?>
        <div id="login_message">
            <?php if (Session::hasError()): ?>
                <div id="login_error">
                    <?php echo implode("<br/>", Session::getErrors()) ?>
                </div>
            <?php else: ?>
                Bitte melden Sie sich an, um Inhalte zu sehen.
            <?php endif; ?>
        </div>
    <?php endif; ?>
</article>

<footer>
    <div>&copy; 2021 / 2022</div>
    <div><a href="mailto:patrick.metz@smail.inf.h-brs.de">Patrick Metz 📧</a>
    </div>
    <div>Ma&shy;tri&shy;kel&shy;num&shy;mer 9033945</div>
    <div>
        <a href="#">Git-Re&shy;po&shy;si&shy;to&shy;ry</a>
    </div>
</footer>

</body>
</html>