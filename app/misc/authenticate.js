var github = require("octonode");
var username;
var password;
var aid, atoken;
var client;
var avaterImg;
function getUserInfo() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
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
        avaterImg = Object.values(data)[2];
        document.getElementById("avater").src = avaterImg;
    });
}
function getAvaImg(author) {
    var client = github.client();
    client.get('/users/pksunkara', {}, function (err, status, body, headers) {
        console.log(Object.values(body)[2]);
        return Object.values(body)[2];
    });
}
