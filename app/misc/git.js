"use strict";
var Git = require("nodegit");
var fs = require("fs");
var green = "#84db00";
var repo, index, oid, remote, commitMessage;
var filesToAdd = [];
function addAndCommit() {
    var repository;
    Git.Repository.open(repoFullPath)
        .then(function (repoResult) {
        repository = repoResult;
        return repository.refreshIndex();
    })
        .then(function (indexResult) {
        index = indexResult;
        var filesToStage = [];
        var fileElements = document.getElementsByClassName('file');
        for (var i = 0; i < fileElements.length; i++) {
            var fileElementChildren = fileElements[i].childNodes;
            if (fileElementChildren[1].checked === true) {
                filesToStage.push(fileElementChildren[0].innerHTML);
                filesToAdd.push(fileElementChildren[0].innerHTML);
            }
        }
        return index.addAll(filesToStage);
    })
        .then(function () {
        return index.write();
    })
        .then(function () {
        return index.writeTree();
    })
        .then(function (oidResult) {
        oid = oidResult;
        return Git.Reference.nameToId(repository, "HEAD");
    })
        .then(function (head) {
        return repository.getCommit(head);
    })
        .then(function (parent) {
        var sign = Git.Signature.default(repository);
        commitMessage = document.getElementById('commit-message-input').value;
        return repository.createCommit("HEAD", sign, sign, commitMessage, oid, [parent]);
    })
        .then(function (oid) {
        console.log("Commit successful: " + oid.tostrS());
        hideDiffPanel();
        clearModifiedFilesList();
        clearCommitMessage();
        clearSelectAllCheckbox();
        for (var i = 0; i < filesToAdd.length; i++) {
            addCommand("git add " + filesToAdd[i]);
        }
        addCommand('git commit -m "' + commitMessage + '"');
        refreshAll(repository);
    });
}
function clearModifiedFilesList() {
    var filePanel = document.getElementById("files-changed");
    while (filePanel.firstChild) {
        filePanel.removeChild(filePanel.firstChild);
    }
    var filesChangedMessage = document.createElement("p");
    filesChangedMessage.className = "modified-files-message";
    filesChangedMessage.id = "modified-files-message";
    filesChangedMessage.innerHTML = "Your modified files will appear here";
    filePanel.appendChild(filesChangedMessage);
}
function clearCommitMessage() {
    document.getElementById('commit-message-input').value = "";
}
function clearSelectAllCheckbox() {
    document.getElementById('select-all-checkbox').checked = false;
}
function getAllCommits(callback) {
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        return repo.getMasterCommit();
    })
        .then(function (firstCommitOnMaster) {
        var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);
        history.on("end", function (commits) {
            callback(commits);
        });
        history.start();
    });
}
function pullFromRemote() {
    var repository;
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        repository = repo;
        console.log("Pulling changes from remote...");
        addCommand("git pull");
        displayModal("Pulling new changes from the remote repository");
        return repository.fetchAll({
            callbacks: {
                credentials: function (url, userName) {
                    return Git.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck: function () {
                    return 1;
                }
            }
        });
    })
        .then(function () {
        console.log("Pull successful");
        updateModalText("Pull successful");
        return repository.mergeBranches("master", "origin/master");
    });
}
function pushToRemote() {
    var branch = repoCurrentBranch;
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        console.log("Pushing changes to remote");
        displayModal("Pushing changes to remote...");
        addCommand("git push -u origin master");
        repo.getRemotes()
            .then(function (remotes) {
            repo.getRemote(remotes[0])
                .then(function (remote) {
                return remote.push(["refs/heads/" + branch + ":refs/heads/" + branch], {
                    callbacks: {
                        credentials: function (url, userName) {
                            return Git.Cred.sshKeyFromAgent(userName);
                        }
                    }
                });
            })
                .then(function () {
                console.log("Push successful");
                updateModalText("Push successful");
            });
        });
    });
}
function displayModifiedFiles() {
    var modifiedFiles = [];
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        repo.getStatus().then(function (statuses) {
            statuses.forEach(addModifiedFile);
            if (modifiedFiles.length !== 0) {
                if (document.getElementById("modified-files-message") !== null) {
                    var filePanelMessage = document.getElementById("modified-files-message");
                    filePanelMessage.parentNode.removeChild(filePanelMessage);
                }
            }
            modifiedFiles.forEach(displayModifiedFile);
            function addModifiedFile(file) {
                var filePaths = document.getElementsByClassName('file-path');
                for (var i = 0; i < filePaths.length; i++) {
                    if (filePaths[i].innerHTML === file.path()) {
                        return;
                    }
                }
                var path = file.path();
                var modification = calculateModification(file);
                modifiedFiles.push({
                    filePath: path,
                    fileModification: modification
                });
            }
            function calculateModification(status) {
                if (status.isNew()) {
                    return "NEW";
                }
                else if (status.isModified()) {
                    return "MODIFIED";
                }
                else if (status.isDeleted()) {
                    return "DELETED";
                }
                else if (status.isTypechange()) {
                    return "TYPECHANGE";
                }
                else if (status.isRenamed()) {
                    return "RENAMED";
                }
                else if (status.isIgnored()) {
                    return "IGNORED";
                }
            }
            function displayModifiedFile(file) {
                var filePath = document.createElement("p");
                filePath.className = "file-path";
                filePath.innerHTML = file.filePath;
                var fileElement = document.createElement("div");
                if (file.fileModification == "NEW") {
                    fileElement.className = "file file-created";
                }
                else if (file.fileModification == "MODIFIED") {
                    fileElement.className = "file file-modified";
                }
                else if (file.fileModification == "DELETED") {
                    fileElement.className = "file file-deleted";
                }
                else {
                    fileElement.className = "file";
                }
                fileElement.appendChild(filePath);
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "checkbox";
                fileElement.appendChild(checkbox);
                document.getElementById("files-changed").appendChild(fileElement);
                fileElement.onclick = function () {
                    displayDiffPanel();
                    document.getElementById("diff-panel-body").innerHTML = "";
                    if (fileElement.className === "file file-created") {
                        printNewFile(file.filePath);
                    }
                    else {
                        printFileDiff(file.filePath);
                    }
                };
            }
            function printNewFile(filePath) {
                var fileLocation = require("path").join(repoFullPath, filePath);
                var lineReader = require("readline").createInterface({
                    input: fs.createReadStream(fileLocation)
                });
                lineReader.on("line", function (line) {
                    formatNewFileLine(line);
                });
            }
            function printFileDiff(filePath) {
                repo.getHeadCommit().then(function (commit) {
                    getCurrentDiff(commit, filePath, function (line) {
                        formatLine(line);
                    });
                });
            }
            function getCurrentDiff(commit, filePath, callback) {
                commit.getTree().then(function (tree) {
                    Git.Diff.treeToWorkdir(repo, tree, null).then(function (diff) {
                        diff.patches().then(function (patches) {
                            patches.forEach(function (patch) {
                                patch.hunks().then(function (hunks) {
                                    hunks.forEach(function (hunk) {
                                        hunk.lines().then(function (lines) {
                                            var oldFilePath = patch.oldFile().path();
                                            var newFilePath = patch.newFile().path();
                                            if (newFilePath === filePath) {
                                                lines.forEach(function (line) {
                                                    callback(String.fromCharCode(line.origin()) + line.content().trim());
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
            function formatLine(line) {
                var element = document.createElement("div");
                if (line.charAt(0) === "+") {
                    element.style.backgroundColor = "#84db00";
                }
                else if (line.charAt(0) === "-") {
                    element.style.backgroundColor = "#ff2448";
                }
                element.innerHTML = line;
                document.getElementById("diff-panel-body").appendChild(element);
            }
            function formatNewFileLine(text) {
                var element = document.createElement("div");
                element.style.backgroundColor = green;
                element.innerHTML = text;
                document.getElementById("diff-panel-body").appendChild(element);
            }
        });
    }, function (err) {
        console.log("waiting for repo to be initialised");
    });
}
