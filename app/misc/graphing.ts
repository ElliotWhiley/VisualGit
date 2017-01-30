import * as nodegit from "git";

let vis = require("vis");
let github1 = require("octonode");
let nodeId = 1;
let absNodeId = 1;
let basicNodeId = 1;
let abstractList = [];
let basicList = [];
let commitHistory = [];
let commitList = [];
let spacingY = 100;
let spacingX = 80;
let parentCount = {};
let columns: boolean[] = [];
let abstractCount = 0;
let basicCount = 0;
let numOfCommits = 0;
let githubUsername = require('github-username');
let avatarUrls = {};

function processGraph(commits: nodegit.Commit[]) {
  commitHistory = [];
  numOfCommits = commits.length;
  sortCommits(commits);
  populateCommits();
}

function sortCommits(commits) {
  while (commits.length > 0) {
    let commit = commits.shift();
    let parents = commit.parents();
    if (parents === null || parents.length === 0) {
      commitHistory.push(commit);
    } else {
      let count = 0;
      for (let i = 0; i < parents.length; i++) {
        let psha = parents[i].toString();
        for (let j = 0; j < commitHistory.length; j++) {
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
      } else {
        commits.push(commit);
      }
    }
  }
}

function populateCommits() {
  // reset variables for idempotency, shouldn't be needed when a class is created instead
  nodeId = 1;
  absNodeId = 1;
  basicNodeId = 1;
  commitList = [];
  parentCount = {};
  columns = [];
  // Sort
  // commitHistory = commits.sort(function(a, b) {
  //   return a.timeMs() - b.timeMs();
  // });

  // Plot the graph
  for (let i = 0; i < commitHistory.length; i++) {
    //console.log(i + " / " + commitHistory.length);
    let parents: string[] = commitHistory[i].parents();
    let nodeColumn;
    for (let j = 0; j < parents.length; j++) {
      let parent = parents[j];
      if (!(parent in parentCount)) {
        parentCount[parent] = 1;
      } else {
        parentCount[parent]++;
      }
    }
    if (parents.length === 0) {
      // no parents means first commit so assign the first column
      columns[0] = true;
      nodeColumn = 0;
    } else if (parents.length === 1) {
      let parent = parents[0];
      let parentId = getNodeId(parent.toString());
      let parentColumn = commitList[parentId - 1]["column"];
      if (parentCount[parent] === 1) {
        // first child
        nodeColumn = parentColumn;
      } else {
        nodeColumn = nextFreeColumn(parentColumn);
      }
    } else {
      let desiredColumn: number = -1;
      let desiredParent: string = "";
      let freeableColumns: number[] = [];
      for (let j = 0; j < parents.length; j++) {
        let parent: string = parents[j];
        let parentId = getNodeId(parent.toString());
        let proposedColumn = commitList[parentId - 1]["column"];

        if (desiredColumn === -1 || desiredColumn > proposedColumn) {
          desiredColumn = proposedColumn;
          desiredParent = parent;
        } else {
          freeableColumns.push(proposedColumn);
        }

      }
      for (let k = 0; k < freeableColumns.length; k++) {
        let index = freeableColumns[k];
        columns[index] = false;
      }
      if (parentCount[desiredParent] === 1) {
        // first child
        nodeColumn = desiredColumn;
      } else {
        nodeColumn = nextFreeColumn(desiredColumn);
      }
    }

    //console.log(Object.keys(bsNodes).length + "????");

    makeNode(commitHistory[i], nodeColumn);
    makeAbsNode(commitHistory[i], nodeColumn);
    makeBasicNode(commitHistory[i], nodeColumn);
  }

  // Add edges
  for (let i = 0; i < commitHistory.length; i++) {
    addEdges(commitHistory[i]);
  }

  for (let i = 0; i < abstractList.length; i++) {
    addAbsEdge(abstractList[i]);
  }

  for (let i = 0; i < basicList.length; i++) {
    addBasicEdge(basicList[i]);
  }

  commitList = commitList.sort(timeCompare);
  reCenter();
}

function timeCompare(a, b) {
  return a.time - b.time;
}

function nextFreeColumn(column: number) {
  while (columns[column] === true) {
    column++;
  }
  return column;
}

function addEdges(c) {
  let parents = c.parents();
  if (parents.length !== 0) {
    parents.forEach(function(parent) {
      let sha: string = c.sha();
      let parentSha: string = parent.toString();
      makeEdge(sha, parentSha);
    });
  }
}

function addAbsEdge(c) {
  let parents = c['parents'];
  for (let i = 0; i < parents.length; i++) {
    for (let j = 0; j < abstractList.length; j++) {
      //console.log(i + "  " + j + "  " + abstractList[j]['sha']);
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
  let parents = c['parents'];
  for (let i = 0; i < parents.length; i++) {
    for (let j = 0; j < basicList.length; j++) {
      //console.log(i + "  " + j + "  " + basicList[j]['sha']);
      if (basicList[j]['sha'].indexOf(parents[i].toString()) > -1) {
        bsEdges.add({
          from: basicList[j]['id'],
          to: c['id']
        });
      }
    }
  }
}

function makeBasicNode(c, column: number) {
  let reference;
  let name = getName(c.author().toString());
  let stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
  let email = stringer.split("%")[1];
  let flag = true;
  let count = 1;
  if (c.toString() in bname) {
    console.log("result: " + bname[c.toString()]);
  } else if (c.parents().length === 1) {
    let cp = c.parents()[0].toString();
    console.log("cid2: " + c.toString());
    for (let i = 0; i < basicList.length; i++) {
      let index = basicList[i]['sha'].indexOf(cp);
      if (index > -1 && basicList[i]['column'] === column) {
        flag = false;
        if (basicList[i]['email'].indexOf(email) < 0) {
          basicList[i]['email'].push(email);
        }
        basicList[i]['count'] += 1;
        count = basicList[i]['count'];
        bsNodes.update({id: i+1, title: "Number of Commits: " + count});
        basicList[i]['sha'].push(c.toString());
        break;
      }
    }
  } else if (c.parents().length === 2) {
    //console.log(email + "?????");
  }

  if (flag) {
    let id = basicNodeId++;
    let title = "Number of Commits: " + count;
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

    if (c.toString() in bname) {
      for (let i = 0; i < bname[c.toString()].length; i++) {
        let branchName = bname[c.toString()][i];
        let bp = branchName.name().split("/");
        let shortName = bp[bp.length - 1];
        console.log(shortName + "   " + branchName.isHead().toString());
        if (branchName.isHead()) {
          shortName = "*" + shortName;
        }
        bsNodes.add({
          id: id + numOfCommits * (i + 1),
          shape: "box",
          title: branchName,
          label: shortName,
          physics: false,
          fixed: false,
          x: (column - 0.6 * (i + 1)) * spacingX,
          y: (id - 0.3) * spacingY,
        });

        bsEdges.add({
          from: id + numOfCommits * (i + 1),
          to: id
        });
      }
    }

    let shaList = [];
    shaList.push(c.toString());

    let emailList = [];
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

function makeAbsNode(c, column: number) {
  let reference;
  let name = getName(c.author().toString());
  let stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
  let email = stringer.split("%")[1];
  let flag = true;
  let count = 1;
  if (c.parents().length === 1) {
    let cp = c.parents()[0].toString();
    for (let i = 0; i < abstractList.length; i++) {
      let index = abstractList[i]['sha'].indexOf(cp);
      if (index > -1 && abstractList[i]['email'] === email && abstractList[i]['column'] === column && !(c.toString() in bname)) {
        flag = false;
        abstractList[i]['count'] += 1;
        count = abstractList[i]['count'];
        abstractList[i]['sha'].push(c.toString());
        abNodes.update({id: i+1, title: "Author: " + email + "<br>" + "Number of Commits: " + count});
        break;
      }
    }
  }

  if (flag) {
    let id = absNodeId++;
    let title = "Author: " + email + "<br>" + "Number of Commits: " + count;

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

    if (c.toString() in bname) {
      for (let i = 0; i < bname[c.toString()].length; i++) {
        let branchName = bname[c.toString()][i];
        let bp = branchName.name().split("/");
        let shortName = bp[bp.length - 1];
        console.log(shortName + "   " + branchName.isHead().toString());
        if (branchName.isHead()) {
          shortName = "*" + shortName;
        }
        abNodes.add({
          id: id + numOfCommits * (i + 1),
          shape: "box",
          title: branchName,
          label: shortName,
          physics: false,
          fixed: false,
          x: (column - 0.6 * (i + 1)) * spacingX,
          y: (id - 0.3) * spacingY,
        });

        abEdges.add({
          from: id + numOfCommits * (i + 1),
          to: id
        });
      }
    }

    let shaList = [];
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

function makeNode(c, column: number) {
  let id = nodeId++;
  let reference;
  let name = getName(c.author().toString());
  let stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
  let email = stringer.split("%")[1];
  let title = "Author: " + email + "<br>" + "Message: " + c.message();
  let flag = false;
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
    for (let i = 0; i < bname[c.toString()].length; i++) {
      let branchName = bname[c.toString()][i];
      let bp = branchName.name().split("/");
      let shortName = bp[bp.length - 1];
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

  //console.log(commitList[id-1]['id'] + '   ' + id);
}

function makeEdge(sha: string, parentSha: string) {
  let fromNode = getNodeId(parentSha.toString());
  let toNode = getNodeId(sha);

  edges.add({
    from: fromNode,
    to: toNode
  });
}

function getNodeId(sha: string) {
  for (let i = 0; i < commitList.length; i++) {
    let c = commitList[i];
    if (c["sha"] === sha) {
      return c["id"];
    }
  }
}

function reCenter() {
  let moveOptions = {
    offset: {x: -150, y: 200},
    scale: 1,
    animation: {
      duration: 1000,
      easingFunction: "easeInOutQuad",
    }
  };

  network.focus(commitList[commitList.length - 1]["id"], moveOptions);
}
