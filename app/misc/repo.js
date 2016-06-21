function downloadRepo() {
    var NodeGit = require("nodegit");
    var cloneURL = "https://github.com/Puhapig/git-history-template.git";
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
        console.log('downloaded repo!');
        console.log('Repo: ' + repository.getNameSpace);
        console.log('Branch: ' + repository.getCurrentBranch);
        console.log('Path: ' + repository.path);
        console.log('Reference Names: ', repository.getReferenceNames);
        return repository.getReferenceNames;
    })
        .then(function (referenceNames) {
        console.log(referenceNames);
    });
}
