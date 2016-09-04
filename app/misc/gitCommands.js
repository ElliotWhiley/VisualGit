function addCommand(command) {
    var gitCommand = document.createElement("p");
    gitCommand.className = "git-command";
    gitCommand.id = "git-command";
    gitCommand.innerHTML = command;
    var footer = document.getElementById("footer");
    footer.appendChild(gitCommand);
}
