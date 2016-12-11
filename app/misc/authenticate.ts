let github = require("octonode");
let username;
let password;
let aid, atoken;
let client;
let avaterImg;
function getUserInfo() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  cred = Git.Cred.userpassPlaintextNew(username, password);

  client = github.client({
    username: username,
    password: password
  });
  var ghme = client.me();
  ghme.info(function(err, data, head) {
    if (err) {
      displayModal(err);
    }
    avaterImg = Object.values(data)[2]
    document.getElementById("avater").src = avaterImg;
  });

  // let scopes = {
  //   'add_scopes': ['user', 'repo', 'gist'],
  //   'note': 'admin script'
  // };
  //
  // github.auth.config({
  //   username: username,
  //   password: password
  // }).login(scopes, function (err, id, token) {
  //   if (err !== null) {
  //     console.log("login fail -- " + err);
  //   }
  //   aid = id;
  //   atoken = token;
  //   console.log(id, token);
  // });
}

function getAvaImg(author) {
  let client = github.client();
  client.get('/users/pksunkara', {}, function (err, status, body, headers) {
    console.log(Object.values(body)[2]);
    return Object.values(body)[2]; //json object
  });
}
