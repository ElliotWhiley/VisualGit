'use strict';

function getFollowers() {
  // GitHub API trial 2
  var GitHubApi = require('github');

  var github = new GitHubApi({
    // required
    version: '3.0.0',
    // // optional
    // debug: true,
    // protocol: "https",
    // host: "github.my-GHE-enabled-company.com", // should be api.github.com for GitHub
    // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    // timeout: 5000,
    // headers: {
    //     "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    // }
  });
  //github.user.getFollowingFromUser({
  github.user.getFollowers({
      // optional:
      // headers: {
      //     "cookie": "blahblah"
      // },
      //user: "mikedeboer"
      user: document.getElementById('username').value
  }, function(err, res) {
        console.log(JSON.stringify(res));

      document.getElementById('numFollowers').innerHTML = 'Number of followers: ' + res.length;

      document.getElementById('followers').innerHTML = 'Follower names: ';
      // loop through all followers and display their names
      function displayFollower(follower, index, array) {
        document.getElementById('followers').innerHTML += follower.login + ', ';
      }

      res.forEach(displayFollower);

  });
}
