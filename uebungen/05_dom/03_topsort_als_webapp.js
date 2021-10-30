graph = createGraph();
graph.addVertex("schlafen");
graph.addVertex("studieren");
graph.addVertex("essen");
graph.addVertex("prüfen");
graph.addEdge("schlafen", "studieren");
graph.addEdge("essen", "studieren");
graph.addEdge("studieren", "prüfen");

function addVertex(input) {
    var vertex = input.value;

    if (isEmpty(vertex)) {
        console.log("the input is empty")
        return false;
    }

    if (graph.hasVertex(vertex)) {
        console.log("the vertex already exists")
        return false;
    }

    graph.addVertex(vertex);
    showNeighborList();
    emptyTopSortList();
    return false;
}

function emptyTopSortList() {
    document.getElementById("topSortList").innerHTML = "";
}

function addEdge(input1, input2) {
    let vertex1 = input1.value;
    let vertex2 = input2.value;

    if (isEmpty(vertex1) || isEmpty(vertex2)) {
        console.log("one of the inputs is empty")
        return false;
    }

    if (!graph.hasVertex(vertex1) || !graph.hasVertex(vertex2)) {
        console.log("one of the vertices doesn't exist")
        return false;
    }

    if (vertex1 == vertex2) {
        console.log("edges can't be reflexive")
        return false;
    }

    if (graph.hasEdge(vertex1, vertex2)) {
        console.log("the vertices are already connected")
        return false;
    }

    graph.addEdge(vertex1, vertex2);
    showNeighborList();
    emptyTopSortList();

    return false;
}

function isEmpty(value) {
    return value.trim() === "";
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

    return false;
}

function showTopSortList(){
    var display = document.getElementById("topSortList");
    display.innerHTML = "";

    var list = topsort(graph);

    for (var vertex of list) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(vertex));
        display.appendChild(li);
    }
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