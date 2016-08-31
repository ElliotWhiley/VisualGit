var vis = require("vis");
var options, nodes, edges, network;
function drawGraph() {
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    var container = document.getElementById("my-network");
    var data = {
        nodes: nodes,
        edges: edges
    };
    options = {
        configure: {
            enabled: false,
        },
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.6
                },
                middle: false,
                from: false,
            },
            color: "#0097A7",
            hoverWidth: 0,
            physics: false,
            selectionWidth: 0,
            shadow: true,
            smooth: {
                enabled: true,
                type: "cubicBezier",
                roundness: 0.5
            },
            width: 3,
        },
        groups: {},
        interaction: {
            dragNodes: false,
            dragView: true,
            hideEdgesOnDrag: false,
            hideNodesOnDrag: false,
            hover: true,
            hoverConnectedEdges: false,
            keyboard: {
                enabled: false,
                speed: { x: 10, y: 10, zoom: 0.02 },
                bindToWindow: true
            },
            multiselect: false,
            navigationButtons: false,
            selectable: true,
            selectConnectedEdges: false,
            tooltipDelay: 300,
            zoomView: true,
        },
        layout: {
            randomSeed: 1,
            improvedLayout: true,
        },
        manipulation: {
            enabled: false,
            initiallyActive: false,
            addNode: true,
            addEdge: true,
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
            controlNodeStyle: {
                shape: "dot",
                size: 6,
                color: {
                    background: "#0097A7",
                    border: "#0097A7",
                    highlight: {
                        background: "#07f968",
                        border: "#3c3c3c"
                    }
                },
                borderWidth: 2,
                borderWidthSelected: 2,
            }
        },
        nodes: {
            borderWidth: 8,
            borderWidthSelected: 8,
            color: {
                border: "#0097A7",
                background: "#FFF",
                highlight: {
                    border: "#FF0",
                    background: "#FFF"
                },
                hover: {
                    border: "#F00",
                    background: "#FFF"
                },
            },
            shadow: true,
        },
        physics: {
            enabled: false,
        },
    };
    network = new vis.Network(container, data, options);
    getAllCommits(function (commits) {
        populateCommits(commits);
    });
    network.on("doubleClick", function (callback) {
        if (callback.nodes[0] === undefined) {
            return;
        }
        else {
            var nodeId = callback.nodes[0];
        }
        var moveOptions = {
            offset: { x: 0, y: 0 },
            scale: 1,
            animation: {
                duration: 1000,
                easingFunction: "easeInOutQuad",
            }
        };
        network.focus(callback.nodes[0], moveOptions);
    });
}
false;
;
