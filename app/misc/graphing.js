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
var numOfCommits = 0;
var githubUsername = require('github-username');
var avatarUrls = {};
function processGraph(commits) {
    commitHistory = [];
    numOfCommits = commits.length;
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
            var parentId = getNodeId(parent_2.toString());
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
    var name = getName(c.author().toString());
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var flag = true;
    var count = 1;
    if (c.parents().length === 1) {
        var cp = c.parents()[0].toString();
        for (var i = 0; i < basicList.length; i++) {
            var index = basicList[i]['sha'].indexOf(cp);
            if (index > -1 && basicList[i]['column'] === column) {
                flag = false;
                if (basicList[i]['email'].indexOf(email) < 0) {
                    basicList[i]['email'].push(email);
                }
                basicList[i]['count'] += 1;
                count = basicList[i]['count'];
                bsNodes.update({ id: i + 1, title: "Number of Commits: " + count });
                basicList[i]['sha'].push(c.toString());
                break;
            }
        }
    }
    else if (c.parents().length === 2) {
    }
    if (flag) {
        var id = basicNodeId++;
        var title = "Number of Commits: " + count;
        bsNodes.add({
            id: id,
            shape: "circularImage",
            title: title,
            image: img4User(name),
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
    var name = getName(c.author().toString());
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var flag = true;
    var count = 1;
    if (c.parents().length === 1) {
        var cp = c.parents()[0].toString();
        for (var i = 0; i < abstractList.length; i++) {
            var index = abstractList[i]['sha'].indexOf(cp);
            if (index > -1 && abstractList[i]['email'] === email && abstractList[i]['column'] === column) {
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
            image: img4User(name),
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
    var reference;
    var name = getName(c.author().toString());
    var stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
    var email = stringer.split("%")[1];
    var title = "Author: " + email + "<br>" + "Message: " + c.message();
    var flag = false;
    nodes.add({
        id: id,
        shape: "circularImage",
        title: title,
        image: img4User(name),
        physics: false,
        fixed: true,
        x: (column - 1) * spacingX,
        y: (id - 1) * spacingY,
    });
    if (c.toString() in bname) {
        for (var i = 0; i < bname[c.toString()].length; i++) {
            var branchName = bname[c.toString()][i];
            var bp = branchName.name().split("/");
            var shortName = bp[bp.length - 1];
            console.log(shortName + "   " + branchName.isHead().toString());
            if (branchName.isHead()) {
                shortName = "*" + shortName;
            }
            nodes.add({
                id: id + numOfCommits * (i + 1),
                shape: "box",
                title: branchName,
                label: shortName,
                physics: false,
                fixed: false,
                x: (column - 0.6 * (i + 1)) * spacingX,
                y: (id - 0.3) * spacingY,
            });
            edges.add({
                from: id + numOfCommits * (i + 1),
                to: id
            });
        }
        flag = true;
    }
    commitList.push({
        sha: c.sha(),
        id: id,
        time: c.timeMs(),
        column: column,
        email: email,
        reference: reference,
        branch: flag,
    });
    console.log("sha: " + c.sha());
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
