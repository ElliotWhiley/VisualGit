import * as nodegit from "git";
import NodeGit, { Status } from "nodegit";

let Git = require("nodegit");
let fs = require("fs");
let green = "#84db00";

let user = "Test User";
let email = "test@mail.com";

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

function pullFromRemote(repoPath) {
  let repository;
  console.log("pulling from remote repo");
  Git.Repository.open(repoPath)
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

function pushToRemote(repoPath, branch) {
  Git.Repository.open(repoPath)
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

      // Clear all modified files from the left file panel
      function clearModifiedFilesList() {
        let filePanel = document.getElementById('file-panel');
        while (filePanel.firstChild) {
          filePanel.removeChild(filePanel.firstChild);
        }
      }

      // Add the modified file to the left file panel
      function displayModifiedFile(file) {
        let filePath = document.createElement("p");
        filePath.innerHTML = file.filePath;
        let fileElement = document.createElement("div");
        // TODO - change color of modified file
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
        document.getElementById('file-panel').appendChild(fileElement);
        fileElement.onclick = function() {
          console.log("Printing diff for: " + file.filePath);
          document.getElementById("diff-panel").innerHTML = "";

          if (fileElement.className === "file file-created") {
            printNewFile(file.filePath);
          } else {
            printFileDiff(file.filePath)
          }
        };
      }

      function printNewFile(filePath) {
        let fileLocation = "./tmp/" + filePath;
        console.log(fileLocation);

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
        document.getElementById("diff-panel").appendChild(element);
      }

      function formatNewFileLine(text) {
        let element = document.createElement("div");
        element.style.backgroundColor = green;
        element.innerHTML = text;
        document.getElementById("diff-panel").appendChild(element);
      }
    });
  });
}
