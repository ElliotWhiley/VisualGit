import * as nodegit from "git";
import NodeGit, { Status } from "nodegit";

let Git = require("nodegit");
let fs = require("fs");

let green = "#84db00";
let repo, index, oid, remote;

function addAndCommit() {
  let repository;

  Git.Repository.open(repoFullPath)
  .then(function(repo) {
    repository = repo;
    return repository.refreshIndex();
  })

  .then(function(indexResult) {
   index = indexResult;
   let filesToAdd = [];
   let filePanel = document.getElementById('files-changed');
   let fileElements = filePanel.childNodes;
   for (let i = 0; i < fileElements.length; i++) {
     let fileElementChildren = fileElements[i].childNodes;
     if (fileElementChildren[1].checked === true) {
       filesToAdd.push(fileElementChildren[0].innerHTML);
     }
   }
   return filesToAdd;
  })
  .then(function(filesToAdd) {
    let sign = Git.Signature.default(repository);
    let commitMessage = document.getElementById('commit-message-input').value;

    repository.createCommitOnHead(filesToAdd, sign, sign, commitMessage).then(function(oid) {
      // Use oid
      console.log("Commit successful: " + oid.tostrS())
      refreshAll(repository);
    });
  });
}

function addAndCommitHTTPS() {
  Git.Repository.open(repoFullPath)

  .then(function(repoResult) {
    repo = repoResult;
     return repo.refreshIndex();
  })

  .then(function(indexResult) {
    index = indexResult;
    let filesToStage = [];
    let fileElements = document.getElementsByClassName('file');
    for (let i = 0; i < fileElements.length; i++) {
      let fileElementChildren = fileElements[i].childNodes;
      console.log(fileElementChildren[0]);
      if (fileElementChildren[1].checked === true) {
        filesToStage.push(fileElementChildren[0].innerHTML);
      }
    }
    return index.addAll(filesToStage);
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
    let commitMessage = document.getElementById('commit-message-input').value;
    return repo.createCommit("HEAD", author, committer, commitMessage, oid, [parent]);
  })

  .then(function() {
    clearModifiedFilesList();
    clearCommitMessage();
    clearSelectAllCheckbox();
  });
}

// Clear all modified files from the left file panel
function clearModifiedFilesList() {
  let filePanel = document.getElementById("files-changed");
  while (filePanel.firstChild) {
    filePanel.removeChild(filePanel.firstChild);
  }
  let filesChangedMessage = document.createElement("p");
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

let user = "Test User";
let email = "test@mail.com";

function getAllCommits(callback) {
  Git.Repository.open(repoFullPath)
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

function pullFromRemote() {
  let repository;
  Git.Repository.open(repoFullPath)
  .then(function(repo) {
    repository = repo;

    return repository.fetchAll({
      callbacks: {
        credentials: function(url, userName) {
          return Git.Cred.sshKeyFromAgent(userName);
        },
        certificateCheck: function() {
          return 1;
        }
      }
    });
  })
  // Now that we're finished fetching, go ahead and merge our local branch
  // with the new one
  .then(function() {
    return repository.mergeBranches("master", "origin/master");
  });
}

function pushToRemote() {
  let branch = repoCurrentBranch;

  Git.Repository.open(repoFullPath)
  .then(function(repo) {
    repo.getRemotes()
    .then(function(remotes) {
      repo.getRemote(remotes[0])
      .then(function(remote) {
        return remote.push(
          ["refs/heads/" + branch + ":refs/heads/" + branch],
          {
            callbacks: {
              credentials: function(url, userName) {
                return Git.Cred.sshKeyFromAgent(userName);
              }
            }
          }
        );
      });
    });
  });
}

function displayModifiedFiles() {
  let modifiedFiles = [];

  Git.Repository.open(repoFullPath)
  .then(function(repo) {
    repo.getStatus().then(function(statuses) {

      statuses.forEach(addModifiedFile);
      if (modifiedFiles.length !== 0) {
        let filePanelMessage = document.getElementById("modified-files-message");
        filePanelMessage.parentNode.removeChild(filePanelMessage);
      }
      modifiedFiles.forEach(displayModifiedFile);

      // Add modified file to array of modified files 'modifiedFiles'
      function addModifiedFile(file) {
        // Check if modified file is already being displayed
        let filePaths = document.getElementsByClassName('file-path');
        for (let i = 0; i < filePaths.length; i++) {
          if (filePaths[i].innerHTML === file.path()) {
            return;
          }
        }

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
        filePath.className = "file-path";
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
        checkbox.className = "checkbox";
        fileElement.appendChild(checkbox);

        // Add click event to file element to check/uncheck the checkbox
        fileElement.addEventListener("click", function() {
          let childNodes = fileElement.childNodes;
          for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].className === "checkbox") {
              if (childNodes[i].checked === false) {
                childNodes[i].checked = true;
              } else {
                childNodes[i].checked = false;
              }
            }
          }
        });

        document.getElementById("files-changed").appendChild(fileElement);

        fileElement.onclick = function() {
          displayDiffPanel();
          document.getElementById("diff-panel-body").innerHTML = "";

          if (fileElement.className === "file file-created") {
            printNewFile(file.filePath);
          } else {
            printFileDiff(file.filePath)
          }
        };
      }

      function printNewFile(filePath) {
        let fileLocation = require("path").join(repoFullPath, filePath);
        let lineReader = require("readline").createInterface({
          input: fs.createReadStream(fileLocation)
        });

        lineReader.on("line", function (line) {
          formatNewFileLine(line);
        });
      }

      function printFileDiff(filePath) {
        repo.getHeadCommit().then(function(commit) {
          getCurrentDiff(commit, filePath, function(line) {
            formatLine(line);
          });
        });
      }

      function getCurrentDiff(commit, filePath, callback) {
        commit.getTree().then(function(tree) {
          Git.Diff.treeToWorkdir(repo, tree, null).then(function(diff) {
            diff.patches().then(function(patches) {
              patches.forEach(function(patch) {
                patch.hunks().then(function(hunks) {
                  hunks.forEach(function(hunk) {
                    hunk.lines().then(function(lines) {
                      let oldFilePath = patch.oldFile().path();
                      let newFilePath = patch.newFile().path();
                      if (newFilePath === filePath) {
                        callback(hunk.header().trim());
                        lines.forEach(function(line) {
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
        let element = document.createElement("div");

        if (line.charAt(0) === "+") {
          element.style.backgroundColor = green;
        } else if (line.charAt(0) === "-") {
          element.style.backgroundColor = "red";
        }

        element.innerHTML = line;
        document.getElementById("diff-panel-body").appendChild(element);
      }

      function formatNewFileLine(text) {
        let element = document.createElement("div");
        element.style.backgroundColor = green;
        element.innerHTML = text;
        document.getElementById("diff-panel-body").appendChild(element);
      }
    });
  },
  function(err) {
    console.log("waiting for repo to be initialised");
  });
}
