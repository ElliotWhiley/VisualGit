import * as nodegit from "git";

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

function getRepoStatus(repoPath) {
  Git.Repository.open(repoPath)
  .then(function(repo) {
    repo.getStatus().then(function(statuses) {
      function statusToText(status) {
        let words = [];
        if (status.isNew()) { words.push("NEW"); }
        if (status.isModified()) { words.push("MODIFIED"); }
        if (status.isTypechange()) { words.push("TYPECHANGE"); }
        if (status.isRenamed()) { words.push("RENAMED"); }
        if (status.isIgnored()) { words.push("IGNORED"); }

        return words.join(" ");
      }

      statuses.forEach(function(file) {
        console.log(file.path() + " " + statusToText(file));
      });
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
