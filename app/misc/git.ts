import * as nodegit from "git";
import NodeGit, { Status } from "nodegit";

let Git = require("nodegit");
let fs = require("fs");
let repoPath = require("path").join(__dirname, "tmp");
let green = "#84db00";
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
<<<<<<< HEAD
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
=======

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
>>>>>>> stage-commit
      }

<<<<<<< HEAD
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
=======
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
>>>>>>> stage-commit
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
