var github = require("octonode");
var username;
var password;
var aid, atoken;
var client;
var avaterImg;
var repoList = {};
var url;
function signInHead(callback) {
    username = document.getElementById("Email1").value;
    password = document.getElementById("Password1").value;
    console.log(username + '      ' + password);
    getUserInfo(callback);
}
function signInPage(callback) {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    getUserInfo(callback);
}
function getUserInfo(callback) {
    cred = Git.Cred.userpassPlaintextNew(username, password);
    client = github.client({
        username: username,
        password: password
    });
    var ghme = client.me();
    ghme.info(function (err, data, head) {
        if (err) {
            displayModal(err);
        }
        else {
            avaterImg = Object.values(data)[2];
            var doc = document.getElementById("avatar");
            doc.innerHTML = 'Sign out';
            callback();
        }
    });
    ghme.repos(function (err, data, head) {
        if (err) {
            return;
        }
        else {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                var rep = Object.values(data)[i];
                console.log(rep['html_url']);
                displayBranch(rep['name'], "repo-dropdown", "selectRepo(this)");
                repoList[rep['name']] = rep['html_url'];
            }
        }
    });
}
function selectRepo(ele) {
    url = repoList[ele.innerHTML];
    var butt = document.getElementById("cloneButton");
    butt.innerHTML = 'Clone ' + ele.innerHTML;
    butt.setAttribute('class', 'btn btn-primary');
    console.log(url + 'JJJJJJJJ' + ele.innerHTML);
}
function cloneRepo() {
    if (url === null) {
        updateModalText("Ops! Error occors");
        return;
    }
    var splitText = url.split(/\.|:|\//);
    var local;
    if (splitText.length >= 2) {
        local = splitText[splitText.length - 2];
    }
    downloadFunc(url, local);
    url = null;
    $('#repo-modal').modal('hide');
}
