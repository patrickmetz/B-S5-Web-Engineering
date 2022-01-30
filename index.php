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
    <script defer src="./upgrade_vue/dist/js/app.6de28b4b.js"></script>
    <script defer src="./upgrade_vue/dist/js/chunk-vendors.4102dc7c.js"></script>

</head>

<body>

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
    <div>Patrick Metz</div>
    <div>
        <a href="#" class="e-m-a-i-l"
           data-a="patrick.metz"
           data-b="smail.inf.h-brs"
           data-c="de"
           onclick="
            window.location.href = 'mailto:'
            + this.dataset.a + '@'
            + this.dataset.b + '.'
            + this.dataset.c; return false;
        ">
        </a>
    </div>
    <div>
        <a href="https://github.com/patrickmetz/B-S5-Web-Engineering"
           target="_blank">Git-Re&shy;po&shy;si&shy;to&shy;ry</a>
    </div>
</footer>

<div id="menu">
    <div id="menuToggle">
        <img src="./upgrade_svg/menu.svg">
        <span>Menü</span>
    </div>

    <div id="menuContent">
        <?php if (Session::isLoggedIn()): ?>
            <form method="post" action="./index.php">
                <input type="hidden" name="session_action" value="logout">
                <input type="submit" value="Abmelden">
            </form>
        <?php else: ?>
            <div id="app"></div>
        <?php endif; ?>
    </div>
</div>

</body>
</html>