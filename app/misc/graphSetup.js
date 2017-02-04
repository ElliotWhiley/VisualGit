var vis = require("vis");
var $ = require("jquery");
var options, bsNodes, bsEdges, abNodes, abEdges, nodes, edges, network;
var startP, secP = null, fromNode = null, toNode;
function drawGraph() {
    bsNodes = new vis.DataSet([]);
    bsEdges = new vis.DataSet([]);
    abNodes = new vis.DataSet([]);
    abEdges = new vis.DataSet([]);
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    var container = document.getElementById("my-network");
    container.innerHTML = '';
    var bsData = {
        nodes: bsNodes,
        edges: bsEdges
    };
    var abData = {
        nodes: abNodes,
        edges: abEdges
    };
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
            color: "#39c0ba",
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
            dragNodes: true,
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
                    background: "#39c0ba",
                    border: "#39c0ba",
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
                border: "#39c0ba",
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
    network = new vis.Network(container, bsData, options);
    getAllCommits(function (commits) {
        processGraph(commits);
    });
    network.on("stabilizationIterationsDone", function () {
        network.setOptions({ physics: false });
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
    }, false);
    var flag = "basic";
    network.on("zoom", function (callback) {
        var moveOptions = {
            scale: 1,
            animation: {
                duration: 1000,
                easingFunction: "easeInOutQuad",
            }
        };
        if (network.getScale() > 1.5 && callback.direction === '+' && flag === 'abstract') {
            network.setData(data);
            flag = 'node';
            network.fit(moveOptions);
        }
        else if (network.getScale() < 0.4 && callback.direction === '-' && flag === 'node') {
            network.setData(abData);
            flag = 'abstract';
            network.fit(moveOptions);
        }
        else if (network.getScale() > 1.5 && callback.direction === '+' && flag === 'basic') {
            network.setData(abData);
            flag = 'abstract';
            network.fit(moveOptions);
        }
        else if (network.getScale() < 0.4 && callback.direction === '-' && flag === 'abstract') {
            network.setData(bsData);
            flag = 'basic';
            network.fit(moveOptions);
        }
    }, false);
    network.on('dragStart', function (callback) {
        startP = callback.pointer.canvas;
    });
    network.on('dragEnd', function (cb) {
        fromNode = cb.nodes[0];
        network.moveNode(fromNode, startP.x, startP.y);
        secP = cb.pointer.DOM;
    }, false);
    network.on("animationFinished", function () {
        if (fromNode !== null && secP !== null) {
            var toNode_1 = network.getNodeAt(secP);
            if (fromNode !== toNode_1 && (nodes.get(fromNode)['shape'] === 'box') && (nodes.get(toNode_1)['shape'] === 'box')) {
                mergeCommits(nodes.get(fromNode)['title']);
            }
        }
        fromNode = null;
        secP = null;
    });
    network.on('oncontext', function (callback) {
        toNode = network.getNodeAt(callback.pointer.DOM);
        if (flag === 'node' && nodes.get(toNode)['shape'] === 'box') {
            toNode = nodes.get(toNode);
        }
        else if (flag === 'abstract' && abNodes.get(toNode)['shape'] === 'box') {
            toNode = abNodes.get(toNode);
        }
        else if (flag === 'basic' && bsNodes.get(toNode)['shape'] === 'box') {
            toNode = bsNodes.get(toNode);
        }
        else {
            toNode = undefined;
        }
        console.log("toNode:  " + toNode);
    });
}
