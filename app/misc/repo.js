function downloadRepository() {
    var NodeGit = require("nodegit");
    var repositoryUrl = document.getElementById("repository-url").value;
    var cloneURL = repositoryUrl;
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
        drawGraph();
        return repository.getReferenceNames;
    })
        .then(function (referenceNames) {
    });
}
