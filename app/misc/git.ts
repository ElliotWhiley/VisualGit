import * as nodegit from "git";
import NodeGit, { Status } from "nodegit";

let Git = require("nodegit");
let repoPath = require("path").join(__dirname, "tmp");

let fileToStage = "a.txt";
let repo, index, oid, remote;

function addAndCommit() {
  Git.Repository.open(repoPath)

  .then(function(repoResult) {
    console.log("fileToStage: ", fileToStage);
    console.log("repoPath: ", repoPath);
    console.log("repoResult: ", repoResult);
    repo = repoResult;
     return repo.refreshIndex();
  })

  .then(function(indexResult) {
    console.log("indexResult: ", indexResult)
    index = indexResult;
    // TO DO add all files to stage
    return index.addByPath(fileToStage);
  })

  .then(function() {
    return index.write();
  })

  .then(function() {
    return index.writeTree();
  })

  .then(function(oidResult) {
    oid = oidResult;
    return Git.Reference.nameToId(repo, "HEAD");
  })

  .then(function(head) {
    return repo.getCommit(head);
  })

  .then(function(parent) {
    let author = Git.Signature.now("EdMinstrateur", "elliot.w@hotmail.com");
    let committer = Git.Signature.now("EdMinstrateur", "elliot.w@hotmail.com");
    // TODO - insert commit message from textarea
    return repo.createCommit("HEAD", author, committer, "Test commit message!!!  :O :O", oid, [parent]);
  })

  .then(function() {
    clearModifiedFilesList();
  });
}

// Clear all modified files from the left file panel
function clearModifiedFilesList() {
  let filePanel = document.getElementById('files-changed');
  while (filePanel.firstChild) {
    filePanel.removeChild(filePanel.firstChild);
  }
}

function getAllCommits(repoPath, callback) {
  Git.Repository.open(repoPath)
  .then(function(repo) {
    return repo.getMasterCommit();
  })
  .then(function(firstCommitOnMaster){
    let history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);

    history.on("end", function(commits) {
      callback(commits);
    });

    history.start();
  });
}

function displayModifiedFiles(repoPath) {
  let modifiedFiles = [];

  Git.Repository.open(repoPath)
  .then(function(repo) {
    repo.getStatus().then(function(statuses) {

      statuses.forEach(addModifiedFile);
      if (modifiedFiles.length !== 0) {
        clearModifiedFilesList();
      }
      modifiedFiles.forEach(displayModifiedFile);

      // Add modified file to array of modified files 'modifiedFiles'
      function addModifiedFile(file) {
        let path = file.path();
        let modification = calculateModification(file);
        modifiedFiles.push({
            filePath: path,
            fileModification: modification
        });
      }

      // Find HOW the file has been modified
      function calculateModification(status) {
        if (status.isNew()) {
          return "NEW";
        } else if (status.isModified()) {
          return "MODIFIED";
        } else if (status.isDeleted()) {
          return "DELETED";
        } else if (status.isTypechange()) {
          return "TYPECHANGE";
        } else if (status.isRenamed()) {
          return "RENAMED";
        } else if (status.isIgnored()) {
          return "IGNORED";
        }
      }

      // Add the modified file to the left file panel
      function displayModifiedFile(file) {
        let filePath = document.createElement("p");
        filePath.innerHTML = file.filePath;
        let fileElement = document.createElement("div");
        // Set how the file has been modified
        if (file.fileModification == "NEW") {
          fileElement.className = "file file-created";
        } else if (file.fileModification == "MODIFIED") {
          fileElement.className = "file file-modified";
        } else if (file.fileModification == "DELETED") {
          fileElement.className = "file file-deleted";
        } else {
          fileElement.className = "file";
        }

        fileElement.appendChild(filePath);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = 'checkbox';
        fileElement.appendChild(checkbox);

        // Add click event to file element to check/uncheck the checkbox
        fileElement.addEventListener("click", function() {
          let childNodes = fileElement.childNodes;
          for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].className === 'checkbox') {
              if (childNodes[i].checked === false) {
                childNodes[i].checked = true;
              } else {
                childNodes[i].checked = false;
              }
            }
          }
        });

        document.getElementById("files-changed").appendChild(fileElement);
      }
    });
  });
}

function getDiffForCommit(commit) {
  return commit.getDiff();
}

function printFormattedDiff(commit) {
  getDiffForCommit(commit).done(function(diffList) {
    diffList.forEach(function(diff) {
      diff.patches().then(function(patches) {
        patches.forEach(function(patch) {
          patch.hunks().then(function(hunks) {
            hunks.forEach(function(hunk) {
              hunk.lines().then(function(lines) {
                lines.forEach(function(line) {
                });
              });
            });
          });
        });
      });
    });
  });
}
