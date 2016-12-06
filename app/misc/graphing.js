"use strict";
var vis = require("vis");
var nodeId = 1;
var commitHistory = [];
var commitList = [];
var spacingY = 100;
var spacingX = 80;
var parentCount = {};
var columns = [];
function process(commits) {
    populateCommits(commits);
}
function populateCommits(commits) {
    nodeId = 1;
    commitList = [];
    parentCount = {};
    columns = [];
    commitHistory = commits.sort(function (a, b) {
        return a.timeMs() - b.timeMs();
    });
    for (var i = 0; i < commitHistory.length; i++) {
        var parents = commitHistory[i].parents();
        var nodeColumn = void 0;
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
            nodeColumn = 0;
        }
        else if (parents.length === 1) {
            var parent_2 = parents[0];
            var parentId = getNodeId(parents.toString());
            var parentColumn = commitList[parentId - 1]["column"];
            if (parentCount[parent_2] === 1) {
                nodeColumn = parentColumn;
            }
            else {
                nodeColumn = nextFreeColumn(parentColumn);
            }
        }
        else {
            var desiredColumn = -1;
            var desiredParent = "";
            var freeableColumns = [];
            for (var j = 0; j < parents.length; j++) {
                var parent_3 = parents[j];
                var parentId = getNodeId(parent_3.toString());
                var proposedColumn = commitList[parentId - 1]["column"];
                if (desiredColumn === -1 || desiredColumn > proposedColumn) {
                    desiredColumn = proposedColumn;
                    desiredParent = parent_3;
                }
                else {
                    freeableColumns.push(proposedColumn);
                }
            }
            for (var i_1 = 0; i_1 < freeableColumns.length; i_1++) {
                var index = freeableColumns[i_1];
                columns[index] = false;
            }
            if (parentCount[desiredParent] === 1) {
                nodeColumn = desiredColumn;
            }
            else {
                nodeColumn = nextFreeColumn(desiredColumn);
            }
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
function nextFreeColumn(column) {
    while (columns[column] === true) {
        column++;
    }
    return column;
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
    var reference;
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var title = "Author: " + email + "<br>" + "Message: " + c.message();
    var oid = c.id();
    Git.Repository.open(repoFullPath)
        .then(function (repoResult) {
        Git.Reference.create(repoResult, "HEAD", oid, 1, "checkout reference").then(function (ref) {
            reference = ref;
        });
    });
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
        reference: reference,
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
