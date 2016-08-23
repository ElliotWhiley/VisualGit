function downloadRepository() {
  // Require in NodeGit, since we want to use the local copy, we"re using a
  // relative path.  In your project, you will use:
  //
  let NodeGit = require("nodegit");

  // Using the `clone` method from the `Git.Clone` module, bring down the NodeGit
  // test repository from GitHub.
  let repositoryUrl = document.getElementById("repository-url").value;
  let cloneURL = repositoryUrl;

  // Ensure that the `tmp` directory is local to this file and not the CWD.
  let localPath = require("path").join(__dirname, "tmp");

  // Simple object to store clone options.
  let cloneOptions = {};

  // This is a required callback for OS X machines.  There is a known issue
  // with libgit2 being able to verify certificates from GitHub.
  cloneOptions.fetchOpts = {
    callbacks: {
      certificateCheck: function() { return 1; }
    }
  };

  // Invoke the clone operation and store the returned Promise.
  let cloneRepository = NodeGit.Clone(cloneURL, localPath, cloneOptions);

  // If the repository already exists, the clone above will fail.  You can simply
  // open the repository in this case to continue execution.
  let errorAndAttemptOpen = function() {
    return NodeGit.Repository.open(localPath);
  };

  // Once the repository has been cloned or opened, you can work with a returned
  // `Git.Repository` instance.
  cloneRepository.catch(errorAndAttemptOpen)
    .then(function(repository) {

      drawGraph();

      // Access any repository methods here.
      return repository.getReferenceNames;
    })
    .then(function(referenceNames) {
    });


}
