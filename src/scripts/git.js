var Git = require("nodegit");
Git.Repository.open("/Users/harveyr/uni/project/git-history-template")
    .then(function (repo) {
    return repo.getMasterCommit();
})
    .then(function (firstCommitOnMaster) {
    var history = firstCommitOnMaster.history(Git.Revwalk.SORT.Time);
    history.on("end", function (commits) {
        var orderedCommits = [];
        commits.forEach(function (commit) {
            if (commit.parents() == "") {
                orderedCommits.push(commit);
                commits.splice(commits.indexOf(commit), 1);
            }
        });
        for (i = 0; i < 10; i++) {
            commits.forEach(function (commit) {
                console.log(commits.length);
                console.log(commit.toString());
            });
            console.log("=====END=====");
            commits.forEach(function (commit) {
                var mostRecent = orderedCommits[orderedCommits.length - 1];
                var index = commits.indexOf(commit);
                if (commit.parents() == "") {
                    return;
                }
                commit.parents().forEach(function (parent) {
                    if (parent.toString() === mostRecent.toString()) {
                        orderedCommits.push(commit);
                        commits.splice(index, 1);
                    }
                });
            });
        }
        console.log("\n\n\n");
        orderedCommits.forEach(function (commit) {
            console.log("commit: " + commit);
        });
    });
    history.start();
})
    .done();
