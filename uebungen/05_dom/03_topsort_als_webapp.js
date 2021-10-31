graph = createGraph();

function addVertex(inputField) {
    var vertex = inputField.value;
    clearErrorClasses();
    clearErrorDisplay();

    if (isEmpty(vertex)) {
        addErrorClass(inputField);
        showError("Das Eingabefeld ist leer.")
        return;
    }

    if (graph.hasVertex(vertex)) {
        addErrorClass(inputField);
        showError("Der Knoten existiert bereits");
        return;
    }

    graph.addVertex(vertex);

    showNeighborList();
    clearTopSortList();
    clearInputField(inputField);
    clearErrorClasses();
    clearErrorDisplay();
    return;
}

function addEdge(inputField1, inputField2) {
    var vertex1 = inputField1.value;
    var vertex2 = inputField2.value;

    clearErrorClasses();
    clearErrorDisplay();

    var hasError = false;

    if (isEmpty(vertex1)) {
        addErrorClass(inputField1);
        showError("Mindestens ein Eingabefeld ist leer.")
        hasError = true;
    }
    if (isEmpty(vertex2)) {
        addErrorClass(inputField2);
        showError("Mindestens ein Eingabefeld ist leer.")
        hasError = true;
    }

    if(hasError === true) return;

    if (!graph.hasVertex(vertex1)) {
        addErrorClass(inputField1);
        showError("Mindestens ein Knoten existiert nicht.")
        hasError = true;
    }

    if (!graph.hasVertex(vertex2)) {
        addErrorClass(inputField2);
        showError("Mindestens ein Knoten existiert nicht.")
        hasError = true;
    }

    if(hasError === true) return;

    if (vertex1 == vertex2) {
        addErrorClass(inputField1);
        addErrorClass(inputField2);
        showError("Kanten können nicht reflexiv sein.")
        return;
    }

    if (graph.hasEdge(vertex1, vertex2)) {
        addErrorClass(inputField1);
        addErrorClass(inputField2);
        showError("Die Knoten sind bereits verbunden.")
        return;
    }

    graph.addEdge(vertex1, vertex2);
    showNeighborList();
    clearTopSortList();
    clearInputField(inputField1);
    clearInputField(inputField2);

    return;
}

function showNeighborList() {
    var display = document.getElementById("neighborList");
    display.innerHTML = "";

    var list = graph.getNeighborList();

    for (var vertex in list) {
        var li = document.createElement("li");
        var text = vertex + ": " + list[vertex].join(", ");
        li.appendChild(document.createTextNode(text));
        display.appendChild(li);
    }

    return;
}

function showTopSortList() {
    var display = document.getElementById("topSortList");
    display.innerHTML = "";

    var list = topsort(graph);

    for (var vertex of list) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(vertex));
        display.appendChild(li);
    }
}

function showError(message) {
    var display = document.getElementById("errorDisplay");

    display.innerText = message;
    addErrorClass(display);
}


function clearErrorDisplay() {
    var display = document.getElementById("errorDisplay");

    clearErrorClasses(display);
    display.innerText = "";
}


function clearTopSortList() {
    document.getElementById("topSortList").innerHTML = "";
}

function isEmpty(value) {
    return value.trim() === "";
}

function addErrorClass(element) {
    element.className = "error";
}

function clearErrorClasses() {
    /* multiple elements can be in error state */
    var elementsInErrorState = document.getElementsByClassName("error");

    for (var element of elementsInErrorState) {
        element.className = "noError";
    }
}

function clearInputField(inputField) {
    inputField.value = "";
}


// topsort: graph and algorithm ###############################################

function createGraph() {
    return {
        neighborList: {},

        getNeighborList: function () {
            return this.neighborList;
        },

        addVertex: function (vertex) {
            if (!this.neighborList[vertex]) {
                this.neighborList[vertex] = [];
            }
        },

        hasVertex: function (vertex) {
            return this.neighborList[vertex] !== undefined;
        },

        addEdge: function (vertex1, vertex2) {
            this.neighborList[vertex1].push(vertex2);
        },

        hasEdge: function (vertex1, vertex2) {
            var combinations = {1: [vertex1, vertex2], 2: [vertex2, vertex1]};

            // check connection in both directions
            for (const index in combinations) {
                var combination = combinations[index];
                var vertexA = combination[0];
                var vertexB = combination[1];

                if (this.neighborList[vertexA] !== undefined) {
                    if (this.neighborList[vertexA].includes(vertexB)) {
                        return true;
                    }
                }
            }

            if (this.neighborList[vertex1] !== undefined) {
                if (this.neighborList[vertex1].includes(vertex2)) {
                    return true;
                }
            }
            if (this.neighborList[vertex2] !== undefined) {
                if (this.neighborList[vertex2].includes(vertex1)) {
                    return true;
                }
            }
        }
    }
}

function topsort(graph) {
    var vertices = Object.keys(graph.neighborList);
    var visited = {};
    var sorted = {};
    var position = vertices.length - 1;

    for (var vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
        if (!visited[vertices[vertexIndex]]) {
            position = helperFunction(vertices[vertexIndex], position, visited, sorted)
        }
    }

    // map internal presentation to correctly sorted list

    var objectEntries = Object.entries(sorted);
    var sortedList = [];

    for (var entryIndex = 0; entryIndex < objectEntries.length; entryIndex++) {
        var key = objectEntries[entryIndex][0];
        var value = objectEntries[entryIndex][1];

        sortedList[key] = value;
    }

    return sortedList;
}

function helperFunction(vertex, position, visited, sorted) {
    visited[vertex] = true;
    const neighbors = graph.neighborList[vertex];

    for (var neighborIndex = 0; neighborIndex < neighbors.length; neighborIndex++) {
        if (!visited[neighbors[neighborIndex]]) {
            position = helperFunction(neighbors[neighborIndex], position, visited, sorted);
        }
    }

    sorted[position] = vertex;
    return position - 1;
}