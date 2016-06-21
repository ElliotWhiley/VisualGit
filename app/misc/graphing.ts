import * as nodegit from "git";

let vis = require("vis");

let nodeId = 1;
let options, nodes, edges, network;
let commitHistory = [];
let commitList = [];
let spacingY = 100;
let spacingX = 80;
let parentCount = {};

let tmpImage = "http://blogprofitmedia.com/wp-content/themes/blogprofitmedia/tools/dragon-drop/images/dragon01.png";

document.addEventListener("DOMContentLoaded", function() {
  nodes = new vis.DataSet([]);
  edges = new vis.DataSet([]);

  // create a network
  let container = document.getElementById("my-network");
  let data = {
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
        to:     {enabled: true, scaleFactor: 1},
        middle: {enabled: false, scaleFactor: 1},
        from:   {enabled: false, scaleFactor: 1}
      },
      arrowStrikethrough: true,
      color: {
        color: "#848484",
        highlight: "#848484",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0
      },
      dashes: false,
      font: {
        color: "#343434",
        size: 14, // px
        face: "arial",
        background: "none",
        strokeWidth: 2, // px
        strokeColor: "#ffffff",
        align: "horizontal"
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
        customScalingFunction: function (min: number, max: number, total: number, value: number) {
          if (max === min) {
            return 0.5;
          }
          else {
            let scale = 1 / (max - min);
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

  let repository = "tmp";
  getAllCommits(repository, function(commits) {
    populateCommits(commits);
  });

}, false);

function process(commits: nodegit.Commit[]) {
  populateCommits(commits);
}

function populateCommits(commits: any) {
  // Sort
  commitHistory = commits.sort(function(a: any, b: any) {
    return a.timeMs() - b.timeMs();
  });

  for (let i = 0; i < commitHistory.length; i++) {
    let parents = commitHistory[i].parents();
    let column = 1;

    for (let j = 0; j < parents.length; j++) {
      let parent = parents[j];
      if (!(parent in parentCount)) {
        parentCount[parent] = 1;
        column = 1;
      } else {
        parentCount[parent]++;
        column = parentCount[parent];
      }
    }

    makeNode(commitHistory[i], column);
  }
  console.log(parentCount);

  // Add edges
  for (let i = 0; i < commitHistory.length; i++) {
    addEdges(commitHistory[i]);
  }

  commitList = commitList.sort(timeCompare);

  console.log(commitList);
}

function timeCompare(a, b) {
  return a.time - b.time;
}

function addEdges(c) {
  let parents = c.parents();

  if (parents.length !== 0) {
    parents.forEach(function(parentSha) {
      let sha = c.sha();

      makeEdge(sha, parentSha);
    });
  }
}

function makeNode(c, column) {
  let id = nodeId++;
  let name = "Node " + id;

  nodes.add({
    id: id,
    label: name,
    shape: "circularImage",
    image: tmpImage,
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
  });
}

function makeEdge(sha, parentSha) {
  let fromNode = getNodeId(parentSha.toString());
  let toNode = getNodeId(sha);

  edges.add({
    from: fromNode,
    to: toNode
  });
}

function getNodeId(sha) {
  for (let i = 0; i < commitList.length; i++) {
    let c = commitList[i];
    if (c["sha"] === sha) {
      return c["id"];
    }
  }
}
