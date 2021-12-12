interface TaskLinks {
    template: string,
    result: string,
    sourceCode: string,
    source: string
}

interface LectureContent {
    lectureName: string,
    taskName: string,
    taskInfo: string,
    taskLinks: TaskLinks
}

type TemplateFunction = (LectureContent) => string;
type TemplateType = "image" | "iframe";

class LectureContentLoader {
    private _lectureContent: LectureContent[];
    private readonly _contentRootQuery: string;

    constructor(contentRootQuery: string, jsonFilePath: string) {
        this._contentRootQuery = contentRootQuery;

        (async () => {
            try {
                this._lectureContent = await this._loadLectureContent(jsonFilePath);
                this._renderLectureContent();
            } catch (e) {
                console.error(e);
            }
        })();
    }

    private async _loadLectureContent(jsonFilePath: string): Promise<LectureContent[]> {
        const response = await fetch(jsonFilePath);
        return response.json();
    }

    private _renderLectureContent() {
        const contentRoot = document.querySelector(this._contentRootQuery);
        let content: LectureContent;

        for (content of this._lectureContent) {
            contentRoot.insertAdjacentHTML(
                "beforeend",
                this._htmlCode(
                    content,
                    this._templateCode,
                    this._linkCode
                )
            )
        }
    }

    private _htmlCode(
        content: LectureContent,
        templateFunction: TemplateFunction,
        linksFunction: TemplateFunction,
    ): string {
        const htmlCode = `
             <section>
                <h3>${content.lectureName}</h3>
                <h4>${content.taskName}</h4>
        
                <ul class="taskInfo">
                    <li>
                        ${content.taskInfo}
                    </li>
                </ul>
        
                <div class="taskDetails">
                    <div class="taskTemplate">
                        ${templateFunction.call(this, content)}
                    </div>
        
                    <div class="taskLinks">
                        ${linksFunction.call(this, content)}
                    </div>
                </div>
            </section>
        `;

        return htmlCode;
    }

    private _templateCode(content: LectureContent): string {
        switch (this._templateType(content)) {
            case "iframe":
                return `<iframe loading="lazy" 
                            src="${content.taskLinks.template}"
                            title="${content.taskName}"
                            ></iframe>`;
            case "image":
                return `<img loading="lazy" 
                            src="${content.taskLinks.template}"
                            alt="${content.taskName}"
                            title="${content.taskName}"
                            ">`;
        }
    }

    private _templateType(content: LectureContent): TemplateType {
        const pictureRegex = /png|jpg|jpeg|gif$/;
        const iframeRegex = /youtube\.com|youtu\.be/;

        if ((content.taskLinks.template.match(pictureRegex)) !== null) {
            return "image";
        } else if (content.taskLinks.template.match(iframeRegex) !== null) {
            return "iframe";
        }

        throw "unknown template type";
    }

    private _linkCode(content: LectureContent): string {
        return `
            <a href="${content.taskLinks.template}">Vorlage</a>
            <a href="${content.taskLinks.result}">Ergebnis</a>
            <a href="${content.taskLinks.sourceCode}">Quellcode</a>
        `;
    }

}

new LectureContentLoader("article", "./content.json");