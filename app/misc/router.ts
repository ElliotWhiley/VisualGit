function switchToMainPanel() {
  hideAddRepositoryPanel();
  displayFilePanel();
  displayGraphPanel();
}

function switchToAddRepositoryPanel() {
  hideFilePanel();
  hideGraphPanel();
  displayAddRepositoryPanel();
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
}

function hideDiffPanel() {
  document.getElementById("diff-panel").style.width = "0";
  document.getElementById("graph-panel").style.width = "100%";
}
