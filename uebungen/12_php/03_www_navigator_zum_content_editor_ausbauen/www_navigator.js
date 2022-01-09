class WwwNavigator {
    _mainNavi;
    _subNavi;
    _content;
    _references;

    _jsonContent;

    constructor(idMainNavi, idSubNavi, idContent, idReferences, contentUrl) {
        this._mainNavi = idToElement(idMainNavi);
        this._subNavi = idToElement(idSubNavi);
        this._content = idToElement(idContent);
        this._references = idToElement(idReferences);

        function idToElement(id) {
            return document.getElementById(id);
        }

        (async () => {
            try {
                await this.loadJsonContent(contentUrl);
                this.createMainNavigation();
            } catch (e) {
                console.error(e);
            }
        })();
    }

    async loadJsonContent(url) {
        if (typeof this._jsonContent === "object") return;

        const response = await fetch(url);
        this._jsonContent = await response.json();
    }

    createMainNavigation() {
        let nav = document.createElement("nav");
        let ul = document.createElement("ul");

        let shownTopics = new Set();

        for (const object of this._jsonContent) {
            let topic = object["topic"];

            if (shownTopics.has(topic)) {
                continue;
            }
            shownTopics.add(topic);

            let a = this.createLink(
                () => {
                    this.clearContent();
                    this.createSubNavigation(topic)
                },
                topic
            );

            ul.appendChild(this.createListElement(a));
        }

        nav.appendChild(ul);
        this._mainNavi.appendChild(nav);
    }

    createSubNavigation(topic) {
        let ul = document.createElement("ul");

        for (const object of this._jsonContent) {
            if (object["topic"] !== topic) {
                continue;
            }

            let a = this.createLink(
                () => {
                    this.clearContent();
                    this.clearReferences();
                    this.loadContent(topic, object["subtopic"]);
                    this.loadReference(topic, object["subtopic"]);
                },
                object["subtopic"]
            );

            ul.appendChild(this.createListElement(a));
        }

        this._subNavi.innerHTML = "";
        this._subNavi.appendChild(ul);
    }

    loadContent(topic, subtopic) {
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
        }
    }

    clearContent() {
        this._content.textContent = "";
    }

    loadReference(topic, subtopic) {
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

            let a = this.createLink(
                () => {
                },
                "Quelle",
                object["reference"]
            );

            ul.appendChild(this.createListElement(a));
        }

        this.clearReferences();
        this._references.appendChild(ul);
    }

    clearReferences() {
        this._references.innerHTML = "";
    }

    createLink(clickHandler, textContent, href = "#") {
        let a = document.createElement("a");

        a.setAttribute("href", href);
        a.onclick = clickHandler
        a.textContent = textContent;

        return a;
    }

    createListElement(childElement) {
        let li = document.createElement("li");
        li.appendChild(childElement);

        return li;
    }
}
