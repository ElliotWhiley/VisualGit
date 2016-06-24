import * as nodegit from "git";

let vis = require("vis");

let nodeId = 1;
let commitHistory = [];
let commitList = [];
let spacingY = 100;
let spacingX = 80;
let parentCount = {};
let columns: boolean[] = [];

function process(commits: nodegit.Commit[]) {
  populateCommits(commits);
}

function populateCommits(commits) {
  // reset variables for idempotency, shouldn't be needed when a class is created instead
  nodeId = 1;
  commitList = [];
  parentCount = {};
  columns = [];

  // Sort
  commitHistory = commits.sort(function(a, b) {
    return a.timeMs() - b.timeMs();
  });

  // Plot the graph
  for (let i = 0; i < commitHistory.length; i++) {
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
      let parentId = getNodeId(parents.toString());
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
      for (let i = 0; i < freeableColumns.length; i++) {
        let index = freeableColumns[i];
        columns[index] = false;
      }
      if (parentCount[desiredParent] === 1) {
        // first child
        nodeColumn = desiredColumn;
      } else {
        nodeColumn = nextFreeColumn(desiredColumn);
      }
    }

    makeNode(commitHistory[i], nodeColumn);
  }

  // Add edges
  for (let i = 0; i < commitHistory.length; i++) {
    addEdges(commitHistory[i]);
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

function makeNode(c, column: number) {
  let id = nodeId++;
  let name = "Node " + id;

  let stringer = c.author().toString().replace(/</, "%").replace(/>/, "%");
  let email = stringer.split("%")[1];
  let title = "Author: " + email + "<br>" + "Message: " + c.message();

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
