"use strict";
var Git = require("nodegit");
function getAllCommits(repoPath, callback) {
    Git.Repository.open(repoPath)
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
function displayModifiedFiles(repoPath) {
    var modifiedFiles = [];
    Git.Repository.open(repoPath)
        .then(function (repo) {
        repo.getStatus().then(function (statuses) {
            statuses.forEach(addModifiedFile);
            if (modifiedFiles.length !== 0) {
                clearModifiedFilesList();
            }
            modifiedFiles.forEach(displayModifiedFile);
            function addModifiedFile(file) {
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
            function clearModifiedFilesList() {
                var filePanel = document.getElementById('file-panel');
                while (filePanel.firstChild) {
                    filePanel.removeChild(filePanel.firstChild);
                }
            }
            function displayModifiedFile(file) {
                var filePath = document.createElement("p");
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
                document.getElementById('file-panel').appendChild(fileElement);
                fileElement.onclick = function () { printFileDiff(file.filePath); };
            }
            function printFileDiff(filePath) {
                console.log("Printing diff for: " + filePath);
                document.getElementById("diff-panel").innerHTML = "";
                repo.getHeadCommit()
                    .then(function (commit) {
                    return getDiffText(commit, function (callback) {
                        formatLine(callback);
                    });
                });
            }
            function formatLine(line) {
                var element = document.createElement("div");
                if (line.charAt(0) === "+") {
                    element.style.backgroundColor = "#84db00";
                }
                else if (line.charAt(0) === "-") {
                    element.style.backgroundColor = "red";
                }
                element.innerHTML = line;
                document.getElementById("diff-panel").appendChild(element);
            }
        });
    });
}
function getDiffText(commit, callback) {
    commit.getDiff().then(function (diffList) {
        diffList.forEach(function (diff) {
            diff.patches().then(function (patches) {
                patches.forEach(function (patch) {
                    patch.hunks().then(function (hunks) {
                        hunks.forEach(function (hunk) {
                            hunk.lines().then(function (lines) {
                                var diffMessage = "diff " + patch.oldFile().path() + " " + patch.newFile().path();
                                callback(diffMessage);
                                callback(hunk.header().trim());
                                lines.forEach(function (line) {
                                    callback(String.fromCharCode(line.origin()) + line.content().trim());
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
