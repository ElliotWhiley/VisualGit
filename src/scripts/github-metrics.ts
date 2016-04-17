'use strict';

var GitHubApi = require('github');

var branchNames = [];
var branches = [];
var commits;
var gitUser = 'Puhapig';
var gitRepo = 'git-history-template';

var github = new GitHubApi({
  version: '3.0.0',
});

function getFollowers() {

  github.user.getFollowers({
      user: document.getElementById('username').value
  }, function(err, res) {
        console.log(JSON.stringify(res));
      document.getElementById('numFollowers').innerHTML = 'Number of followers: ' + res.length;
      document.getElementById('followers').innerHTML = 'Follower names: ';
      //Search through all followers and display their names
      function displayFollower(follower, index, array) {
        document.getElementById('followers').innerHTML += follower.login + ', ';
      }
      res.forEach(displayFollower);
  });
}

document.addEventListener( 'DOMContentLoaded', function createLabelledCommits() {
  //Get latest _____ commits from specified repo and label each with its corresponding branch
  authenticate();
  getBranchNames();
  getCommits();

  function setBranchName(branch, index, array) {
    branchNames[index] = branch.name;
  }

  function getBranchCommits(branchName, index, array) {
    github.repos.getCommits({
      user: gitUser,
      repo: gitRepo,
      sha: branchName
    }, function(err, res) {
      branches[index] = res;
    });
  }

  function labelCommit(commit, index, array) {
      for (var i = 0; i < branches.length; i++) {
        var branch = branches[i];
        for (var j = 0; j < branch.length; j++) {
          var branchCommit = branch[j];
          if (commit.sha === branchCommit.sha) {
            commit['branch'] = branchNames[i];
            break;
          }
        }
  }
}

function authenticate() {
  github.authenticate({
    type: "basic",
    username: "EdMinstrateur",
    password: "somethingsimple123"
  });
}

function getBranchNames() {
  //Get all branch names from repo
  github.repos.getBranches({
    user: gitUser,
    repo: gitRepo
  }, function(err, res) {
    //Set branch names
    res.forEach(setBranchName);
    //Get commits for each branch
    branchNames.forEach(getBranchCommits);
  });
}

function getCommits() {
  setTimeout(function(){
    //Get all commits from repo
    github.repos.getCommits({
      user: gitUser,
      repo: gitRepo
    }, function(err, res) {
      commits = res;
      //Label each commit with a branch name
      commits.forEach(labelCommit);
      console.log(commits);
    });
  }, 5000);
}



, false);
