var Git = require("nodegit");
var repoFullPath;
var repoLocalPath;
var repoCurrentBranch = 'master';
function downloadRepository() {
    var cloneURL = document.getElementById("repoClone").value;
    var localPath = document.getElementById("repoSave").value;
    var fullLocalPath = require("path").join(__dirname, localPath);
    var options = {};
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
        repoFullPath = fullLocalPath;
        repoLocalPath = localPath;
        refreshAll(repository);
    }, function (err) {
        console.log(err);
    });
}
function openRepository() {
    var localPath = document.getElementById("repoOpen").innerHTML;
    var fullLocalPath = require("path").join(__dirname, localPath);
    var repository = Git.Repository.open(fullLocalPath).then(function () {
        console.log("Repo successfully opened");
        repoFullPath = fullLocalPath;
        repoLocalPath = localPath;
        refreshAll(repository);
    }, function (err) {
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
        drawGraph();
        document.getElementById("repo-name").innerHTML = "/" + repoLocalPath;
        document.getElementById("branch-name").innerHTML = "/" + branch;
    });
}
