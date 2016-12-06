let Git = require("nodegit");

let repoFullPath;
let repoLocalPath;
let repoCurrentBranch = "master";
let modal;
let span;

function downloadRepository() {
  let cloneURL = document.getElementById("repoClone").value;
  let localPath = document.getElementById("repoSave").value;
  let fullLocalPath = require("path").join(__dirname, localPath);
  let options = {};

  displayModal("Cloning Repository...");

  options = {
    fetchOpts: {
      callbacks: {
        certificateCheck: function() { return 1; },
        credentials: function() {
          return cred;
        }
      }
    }
  };

  console.log("cloning into " + fullLocalPath);
  let repository = Git.Clone(cloneURL, fullLocalPath, options)
  .then(function(repository) {
    console.log("Repo successfully cloned");
    updateModalText("Clone Successful, repository saved under: " + fullLocalPath);
    addCommand("git clone " + cloneURL + " " + localPath);
    repoFullPath = fullLocalPath;
    repoLocalPath = localPath;
    refreshAll(repository);
  },
  function(err) {
    updateModalText("Clone Failed - " + err);
    console.log(err); // TODO show error on screen
  });
}

function openRepository() {
  let localPath = document.getElementById("repoOpen").value;
  let fullLocalPath = require("path").join(__dirname, localPath);

  console.log("Trying to open repository at " + fullLocalPath);
  displayModal("Opening Local Repository...");

  Git.Repository.open(fullLocalPath).then(function(repository) {
    console.log("Repo successfully opened");
    updateModalText("Repository successfully opened");
    repoFullPath = fullLocalPath;
    repoLocalPath = localPath;
    refreshAll(repository);
  },
  function(err) {
    updateModalText("Opening Failed - " + err)
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
    document.getElementById("repo-name").innerHTML = repoLocalPath;
    document.getElementById("branch-name").innerHTML = branch;
  });
}

function updateLocalPath() {
  let text = document.getElementById("repoClone").value;
  let splitText = text.split(/\.|:|\//);
  if (splitText.length >= 2) {
    document.getElementById("repoSave").value = splitText[splitText.length - 2];
  }
}

function initModal() {
  modal = document.getElementById("modal");
  btn = document.getElementById("new-repo-button");
  confirmBtn = document.getElementById("confirm-button");
  span = document.getElementsByClassName("close")[0];
}

function handleModal() {
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {

    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function displayModal(text) {
  initModal();
  handleModal();
  document.getElementById("modal-text-box").innerHTML = text;
  modal.style.display = "block";
}

function updateModalText(text) {
  document.getElementById("modal-text-box").innerHTML = text;
  modal.style.display = "block";
}
