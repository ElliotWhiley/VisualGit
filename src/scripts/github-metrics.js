'use strict';
var GitHubApi = require('github');
var branchNames = [];
var repoBranches = [];
var commits;
var gitUser = 'Puhapig';
var gitRepo = 'test';
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
            repoBranches[index] = res;
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
                commits.forEach(labelParents);
                plotGraph(commits);
            });
        }, 5000);
    }
}, false);
