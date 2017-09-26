var dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}
function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileType = /^image\//;

        if (!fileType.test(file.type)) {
            continue;
        }

        var img = document.createElement('img');
        img.file = file;
        dropbox.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function(img) {
            return function (e) {
                img.src = e.target.result;
            };
        })(img);

        reader.readAsDataURL(file);     // 비동기적으로 실행된다.
    }
}

















