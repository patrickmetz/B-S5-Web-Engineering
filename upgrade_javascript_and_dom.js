/* kind of a "fake class" created via IIFE ----------------------------------*/
(function (menuTagId, parentTag, lectureTag, taskTag) {

    /* "private attributes" -------------------------------------------------*/

    var _tocId = "tocDisplay";
    var _tocHiddenClass = "hidden";
    var _tocShownClass = "shown";

    var _toggleLinkText = "Inhaltsverzeichnis";

    var _taskHighlightClass = "taskHighlight";
    var _taskHighlightDuration = 2000;
    var _taskHighlightDelay = 250;

    // "constructor" --------------------------------------------------------*/

    buildTableOfContents(menuTagId, parentTag, lectureTag, taskTag);

    /* "methods" ------------------------------------------------------------*/

    /**
     * Builds a table of contents for tasks divided by lectures, whose click-
     * sensitive entries scroll the corresponding tasks into view, and highlight them.
     * @param {string} menuTag id of html element, that acts as menu for the toc link
     * @param {string} parentTag name of html element, that acts as task container
     * @param {string} lectureTag name of html element, that contains a task's corresponding lecture
     * @param {string} taskTag name of html element, that contains a task's name
     */
    function buildTableOfContents(menuTagId, parentTag, lectureTag, taskTag) {
        addTocToBody();
        addToggleLinkToMenu(menuTagId)
    }

    function addToggleLinkToMenu(menuTagId) {
        var toggleLink = document.createElement("a");
        toggleLink.textContent = _toggleLinkText;
        toggleLink.onclick = function () {
            toggleToc()
        };

        document.getElementById(menuTagId).appendChild(toggleLink);
    }

    function addTocToBody() {
        var tocDisplay = document.createElement("div");
        tocDisplay.setAttribute("id", _tocId);
        tocDisplay.setAttribute("class", _tocHiddenClass);

        var closeButton = document.createElement("a");
        closeButton.textContent = "X";
        closeButton.onclick = function () {
            toggleToc()
        };

        tocDisplay.appendChild(closeButton);

        document.getElementsByTagName("body")[0]
            .appendChild(tocDisplay);
    }

    function toggleToc() {
        var tocDisplay = document.getElementById(_tocId);
        var className = tocDisplay.className;

        if (className === _tocShownClass) {
            tocDisplay.className = _tocHiddenClass;
            clearToc();
        } else if (className === _tocHiddenClass) {
            updateToc();
            tocDisplay.className = _tocShownClass;
        }
    }

    function clearToc() {
        var lectureList = document.getElementById(_tocId)
            .getElementsByTagName("ul")[0];

        if (lectureList !== undefined) {
            document.getElementById(_tocId).removeChild(lectureList);
        }
    }

    function updateToc() {
        var toc = document.getElementById(_tocId);
        var parentTags = document.getElementsByTagName(parentTag);

        var lectureList = document.createElement("ul");
        toc.appendChild(lectureList);

        var lectureNameToTaskList = [];

        for (var tagIndex = 0; tagIndex < parentTags.length; tagIndex++) {

            if (elementIsDisplayed(parentTags[tagIndex]) === false) {
                continue;
            }


            var lectureName = getTextContentOfChildElement(parentTags, tagIndex, lectureTag);
            var lectureListElement = createLectureListElement(lectureName);

            if (lectureNameToTaskList[lectureName] === undefined) {
                lectureList.appendChild(lectureListElement);

                var taskList = document.createElement("ul");
                lectureListElement.appendChild(taskList);

                lectureNameToTaskList[lectureName] = taskList;
            }

            var taskName = getTextContentOfChildElement(parentTags, tagIndex, taskTag);
            var taskListElement = createTaskListElement(taskName, parentTags[tagIndex]);

            lectureNameToTaskList[lectureName].appendChild(taskListElement);
        }
    }

    function elementIsDisplayed(element) {
        return getComputedStyle(element)
            .getPropertyValue("display") !== "none";
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
            toggleToc(_tocId);
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
            taskElement.classList.add(_taskHighlightClass);

            setTimeout(function () {
                taskElement.classList.remove(_taskHighlightClass);
            }, _taskHighlightDuration);

        }, _taskHighlightDelay);
    }

    /* invoke IIFE with arguments -------------------------------------------*/

})('menuContent', 'section', 'h3', 'h4');





