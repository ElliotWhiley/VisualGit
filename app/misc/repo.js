var Git = require("nodegit");
var $ = require('jQuery');
var repoFullPath;
var repoLocalPath;
var bname = {};
var remoteName = {};
var localBranches = [];
var repoCurrentBranch = "master";
var modal;
var span;
function downloadRepository() {
    var cloneURL = document.getElementById("repoClone").value;
    var localPath = document.getElementById("repoSave").value;
    downloadFunc(cloneURL, localPath);
}
function downloadFunc(cloneURL, localPath) {
    var fullLocalPath = require("path").join(__dirname, localPath);
    var options = {};
    displayModal("Cloning Repository...");
    options = {
        fetchOpts: {
            callbacks: {
                certificateCheck: function () { return 1; },
                credentials: function () {
                    return cred;
                }
            }
        }
    };
    console.log("cloning into " + fullLocalPath);
    var repository = Git.Clone.clone(cloneURL, fullLocalPath, options)
        .then(function (repository) {
        console.log("Repo successfully cloned");
        updateModalText("Clone Successful, repository saved under: " + fullLocalPath);
        addCommand("git clone " + cloneURL + " " + localPath);
        repoFullPath = fullLocalPath;
        repoLocalPath = localPath;
        refreshAll(repository);
    }, function (err) {
        updateModalText("Clone Failed - " + err);
        console.log(err);
    });
}
function openRepository() {
    var localPath = document.getElementById("repoOpen").value;
    var fullLocalPath = require("path").join(__dirname, localPath);
    console.log("Trying to open repository at " + fullLocalPath);
    displayModal("Opening Local Repository...");
    Git.Repository.open(fullLocalPath).then(function (repository) {
        repoFullPath = fullLocalPath;
        repoLocalPath = localPath;
        refreshAll(repository);
        console.log("Repo successfully opened");
        updateModalText("Repository successfully opened");
    }, function (err) {
        updateModalText("Opening Failed - " + err);
        console.log(err);
    });
}
function refreshAll(repository) {
    var branch;
    bname = [];
    repository.getCurrentBranch()
        .then(function (reference) {
        var branchParts = reference.name().split("/");
        console.log(branchParts + "OOOOOOOOOOO");
        branch = branchParts[branchParts.length - 1];
    }, function (err) {
        console.log(err + "?????");
    })
        .then(function () {
        return repository.getReferences(Git.Reference.TYPE.LISTALL);
    })
        .then(function (branchList) {
        var count = 0;
        clearBranchElement();
        var _loop_1 = function (i) {
            console.log(branchList[i].name() + "!!!!");
            var bp = branchList[i].name().split("/");
            Git.Reference.nameToId(repository, branchList[i].name()).then(function (oid) {
                console.log(oid + "  TTTTTTTT");
                if (branchList[i].isRemote()) {
                    remoteName[bp[bp.length - 1]] = oid;
                }
                else {
                    console.log(bp[bp.length - 1] + "--------" + oid.tostrS());
                    if (oid.tostrS() in bname) {
                        bname[oid.tostrS()].push(branchList[i]);
                    }
                    else {
                        bname[oid.tostrS()] = [branchList[i]];
                    }
                }
            }, function (err) {
                console.log(err + "?????????");
            });
            if (branchList[i].isRemote()) {
                if (localBranches.indexOf(bp[bp.length - 1]) < 0) {
                    displayBranch(bp[bp.length - 1], "branch-dropdown", "checkoutRemoteBranch(this)");
                }
            }
            else {
                localBranches.push(bp[bp.length - 1]);
                displayBranch(bp[bp.length - 1], "branch-dropdown", "checkoutLocalBranch(this)");
            }
        };
        for (var i = 0; i < branchList.length; i++) {
            _loop_1(i);
        }
    })
        .then(function () {
        console.log("Updating the graph and the labels");
        drawGraph();
        document.getElementById("repo-name").innerHTML = repoLocalPath;
        document.getElementById("branch-name").innerHTML = branch + '<span class="caret"></span>';
    });
}
function getAllBranches() {
    var repos;
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        repos = repo;
        return repo.getReferenceNames(Git.Reference.TYPE.LISTALL);
    })
        .then(function (branchList) {
        clearBranchElement();
        for (var i = 0; i < branchList.length; i++) {
            console.log(branchList[i] + "!!!!");
            var bp = branchList[i].split("/");
            if (bp[1] !== "remotes") {
                displayBranch(bp[bp.length - 1], "branch-dropdown", "checkoutLocalBranch(this)");
            }
            Git.Reference.nameToId(repos, branchList[i]).then(function (oid) {
                console.log(oid + "  TTTTTTTT");
            });
        }
    });
}
function getOtherBranches() {
    var list;
    var repos;
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        repos = repo;
        return repo.getReferenceNames(Git.Reference.TYPE.LISTALL);
    })
        .then(function (branchList) {
        clearMergeElement();
        list = branchList;
    })
        .then(function () {
        return repos.getCurrentBranch();
    })
        .then(function (ref) {
        var name = ref.name().split("/");
        console.log("&&&&&&&");
        clearBranchElement();
        for (var i = 0; i < list.length; i++) {
            var bp = list[i].split("/");
            if (bp[1] !== "remotes" && bp[bp.length - 1] !== name[name.length - 1]) {
                displayBranch(bp[bp.length - 1], "merge-dropdown", "mergeLocalBranches(this)");
            }
        }
    });
}
function clearMergeElement() {
    var ul = document.getElementById("merge-dropdown");
    ul.innerHTML = '';
}
function clearBranchElement() {
    var ul = document.getElementById("branch-dropdown");
    var li = document.getElementById("create-branch");
    ul.innerHTML = '';
    ul.appendChild(li);
}
function displayBranch(name, id, onclick) {
    var ul = document.getElementById(id);
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("class", "list-group-item");
    a.setAttribute("onclick", onclick);
    li.setAttribute("role", "presentation");
    a.appendChild(document.createTextNode(name));
    li.appendChild(a);
    ul.appendChild(li);
}
function checkoutLocalBranch(element) {
    var bn = element.innerHTML;
    console.log(bn + ">>>>>>>>");
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        repo.checkoutBranch("refs/heads/" + bn)
            .then(function () {
            refreshAll(repo);
        }, function (err) {
            console.log(err + "<<<<<<<");
        });
    });
}
function checkoutRemoteBranch(element) {
    var bn = element.innerHTML;
    var repos;
    Git.Repository.open(repoFullPath)
        .then(function (repo) {
        repos = repo;
        var cid = remoteName[bn];
        return Git.Commit.lookup(repo, cid);
    })
        .then(function (commit) {
        return Git.Branch.create(repos, bn, commit, 0);
    })
        .then(function (branch) {
        return Git.Branch.setUpstream(branch, "refs/remote/origin/" + bn);
    })
        .then(function (code) {
        console.log(bn + "PPPPPPP");
        repos.mergeBranches(bn, "origin/" + bn)
            .then(function () {
            refreshAll(repos);
            console.log("Pull successful");
        });
    });
}
function updateLocalPath() {
    var text = document.getElementById("repoClone").value;
    var splitText = text.split(/\.|:|\//);
    if (splitText.length >= 2) {
        document.getElementById("repoSave").value = splitText[splitText.length - 2];
    }
}
function displayModal(text) {
    document.getElementById("modal-text-box").innerHTML = text;
    $('#modal').modal('show');
}
function updateModalText(text) {
    document.getElementById("modal-text-box").innerHTML = text;
    $('#modal').modal('show');
}
