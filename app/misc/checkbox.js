function setAllCheckboxes(sourceCheckbox) {
    var divElement = document.getElementById('file-panel');
    var inputElements = divElement.getElementsByTagName('input');
    for (i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type !== 'checkbox') {
            continue;
        }
        inputElements[i].checked = sourceCheckbox.checked;
    }
}
