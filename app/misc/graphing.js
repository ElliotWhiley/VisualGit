"use strict";
var vis = require("vis");
var nodeId = 1;
var commitHistory = [];
var commitList = [];
var spacingY = 100;
var spacingX = 80;
var parentCount = {};
function process(commits) {
    populateCommits(commits);
}
function populateCommits(commits) {
    commitHistory = commits.sort(function (a, b) {
        return a.timeMs() - b.timeMs();
    });
    var columns = [];
    for (var i = 0; i < commitHistory.length; i++) {
        var parents = commitHistory[i].parents();
        var nodeColumn = 0;
        var desiredColumn = 0;
        for (var j = 0; j < parents.length; j++) {
            var parent_1 = parents[j];
            if (!(parent_1 in parentCount)) {
                parentCount[parent_1] = 1;
            }
            else {
                parentCount[parent_1]++;
            }
        }
        if (parents.length === 0) {
            columns[0] = true;
        }
        else {
            if (parents.length === 1) {
                var parentId = getNodeId(parents[0].toString());
                if (parentCount[parents[0].toString()] === 1) {
                    desiredColumn = commitList[parentId - 1]["column"];
                }
                else {
                    desiredColumn = commitList[parentId - 1]["column"] + parentCount[parents[0].toString()];
                }
            }
            else
                for (var j = 0; j < parents.length; j++) {
                    var parent_2 = parents[j];
                    var parentId = getNodeId(parent_2.toString());
                    var proposedColumn = commitList[parentId - 1]["column"];
                    if (desiredColumn > proposedColumn) {
                        desiredColumn = proposedColumn;
                    }
                    while (columns[desiredColumn] === true) {
                        desiredColumn++;
                    }
                }
            nodeColumn = desiredColumn;
            columns[nodeColumn] = true;
        }
        makeNode(commitHistory[i], nodeColumn);
    }
    for (var i = 0; i < commitHistory.length; i++) {
        addEdges(commitHistory[i]);
    }
    commitList = commitList.sort(timeCompare);
    reCenter();
}
function timeCompare(a, b) {
    return a.time - b.time;
}
function addEdges(c) {
    var parents = c.parents();
    if (parents.length !== 0) {
        parents.forEach(function (parent) {
            var sha = c.sha();
            var parentSha = parent.toString();
            makeEdge(sha, parentSha);
        });
    }
}
function makeNode(c, column) {
    var id = nodeId++;
    var name = "Node " + id;
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var title = "author: " + email + "<br>" + "message: " + c.message();
    nodes.add({
        id: id,
        shape: "circularImage",
        title: title,
        image: imageForUser(email),
        physics: false,
        fixed: (id === 1),
        x: (column - 1) * spacingX,
        y: (id - 1) * spacingY,
    });
    commitList.push({
        sha: c.sha(),
        id: id,
        time: c.timeMs(),
        column: column,
        email: email,
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
function reCenter() {
    var moveOptions = {
        offset: { x: -150, y: 200 },
        scale: 1,
        animation: {
            duration: 1000,
            easingFunction: "easeInOutQuad",
        }
    };
    network.focus(commitList[commitList.length - 1]["id"], moveOptions);
}
