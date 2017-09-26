var input = document.getElementById("file"),
    fileSelect = document.getElementById("fileSelect"),
    pdf_viewer = document.getElementById("viewer"),
    videoSelect = document.getElementById("video_file"),
    video = document.getElementById("video");

pdf_viewer.addEventListener("load", function(e) {
    window.URL.revokeObjectURL(this.src);
}, false);

video.addEventListener("load", function(e) {
    window.URL.revokeObjectURL(this.src);
}, false);


fileSelect.addEventListener("click", function(e) {
    if (input) {
        input.click();
    }
    e.preventDefault();
}, false);

input.addEventListener("change", function() {
    var file = this.files[0];
    var pdf_url = window.URL.createObjectURL(file);
    pdf_viewer.setAttribute('src', pdf_url);
}, false);

videoSelect.addEventListener("change", function() {
    var file = this.files[0];
    var video_url = window.URL.createObjectURL(file);
    video.setAttribute("src", video_url);
    video.play();
}, false);



