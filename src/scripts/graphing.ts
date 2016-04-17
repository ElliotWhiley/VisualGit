'use strict';

var vis = require('vis');

var nodeId = 1;
var nodes, edges, network;
var branches = {};
var tmpImage = 'http://blogprofitmedia.com/wp-content/themes/blogprofitmedia/tools/dragon-drop/images/dragon01.png';

document.addEventListener('DOMContentLoaded', function() {
  nodes = new vis.DataSet([]);
  edges = new vis.DataSet([]);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    layout:{
      randomSeed: 1,
      improvedLayout:true,
    },
    physics:{
    enabled: true,
    hierarchicalRepulsion: {
      centralGravity: 0,
      springLength: 100,
      springConstant: 0.01,
      nodeDistance: 120,
      damping: 0.09
    },
  },

  edges:{
      arrows: {
        to:     {enabled: true, scaleFactor:1},
        middle: {enabled: false, scaleFactor:1},
        from:   {enabled: false, scaleFactor:1}
      },
      arrowStrikethrough: true,
      color: {
        color:'#848484',
        highlight:'#848484',
        hover: '#848484',
        inherit: 'from',
        opacity:1.0
      },
      dashes: false,
      font: {
        color: '#343434',
        size: 14, // px
        face: 'arial',
        background: 'none',
        strokeWidth: 2, // px
        strokeColor: '#ffffff',
        align:'horizontal'
      },
      hidden: false,
      hoverWidth: 1.5,
      label: undefined,
      labelHighlightBold: true,
      length: undefined,
      physics: true,
      scaling:{
        min: 1,
        max: 15,
        label: {
          enabled: true,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5
        },
        customScalingFunction: function (min,max,total,value) {
          if (max === min) {
            return 0.5;
          }
          else {
            var scale = 1 / (max - min);
            return Math.max(0,(value - min)*scale);
          }
        }
      },
      selectionWidth: 1,
      selfReferenceSize:20,
      shadow:{
        enabled: false,
        color: 'rgba(0,0,0,0.5)',
        size:10,
        x:5,
        y:5
      },
      smooth: {
        enabled: true,
        type: "cubicBezier",
        roundness: 0.5
      },
    }
  }
  network = new vis.Network(container, data, options);
  // commit(['master'], 'master');
  // commit(['master'], 'master');
  // commit(['master'], 'master');
  // commit(['master'], 'master');
  // branch('master', 'develop');
  // commit(['develop'], 'develop');
  // commit(['develop'], 'develop');
  // commit(['develop'], 'develop');
  // merge('develop', 'master', false);
  // commit(['master'], 'master');
  // commit(['master'], 'master');
  // commit(['develop'], 'develop');
  // merge('develop', 'master', false);
}, false);

function commit(parentBranches, branch) {
  var id = incrementAndGetId();
  var name = 'Node ' + id;
  var fixed = (id == 1);
  var positionX = 0;
  var positionY = -id * 100;

  if (branch == 'second-feature') { positionX = -100; } //WIP

  nodes.add({
    id: id,
    label: name,
    shape: 'circularImage',
    image: tmpImage,
    physics: false,
    fixed: fixed,
    x: positionX,
    y: positionY
  });

  if (id != 1) {
    for (var i = 0; i < parentBranches.length; i++) {
      var latestCommit = getLatestCommit(parentBranches[i]);
      edges.add({from: latestCommit, to: id})
    }
  }
  commitToBranch(branch, id);
}

function merge(sourceBranch, destBranch, rebase) {
  var sourceParent = getLatestCommit(sourceBranch);
  var destParent = getLatestCommit(destBranch);

  if (sourceParent != null && destParent != null) {
    commit([destBranch, sourceBranch], destBranch);
  }
}

function branch(sourceBranch, destBranch) {
  var sourceParent = getLatestCommit(sourceBranch);

  if (sourceParent != null) {
    commit([sourceBranch], destBranch);
  }
}

function getLatestCommit(branch) {
  if (branches[branch] != null && branches[branch].length != 0) {
    return branches[branch][(branches[branch].length - 1)];
  } else {
    console.log("Trying to get latest commit for invalid branch '" + branch + "'");
  }
}

function commitToBranch(branchName, commitId) {
  if (branches[branchName] == null) {
    branches[branchName] = [commitId];
  } else {
    branches[branchName].push(commitId);
  }
}

function incrementAndGetId() {
  return nodeId++;
}

function plotGraph(commits) {
  //array[commit1, commit2, commit3....]
  //commit1.branch
  //commit1.author.avatar_url
  //commit1.author.login
  //commit1.commit.message
  //commit1.parents
  console.log(commits);
  for (var i = commits.length - 1; i >= 0; i--) {
    //Build up repo tree
    console.log(commits[i].parentBranches);
    console.log(commits[i].branch);
    commit(commits[i].parentBranches, commits[i].branch);
  }
}
