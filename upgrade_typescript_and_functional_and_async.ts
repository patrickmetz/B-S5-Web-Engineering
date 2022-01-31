interface LectureContent {
    lectureName: string,
    taskName: string,
    taskInfo: string,
    taskLinks: TaskLinks
}

interface TaskLinks {
    template: string,
    result: string,
    source: string
}

type TemplateFunction = (LectureContent) => string;
type TemplateType = "image" | "iframe";

class LectureContentLoader {
    private lectureContents: LectureContent[];

    private infoMaxLength: number = 100;
    private infoMinRestLength: number = 100;
    private readonly infoClassRest = "rest";
    private readonly infoClassCut = "cut";

    constructor(contentRootQuery: string, jsonFilePath: string) {
        (async () => {
            try {
                this.lectureContents = await this.loadLectureContent(jsonFilePath);
                this.renderLectureContent(contentRootQuery);
            } catch (e) {
                console.error(e);
            }
        })();
    }

    private async loadLectureContent(jsonFilePath: string): Promise<LectureContent[]> {
        const response = await fetch(jsonFilePath);
        return response.json();
    }

    private renderLectureContent(contentRootQuery) {
        let content: LectureContent;
        let html: string = "";

        for (content of this.lectureContents) {
            html += this.htmlCode(
                content,
                this.contentCode,
                this.templateCode,
                this.linkCode
            );
        }

        document.querySelector(contentRootQuery).innerHTML = html;
    }

    private htmlCode(
        content: LectureContent,
        contentFunction: TemplateFunction,
        templateFunction: TemplateFunction,
        linksFunction: TemplateFunction,
    ): string {
        const htmlCode = `
             <section onfocusout="LectureContentLoader.removeMoreClass(this)">
                <h3>${content.lectureName}</h3>
                <h4>${content.taskName}</h4>
        
                <ul class="taskInfo">
                    <li>
                        ${contentFunction.call(this, content)}
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

    private templateCode(content: LectureContent): string {
        switch (this.templateType(content)) {
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

    private templateType(content: LectureContent): TemplateType {
        const pictureRegex = /png|jpg|jpeg|gif$/;
        const iframeRegex = /youtube\.com|youtu\.be/;

        if ((content.taskLinks.template.match(pictureRegex)) !== null) {
            return "image";
        } else if (content.taskLinks.template.match(iframeRegex) !== null) {
            return "iframe";
        }

        throw "unknown template type";
    }

    private linkCode(content: LectureContent): string {
        return `
            <a href="${content.taskLinks.template}">Vorlage</a>
            <a href="${content.taskLinks.result}">Ergebnis</a>
            <a href="${content.taskLinks.source}">Quelle</a>
        `;
    }

    private contentCode(content: LectureContent): string {
        if (
            content.taskInfo.length
            > (this.infoMaxLength + this.infoMinRestLength)
        ) {
            let contentStart: String = content.taskInfo.slice(0, this.infoMaxLength);
            let contentEnd: String = content.taskInfo.slice(this.infoMaxLength);

            return contentStart
                + "<span class='" + this.infoClassCut + "'></span>"
                + "<span class='" + this.infoClassRest + "'>" + contentEnd + "</span>"
                + "<a onclick='this.parentElement.classList.toggle(\"more\");'></a>";
        }

        return content.taskInfo;

    }
}

new LectureContentLoader("article", "./content.json");