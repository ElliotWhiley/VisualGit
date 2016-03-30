'use strict';
function getFollowers() {
    var GitHubApi = require('github');
    var github = new GitHubApi({
        version: '3.0.0',
    });
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
