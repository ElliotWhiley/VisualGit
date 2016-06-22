let vis = require("vis");

let options, nodes, edges, network;

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
      color: "2B7CE9",
      hoverWidth: 0,
      physics: false,
      selectionWidth: 0,
      shadow: true,
      smooth: {
        enabled: true,
        type: "cubicBezier",
        forceDirection: "horizontal",
        roundness: 1
      },
      width: 4,
    },

    groups: {},

    interaction: {
      dragNodes: false,
      dragView: true,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
      hover: true,
      hoverConnectedEdges: false,
      keyboard: {
        enabled: false,
        speed: {x: 10, y: 10, zoom: 0.02},
        bindToWindow: true
      },
      multiselect: false,
      navigationButtons: false,
      selectable: true,
      selectConnectedEdges: false,
      tooltipDelay: 300,
      zoomView: false,
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
          background: "#ff0000",
          border: "#3c3c3c",
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
      borderWidth: 4,
      borderWidthSelected: 4,
      color: {
        border: "#2B7CE9",
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

  network = new vis.Network(container, data, options);

  let repository = "tmp";
  getAllCommits(repository, function(commits) {
    populateCommits(commits);
  });
// Basic move to set up the history location
network.moveTo({
  position: {x: 0, y: 200},
  offset: {x: 0, y: 0}
});
}, false);
