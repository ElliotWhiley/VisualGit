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
    }, function (err, res) {
        console.log(JSON.stringify(res));
        document.getElementById('numFollowers').innerHTML = 'Number of followers: ' + res.length;
        document.getElementById('followers').innerHTML = 'Follower names: ';
        function displayFollower(follower, index, array) {
            document.getElementById('followers').innerHTML += follower.login + ', ';
        }
        res.forEach(displayFollower);
    });
}
document.addEventListener('DOMContentLoaded', function createLabelledCommits() {
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
        }, function (err, res) {
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
        github.repos.getBranches({
            user: gitUser,
            repo: gitRepo
        }, function (err, res) {
            res.forEach(setBranchName);
            branchNames.forEach(getBranchCommits);
        });
    }
    function getCommits() {
        setTimeout(function () {
            github.repos.getCommits({
                user: gitUser,
                repo: gitRepo
            }, function (err, res) {
                commits = res;
                commits.forEach(labelCommit);
                console.log(commits);
            });
        }, 5000);
    }
}, false);
