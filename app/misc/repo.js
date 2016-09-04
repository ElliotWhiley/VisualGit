var Git = require("nodegit");
var repoFullPath;
var repoLocalPath;
var repoCurrentBranch = "master";
var modal;
var span;
function downloadRepository() {
    var cloneURL = document.getElementById("repoClone").value;
    var localPath = document.getElementById("repoSave").value;
    var fullLocalPath = require("path").join(__dirname, localPath);
    var options = {};
    displayModal("Cloning Repository...");
    options.fetchOpts = {
        callbacks: {
            certificateCheck: function () { return 1; },
            credentials: function (url, userName) {
                return Git.Cred.sshKeyFromAgent(userName);
            }
        }
    };
    console.log("cloning into " + fullLocalPath);
    var repository = Git.Clone(cloneURL, fullLocalPath, options)
        .then(function (repository) {
        console.log("Repo successfully cloned");
        updateModalText("Clone Successful, repository saved under: " + cloneURL);
        repoFullPath = fullLocalPath;
        repoLocalPath = localPath;
        refreshAll(repository);
    }, function (err) {
        updateModalText("Clone Failed - " + err);
        console.log(err);
    });
}
function openRepository() {
    var localPath = document.getElementById("repoOpen").value;
    var fullLocalPath = require("path").join(__dirname, localPath);
    console.log("Trying to open repository at " + fullLocalPath);
    displayModal("Opening Local Repository...");
    Git.Repository.open(fullLocalPath).then(function (repository) {
        console.log("Repo successfully opened");
        updateModalText("Repository successfully opened");
        repoFullPath = fullLocalPath;
        repoLocalPath = localPath;
        refreshAll(repository);
    }, function (err) {
        updateModalText("Opening Failed - " + err);
        console.log(err);
    });
}
function refreshAll(repository) {
    var branch;
    repository.getCurrentBranch()
        .then(function (reference) {
        var branchParts = reference.name().split("/");
        branch = branchParts[branchParts.length - 1];
    })
        .then(function () {
        console.log("Updating the graph and the labels");
        drawGraph();
        document.getElementById("repo-name").innerHTML = "/" + repoLocalPath;
        document.getElementById("branch-name").innerHTML = "/" + branch;
    });
}
function updateLocalPath() {
    var text = document.getElementById("repoClone").value;
    var splitText = text.split(/\.|:|\//);
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
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
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
}
