'use strict';

var GitHubApi = require('github');

var branchNames = [];
var repoBranches = [];
var repoCommits = [];
var commits;
var gitUser = 'Puhapig';
var gitRepo = 'test';

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
  //getCommits();

  function setBranchName(branch, index, array) {
    branchNames[index] = branch.name;
  }

  function getBranchCommits(branchName, index, array) {
    github.repos.getCommits({
      user: gitUser,
      repo: gitRepo,
      sha: branchName
    }, function(err, res) {
      repoBranches[index] = res
    });
  }

  function labelCommit(commit, index, array) {
    for (var i = 0; i < repoBranches.length; i++) {
      var branch = repoBranches[i];
      for (var j = 0; j < branch.length; j++) {
        var branchCommit = branch[j];
        if (commit.sha === branchCommit.sha) {
          commit['branch'] = branchNames[i];
          break;
        }
      }
    }
  }

  function labelParents(commit, index, array) {
    commit['parentBranches'] = [];
    for (var i = 0; i < commit.parents.length; i++) {
      for (var j = 0; j < commits.length; j++) {
        if (commit.parents[i].sha == commits[j].sha) {
          commit['parentBranches'].push(commits[j].branch);
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
    setTimeout(function(){
      //combine repoBranches array into 1 array
      console.log('repoBranches: ', repoBranches);
      for (var i = 0; i < repoBranches.length; i++) {
        var branch = repoBranches[i];
        for (var j = 0; j < branch.length; j++) {
          var commit = branch[j];
          if (!(commit.sha in repoCommits)) {
            repoCommits[commit.sha] = commit;
          }
        }
      }
      //sort by time
      for (var i = 0; i < repoCommits.length; i++) {

      }
      // var date = repoCommits['1db1a0d8fd69257120ffd98171e48a05dc5f852f'].commit.committer.date;
      // console.log('date', date);
      console.log('repoCommits unsorted: ', repoCommits);
      repoCommits.sort(function (a, b) {
        //return new Date(a.commit.committer.date) - new Date(b.commit.committer.date);
        //return a.commit.committer.date - b.commit.committer.date;
        return new Date(a.commit.committer.date) > new Date(b.commit.committer.date);
      });
      console.log('repoCommits sorted: ', repoCommits);
      //plot graph
      plotGraph(repoCommits);
    }, 5000);
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
      commits.forEach(labelParents);
      plotGraph(commits);
    });
  }, 5000);
}

, false);
