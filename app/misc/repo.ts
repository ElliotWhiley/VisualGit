let Git = require("nodegit");

function downloadRepository() {
  let cloneURL = document.getElementById("repository-url").value;
  let cloneDir = "tmp";
  let localPath = require("path").join(__dirname, cloneDir);
  let options = {};

  options.fetchOpts = {
    callbacks: {
      certificateCheck: function() { return 1; },
      credentials: function(url, userName) {
        return Git.Cred.sshKeyFromAgent(userName);
      }
    }
  };

  let repository = Git.Clone(cloneURL, localPath, options)
  .then(function(repository) {
    console.log("Repo successfully cloned");
    //document.getElementById("repo-name").value = cloneDir;
    drawGraph();
  },
  function(err) {
    console.log(err);
  });
}
