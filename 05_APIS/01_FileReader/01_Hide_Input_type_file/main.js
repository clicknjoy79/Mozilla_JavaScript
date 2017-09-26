function handleFiles(files) {
}

var filesSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem");

filesSelect.addEventListener("click", function(e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault();     // prevent navigation to "#
}, false);