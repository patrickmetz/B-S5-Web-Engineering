interface LectureContent {
    lectureName: string,
    taskName: string,
    taskInfo: string,
    taskLinks: TaskLinks
}

interface TaskLinks {
    template: string | null,
    result: string,
    source: string
}

type TemplateFunction = (LectureContent) => string;
type TemplateType = "image" | "iframe" | null;

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
            html += this.createHtmlCode(
                content,
                this.sectionClassFunction,
                this.taskInfoFunction,
                this.taskTemplateFunction,
                this.taskLinksFunction
            );
        }

        document.querySelector(contentRootQuery).innerHTML = html;
    }

    private createHtmlCode(
        content: LectureContent,
        sectionClassFunction: TemplateFunction,
        taskInfoFunction: TemplateFunction,
        taskTemplateFunction: TemplateFunction,
        taskLinksFunction: TemplateFunction,
    ): string {
        const htmlCode = `
             <section class="${sectionClassFunction.call(this, content)}">
                <h3>${content.lectureName}</h3>
                <h4>${content.taskName}</h4>
        
                <ul class="taskInfo">
                    <li>
                        ${taskInfoFunction.call(this, content)}
                    </li>
                </ul>
        
                <div class="taskDetails">
                    <div class="taskLinks">
                        ${taskLinksFunction.call(this, content)}
                    </div>
                    
                    <div class="taskTemplate">
                        ${taskTemplateFunction.call(this, content)}
                    </div>
                </div>
            </section>
        `;

        return htmlCode;
    }

    private taskTemplateFunction(content: LectureContent): string {
        switch (this.templateType(content)) {
            case null:
                return "";
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

        if (content.taskLinks.template === null) {
            return null;
        } else if ((content.taskLinks.template.match(pictureRegex)) !== null) {
            return "image";
        } else if (content.taskLinks.template.match(iframeRegex) !== null) {
            return "iframe";
        }

        throw "unknown template type";
    }

    private taskLinksFunction(content: LectureContent): string {
        let templateLink: String
            = content.taskLinks.template !== null
            ? ` <a target="_blank" href="${content.taskLinks.template}">Vorlage</a>`
            : "";

        return `
            ${templateLink}
            <a target="_blank" href="${content.taskLinks.result}">Ergebnis</a>
            <a target="_blank" href="${content.taskLinks.source}">Quelle</a>
        `;
    }

    private taskInfoFunction(content: LectureContent): string {
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

    private sectionClassFunction(content: LectureContent): string{
        return content.taskLinks.template === null ? "" : "hasTemplate";
    }
}

new LectureContentLoader("article", "./content.json");