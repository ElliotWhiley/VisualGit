var cred;
function switchToMainPanel() {
    console.log("lolololol");
    hideAuthenticatePanel();
    hideAddRepositoryPanel();
    displayFilePanel();
    displayGraphPanel();
}
function switchToAddRepositoryPanel() {
    hideAuthenticatePanel();
    hideFilePanel();
    hideGraphPanel();
    displayAddRepositoryPanel();
}
function displayMinimisePanel() {
    document.getElementById("diff-panel-minimise").style.visibility = "visible";
}
function hideMinimisePanel() {
    document.getElementById("diff-panel-minimise").style.visibility = "hidden";
}
function displayFilePanel() {
    document.getElementById("file-panel").style.zIndex = "10";
}
function displayGraphPanel() {
    document.getElementById("graph-panel").style.zIndex = "10";
}
function displayAddRepositoryPanel() {
    document.getElementById("add-repository-panel").style.zIndex = "10";
}
function hideFilePanel() {
    document.getElementById("file-panel").style.zIndex = "-10";
}
function hideGraphPanel() {
    document.getElementById("graph-panel").style.zIndex = "-10";
}
function hideAddRepositoryPanel() {
    document.getElementById("add-repository-panel").style.zIndex = "-10";
}
function displayDiffPanel() {
    document.getElementById("graph-panel").style.width = "50%";
    document.getElementById("diff-panel").style.width = "50%";
    displayMinimisePanel();
}
function hideDiffPanel() {
    document.getElementById("diff-panel").style.width = "0";
    document.getElementById("graph-panel").style.width = "100%";
    hideMinimisePanel();
}
function hideAuthenticatePanel() {
    document.getElementById("authenticate").style.zIndex = "-20";
}
function displayAuthenticatePanel() {
    document.getElementById("authenticate").style.zIndex = "20";
}
