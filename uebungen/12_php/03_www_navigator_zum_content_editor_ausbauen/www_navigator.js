class WwwNavigator {
    _mainNavi;
    _subNavi;
    _content;
    _references;

    _jsonContent;

    _loginCookieName;
    _editForm;


    constructor(idMainNavi, idSubNavi, idContent, idReferences, contentUrl, loginCookieName, editForm) {
        this._mainNavi = document.getElementById(idMainNavi);
        this._subNavi = document.getElementById(idSubNavi);
        this._content = document.getElementById(idContent);
        this._references = document.getElementById(idReferences);

        this._loginCookieName = loginCookieName;
        this._editForm = editForm;

        (async () => {
            try {
                await this._loadJsonContent(contentUrl);
                this._createMainNavigation();
            } catch (e) {
                console.error(e);
            }
        })();
    }

    async _loadJsonContent(url) {
        if (typeof this._jsonContent === "object") return;

        const response = await fetch(url);
        this._jsonContent = await response.json();
    }

    _isLoggedIn() {
        return document.cookie.indexOf(this._loginCookieName) !== -1
    }

    _createMainNavigation() {
        let nav = document.createElement("nav");
        let ul = document.createElement("ul");

        let shownTopics = new Set();

        for (const object of this._jsonContent) {
            let topic = object["topic"];

            if (shownTopics.has(topic)) {
                continue;
            }
            shownTopics.add(topic);

            let a = this._createLink(
                () => {
                    this._clearContent();
                    this._createSubNavigation(topic)
                },
                topic
            );

            ul.appendChild(this._createListElement(a));
        }

        nav.appendChild(ul);
        this._mainNavi.appendChild(nav);
    }

    _createSubNavigation(topic) {
        let ul = document.createElement("ul");

        for (const object of this._jsonContent) {
            if (object["topic"] !== topic) {
                continue;
            }

            let a = this._createLink(
                () => {
                    this._clearContent();
                    this._clearReferences();
                    this._loadContent(topic, object["subtopic"]);
                    this._loadReference(topic, object["subtopic"]);
                },
                object["subtopic"]
            );

            ul.appendChild(this._createListElement(a));
        }

        this._subNavi.innerHTML = "";
        this._subNavi.appendChild(ul);
    }


    _loadContent(topic, subtopic) {
        for (const object of this._jsonContent) {
            if (
                !(
                    (object["topic"] === topic)
                    &&
                    (object["subtopic"] === subtopic)
                )
            ) {
                continue;
            }

            this._content.textContent = object["content"];

            if (this._isLoggedIn()) {
                let a = this._createLink(
                    null,
                    "Bearbeiten",
                    this._editForm
                    + "&topic=" + encodeURI(object["topic"])
                    + "&subtopic=" + encodeURI(object["subtopic"])
                );

                this._content.appendChild(a)
            }
        }
    }

    _clearContent() {
        this._content.textContent = "";
    }

    _loadReference(topic, subtopic) {
        let ul = document.createElement("ul");

        for (const object of this._jsonContent) {
            if (
                !(
                    (object["topic"] === topic)
                    &&
                    (object["subtopic"] === subtopic)
                )
            ) {
                continue;
            }

            let a = this._createLink(
                () => {
                },
                "Quelle",
                object["reference"]
            );

            ul.appendChild(this._createListElement(a));
        }

        this._clearReferences();
        this._references.appendChild(ul);
    }

    _clearReferences() {
        this._references.innerHTML = "";
    }

    _createLink(clickHandler, textContent, href = "#") {
        let a = document.createElement("a");

        a.setAttribute("href", href);
        a.onclick = clickHandler
        a.textContent = textContent;

        return a;
    }

    _createListElement(childElement) {
        let li = document.createElement("li");
        li.appendChild(childElement);

        return li;
    }
}
