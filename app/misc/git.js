var Git = require("nodegit");
function getAllCommits(repository, callback) {
    Git.Repository.open(repository)
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
