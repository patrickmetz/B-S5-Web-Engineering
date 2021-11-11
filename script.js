/* upgrade homepage to use Javascript and DOM -------------------------------*/

var tocDisplayId = "tocDisplay";
var tocIsReady = false;
var tocClassHidden = "hidden";
var tocClassShown = "shown";
var tocClassHighlight = "tocHighlight";
var tocHighlightDuration = 750;
var tocHighlightDelay = 250;

/**
 * Builds a table of contents, whose entries scroll the corresponding tasks into
 * view when clicked.
 * @param {string} parentTag name of html element, that acts as task container
 * @param {string} lectureTag name of html element, that contains a task's corresponding lecture
 * @param {string} taskTag name of html element, that contains a task's name
 */
function createTableOfContents(parentTag, lectureTag, taskTag) {
    var tocDisplay = document.getElementById(tocDisplayId);
    var parentTags = document.getElementsByTagName(parentTag);

    var lectureList = document.createElement("ul");
    tocDisplay.appendChild(lectureList);

    var lectureNameToTaskList = [];

    for (var parentTagIndex = 0; parentTagIndex < parentTags.length; parentTagIndex++) {
        var lectureName = getTextContentOfChildElement(parentTags, parentTagIndex, lectureTag);
        var lectureListElement = createLectureListElement(lectureName);

        if (lectureNameToTaskList[lectureName] === undefined) {
            lectureList.appendChild(lectureListElement);

            var taskList = document.createElement("ul");
            lectureListElement.appendChild(taskList);

            lectureNameToTaskList[lectureName] = taskList;
        }

        var taskName = getTextContentOfChildElement(parentTags, parentTagIndex, taskTag);
        var taskListElement = createTaskListElement(taskName, parentTags[parentTagIndex]);

        lectureNameToTaskList[lectureName].appendChild(taskListElement);
    }

    tocIsReady = true;
}

function toggleTocDisplay() {
    if (tocIsReady === true) {
        var tocDisplay = document.getElementById(tocDisplayId);
        var className = tocDisplay.className;

        if (className === tocClassShown) {
            tocDisplay.className = tocClassHidden;
        } else if (className === tocClassHidden) {
            tocDisplay.className = tocClassShown;
        }
    }
}

function createLectureListElement(textContent) {
    var listElement = document.createElement("li");
    listElement.textContent = textContent;

    return listElement;
}

function createTaskListElement(textContent, taskElement) {
    var listElement = document.createElement("li");
    var link = document.createElement("a");

    link.textContent = textContent;
    link.onclick = function () {
        toggleTocDisplay(tocDisplayId);
        showTask(taskElement);
        highlightTask(taskElement);
        return false;
    };

    listElement.appendChild(link);

    return listElement;
}

function getTextContentOfChildElement(parentTags, parentTagIndex, childTag) {
    return parentTags[parentTagIndex]
        .getElementsByTagName(childTag)[0].textContent;
}

function showTask(taskElement) {
    taskElement.scrollIntoView();
}

function highlightTask(taskElement) {
    setTimeout(function () {
        taskElement.classList.add(tocClassHighlight);

        setTimeout(function () {
            taskElement.classList.remove(tocClassHighlight);
        }, tocHighlightDuration);

    }, tocHighlightDelay);
}



