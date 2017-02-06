let github = require("octonode");
let username;
let password;
let aid, atoken;
let client;
let avaterImg;
let repoList = {};
let url;

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
  ghme.info(function(err, data, head) {
    if (err) {
      displayModal(err);
    } else {
      avaterImg = Object.values(data)[2]
      // let doc = document.getElementById("avater");
      // doc.innerHTML = "";
      // var elem = document.createElement("img");
      // elem.width = 40;
      // elem.height = 40;
      // elem.src = avaterImg;
      // doc.appendChild(elem);
      // doc = document.getElementById("log");
      // doc.innerHTML = 'sign out';
      let doc = document.getElementById("avatar");
      doc.innerHTML = 'Sign out';
      callback();
    }
  });

  ghme.repos(function(err, data, head) {
    if (err) {
      return;
    } else {
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        let rep = Object.values(data)[i];
        console.log(rep['html_url']);
        displayBranch(rep['name'], "repo-dropdown", "selectRepo(this)");
        repoList[rep['name']] = rep['html_url'];
      }
    }
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

function selectRepo(ele) {
  url = repoList[ele.innerHTML];
  let butt = document.getElementById("cloneButton");
  butt.innerHTML = 'Clone ' + ele.innerHTML;
  butt.setAttribute('class', 'btn btn-primary');
  console.log(url + 'JJJJJJJJ' + ele.innerHTML);
}

function cloneRepo() {
  if (url === null) {
    updateModalText("Ops! Error occors");
    return;
  }
  let splitText = url.split(/\.|:|\//);
  let local;
  if (splitText.length >= 2) {
    local = splitText[splitText.length - 2];
  }
  downloadFunc(url, local);
  url = null;
  $('#repo-modal').modal('hide');
}
