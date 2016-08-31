var Git = require("nodegit");
function downloadRepository() {
    var cloneURL = document.getElementById("repository-url").value;
    var cloneDir = "tmp";
    var localPath = require("path").join(__dirname, cloneDir);
    var options = {};
    options.fetchOpts = {
        callbacks: {
            certificateCheck: function () { return 1; },
            credentials: function (url, userName) {
                return Git.Cred.sshKeyFromAgent(userName);
            }
        }
    };
    var repository = Git.Clone(cloneURL, localPath, options)
        .then(function (repository) {
        console.log("Repo successfully cloned");
        drawGraph();
    }, function (err) {
        console.log(err);
    });
}
