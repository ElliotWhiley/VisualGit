import * as nodegit from "git";
import NodeGit, { Status } from "nodegit";

let Git = require("nodegit");

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
      clearModifiedFilesList();
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
        fileElement.className = "file";
        fileElement.appendChild(filePath);
        document.getElementById('file-panel').appendChild(fileElement);
      }
    });
  });
}

function getDiffForCommit(commit) {
  console.log("commit " + commit.sha());
  console.log("Author:", commit.author().name() +
  " <" + commit.author().email() + ">");
  console.log("Date:", commit.date());
  console.log("\n    " + commit.message());

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
                console.log("diff", patch.oldFile().path(),
                patch.newFile().path());
                console.log(hunk.header().trim());
                lines.forEach(function(line) {
                  console.log(String.fromCharCode(line.origin()) +
                  line.content().trim());
                });
              });
            });
          });
        });
      });
    });
  });

}
