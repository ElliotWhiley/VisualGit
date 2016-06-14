'use strict';
var vis = require('vis');
var nodeId = 1;
var options, nodes, edges, network;
var commitHistory = [];
var commitList = [];
var tmpImage = 'http://blogprofitmedia.com/wp-content/themes/blogprofitmedia/tools/dragon-drop/images/dragon01.png';
document.addEventListener('DOMContentLoaded', function () {
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    options = {
        layout: {
            randomSeed: 1,
            improvedLayout: true,
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                centralGravity: 0,
                springLength: 100,
                springConstant: 0.01,
                nodeDistance: 120,
                damping: 0.09
            },
        },
        nodes: {
            borderWidth: 2,
            shadow: true,
        },
        edges: {
            arrows: {
                to: { enabled: true, scaleFactor: 1 },
                middle: { enabled: false, scaleFactor: 1 },
                from: { enabled: false, scaleFactor: 1 }
            },
            arrowStrikethrough: true,
            color: {
                color: '#848484',
                highlight: '#848484',
                hover: '#848484',
                inherit: 'from',
                opacity: 1.0
            },
            dashes: false,
            font: {
                color: '#343434',
                size: 14,
                face: 'arial',
                background: 'none',
                strokeWidth: 2,
                strokeColor: '#ffffff',
                align: 'horizontal'
            },
            hidden: false,
            hoverWidth: 1.5,
            label: undefined,
            labelHighlightBold: true,
            length: undefined,
            physics: true,
            scaling: {
                min: 1,
                max: 15,
                label: {
                    enabled: true,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
                customScalingFunction: function (min, max, total, value) {
                    if (max === min) {
                        return 0.5;
                    }
                    else {
                        var scale = 1 / (max - min);
                        return Math.max(0, (value - min) * scale);
                    }
                }
            },
            selectionWidth: 1,
            selfReferenceSize: 20,
            shadow: true,
            smooth: {
                enabled: true,
                type: "cubicBezier",
                roundness: 0.7
            },
        }
    };
    network = new vis.Network(container, data, options);
    var repository = "/Users/harveyr/uni/project/git-history-template";
    getAllCommits(repository, function (commits) {
        populateCommits(commits);
    });
}, false);
function populateCommits(commits) {
    commitHistory = commits;
    for (var i = 0; i < commitHistory.length; i++) {
        makeNode(commitHistory[i]);
    }
    for (var i = 0; i < commitHistory.length; i++) {
        addEdges(commitHistory[i]);
    }
    console.log(commitList);
}
function addEdges(c) {
    var parents = c.parents();
    if (parents.length != 0) {
        parents.forEach(function (parentSha) {
            var sha = c.sha();
            makeEdge(sha, parentSha);
        });
    }
}
function makeNode(c) {
    var id = nodeId++;
    var name = 'Node ' + id;
    nodes.add({
        id: id,
        label: name,
        shape: 'circularImage',
        image: tmpImage,
        physics: true,
    });
    commitList.push({
        sha: c.sha(),
        id: id,
    });
}
function makeEdge(sha, parentSha) {
    var fromNode = getNodeId(parentSha.toString());
    var toNode = getNodeId(sha);
    edges.add({
        from: fromNode,
        to: toNode
    });
}
function getNodeId(sha) {
    for (var i = 0; i < commitList.length; i++) {
        var c = commitList[i];
        if (c["sha"] === sha) {
            return c["id"];
        }
    }
}
