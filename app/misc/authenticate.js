var github = require("octonode");
var username;
var password;
var aid, atoken;
var client;
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
            console.log(err);
        }
        console.log(Object.values(data)[2]);
    });
}
