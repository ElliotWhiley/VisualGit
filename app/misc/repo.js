function downloadRepo() {
    var NodeGit = require("nodegit");
    var cloneURL = "https://github.com/nodegit/test";
    var localPath = require("path").join(__dirname, "tmp");
    var cloneOptions = {};
    cloneOptions.fetchOpts = {
        callbacks: {
            certificateCheck: function () { return 1; }
        }
    };
    var cloneRepository = NodeGit.Clone(cloneURL, localPath, cloneOptions);
    var errorAndAttemptOpen = function () {
        return NodeGit.Repository.open(localPath);
    };
    cloneRepository.catch(errorAndAttemptOpen)
        .then(function (repository) {
        console.log("Is the repository bare? %s", Boolean(repository.isBare()));
    });
}
