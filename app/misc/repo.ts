let Git = require("nodegit");

let repoFullPath;
let repoLocalPath;
let repoCurrentBranch = 'master';

function downloadRepository() {
  let cloneURL = document.getElementById("repoClone").value;
  let localPath = document.getElementById("repoSave").value;
  let fullLocalPath = require("path").join(__dirname, localPath);
  let options = {};

  options.fetchOpts = {
    callbacks: {
      certificateCheck: function() { return 1; },
      credentials: function(url, userName) {
        return Git.Cred.sshKeyFromAgent(userName);
      }
    }
  };

  console.log("cloning into " + fullLocalPath);
  let repository = Git.Clone(cloneURL, fullLocalPath, options)
  .then(function(repository) {
    console.log("Repo successfully cloned");
    repoFullPath = fullLocalPath;
    repoLocalPath = localPath;
    refreshAll(repository);
  },
  function(err) {
    console.log(err); // TODO show error on screen
  });
}

function openRepository() {
  let localPath = document.getElementById("repoOpen").value;
  let fullLocalPath = require("path").join(__dirname, localPath);

  console.log("Trying to open repository at " + fullLocalPath);
  Git.Repository.open(fullLocalPath).then(function(repository) {
    console.log("Repo successfully opened");
    repoFullPath = fullLocalPath;
    repoLocalPath = localPath;
    refreshAll(repository);
  },
  function(err) {
    console.log(err); // TODO show error on screen
  });
}

function refreshAll(repository) {
  let branch;

  repository.getCurrentBranch()
  .then(function(reference) {
    let branchParts = reference.name().split("/");
    branch = branchParts[branchParts.length - 1];
  })
  .then(function() {
    console.log("Updating the graph and the labels");
    drawGraph();
    document.getElementById("repo-name").innerHTML = "/" + repoLocalPath;
    document.getElementById("branch-name").innerHTML = "/" + branch;
  });
}

function updateLocalPath() {
  let text = document.getElementById("repoClone").value;
  let splitText = text.split(/\.|:|\//);
  if (splitText.length >= 2) {
    document.getElementById("repoSave").value = splitText[splitText.length - 2];
  }

}
