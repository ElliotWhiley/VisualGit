"use strict";
var vis = require("vis");
var github1 = require("octonode");
var nodeId = 1;
var absNodeId = 1;
var basicNodeId = 1;
var abstractList = [];
var basicList = [];
var commitHistory = [];
var commitList = [];
var spacingY = 100;
var spacingX = 80;
var parentCount = {};
var columns = [];
var abstractCount = 0;
var basicCount = 0;
var githubUsername = require('github-username');
var avatarUrls = {};
function processGraph(commits) {
    sortCommits(commits);
    populateCommits();
}
function sortCommits(commits) {
    while (commits.length > 0) {
        var commit = commits.shift();
        var parents = commit.parents();
        if (parents === null || parents.length === 0) {
            commitHistory.push(commit);
        }
        else {
            var count = 0;
            for (var i = 0; i < parents.length; i++) {
                var psha = parents[i].toString();
                for (var j = 0; j < commitHistory.length; j++) {
                    if (commitHistory[j].toString() === psha) {
                        count++;
                        break;
                    }
                }
                if (count < i + 1) {
                    break;
                }
            }
            if (count === parents.length) {
                commitHistory.push(commit);
            }
            else {
                commits.push(commit);
            }
        }
    }
}
function populateCommits() {
    nodeId = 1;
    absNodeId = 1;
    basicNodeId = 1;
    commitList = [];
    parentCount = {};
    columns = [];
    for (var i = 0; i < commitHistory.length; i++) {
        console.log(i + " / " + commitHistory.length);
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
            console.log("1.10");
        }
        else if (parents.length === 1) {
            console.log("1.20");
            console.log("1.20 " + commitList[0]['sha'].toString());
            var parent_2 = parents[0];
            console.log(parent_2.toString());
            var parentId = getNodeId(parent_2.toString());
            console.log("1.211  " + parentId);
            var parentColumn = commitList[parentId - 1]["column"];
            console.log("1.212");
            if (parentCount[parent_2] === 1) {
                nodeColumn = parentColumn;
            }
            else {
                nodeColumn = nextFreeColumn(parentColumn);
            }
            console.log("1.22");
        }
        else {
            var desiredColumn = -1;
            var desiredParent = "";
            var freeableColumns = [];
            console.log("1.30");
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
            console.log("1.31");
            for (var k = 0; k < freeableColumns.length; k++) {
                var index = freeableColumns[k];
                columns[index] = false;
            }
            if (parentCount[desiredParent] === 1) {
                nodeColumn = desiredColumn;
            }
            else {
                nodeColumn = nextFreeColumn(desiredColumn);
            }
            console.log("1.32");
        }
        makeNode(commitHistory[i], nodeColumn);
        makeAbsNode(commitHistory[i], nodeColumn);
        makeBasicNode(commitHistory[i], nodeColumn);
    }
    for (var i = 0; i < commitHistory.length; i++) {
        addEdges(commitHistory[i]);
    }
    for (var i = 0; i < abstractList.length; i++) {
        addAbsEdge(abstractList[i]);
    }
    for (var i = 0; i < basicList.length; i++) {
        addBasicEdge(basicList[i]);
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
function addAbsEdge(c) {
    var parents = c['parents'];
    for (var i = 0; i < parents.length; i++) {
        for (var j = 0; j < abstractList.length; j++) {
            console.log(i + "  " + j + "  " + abstractList[j]['sha']);
            if (abstractList[j]['sha'].indexOf(parents[i].toString()) > -1) {
                abEdges.add({
                    from: abstractList[j]['id'],
                    to: c['id']
                });
            }
        }
    }
}
function addBasicEdge(c) {
    var parents = c['parents'];
    for (var i = 0; i < parents.length; i++) {
        for (var j = 0; j < basicList.length; j++) {
            console.log(i + "  " + j + "  " + basicList[j]['sha']);
            if (basicList[j]['sha'].indexOf(parents[i].toString()) > -1) {
                bsEdges.add({
                    from: basicList[j]['id'],
                    to: c['id']
                });
            }
        }
    }
}
function makeBasicNode(c, column) {
    var reference;
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var flag = true;
    var count = 1;
    if (c.parents().length === 1) {
        var cp = c.parents()[0].toString();
        for (var i = 0; i < basicList.length; i++) {
            var index = basicList[i]['sha'].indexOf(cp);
            if (index > -1) {
                flag = false;
                if (basicList[i]['email'].indexOf(email) < 0) {
                    basicList[i]['email'].push(email);
                }
                basicList[i]['count'] += 1;
                count = basicList[i]['count'];
                basicList[i]['sha'].push(c.toString());
                break;
            }
        }
    }
    if (flag) {
        var id = basicNodeId++;
        var title = "Number of Commits: " + count;
        bsNodes.add({
            id: id,
            shape: "circularImage",
            title: title,
            image: imageForUser(email),
            physics: false,
            fixed: (id === 1),
            x: (column - 1) * spacingX,
            y: (id - 1) * spacingY,
        });
        var shaList = [];
        shaList.push(c.toString());
        var emailList = [];
        emailList.push(email);
        basicList.push({
            sha: shaList,
            id: id,
            time: c.timeMs(),
            column: column,
            email: emailList,
            reference: reference,
            parents: c.parents(),
            count: 1,
        });
    }
}
function makeAbsNode(c, column) {
    var reference;
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var flag = true;
    var count = 1;
    if (c.parents().length === 1) {
        var cp = c.parents()[0].toString();
        for (var i = 0; i < abstractList.length; i++) {
            var index = abstractList[i]['sha'].indexOf(cp);
            if (index > -1 && abstractList[i]['email'] === email) {
                flag = false;
                abstractList[i]['count'] += 1;
                count = abstractList[i]['count'];
                abstractList[i]['sha'].push(c.toString());
                abNodes.update({ id: i + 1, title: "Author: " + email + "<br>" + "Number of Commits: " + count });
                break;
            }
        }
    }
    if (flag) {
        var id = absNodeId++;
        var title = "Author: " + email + "<br>" + "Number of Commits: " + count;
        abNodes.add({
            id: id,
            shape: "circularImage",
            title: title,
            image: imageForUser(email),
            physics: false,
            fixed: (id === 1),
            x: (column - 1) * spacingX,
            y: (id - 1) * spacingY,
        });
        var shaList = [];
        shaList.push(c.toString());
        abstractList.push({
            sha: shaList,
            id: id,
            time: c.timeMs(),
            column: column,
            email: email,
            reference: reference,
            parents: c.parents(),
            count: 1,
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
