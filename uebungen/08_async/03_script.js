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
        let ul = document.createElement("ul");

        for (const topic in this._jsonContent) {
            let a = this.createLink(
                () => {
                    this.clearContent();
                    this.createSubNavigation(topic)
                },
                topic
            );

            ul.appendChild(this.createListElement(a));
        }

        this._mainNavi.appendChild(ul);
    }

    createSubNavigation(topic) {
        let ul = document.createElement("ul");

        for (const subTopic in this._jsonContent[topic]) {
            let a = this.createLink(
                () => {
                    this.clearContent();
                    this.clearReferences();
                    this.loadContent(topic, subTopic);
                    this.loadReferences(topic, subTopic);
                },
                subTopic
            );

            ul.appendChild(this.createListElement(a));
        }

        this._subNavi.innerHTML = "";
        this._subNavi.appendChild(ul);
    }

    loadContent(topic, subTopic) {
        this._content.textContent =
            this._jsonContent[topic][subTopic]["content"];
    }

    clearContent() {
        this._content.textContent = "";
    }

    loadReferences(topic, subTopic) {
        let ul = document.createElement("ul");

        let references = this._jsonContent[topic][subTopic]["references"];
        let referenceCount = 0;

        for (const reference of references) {
            let a = this.createLink(
                () => {
                },
                (references.length > 1)
                    ? `Quelle ${++referenceCount}`
                    : "Quelle",
                reference
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
