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

    showImages(e);
}

function showImages(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    var list = document.createElement('ul');
    dropbox.appendChild(list);

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileType = /^image\//;

        if (!fileType.test(file.type)) {
            continue;
        }

        var li = document.createElement("li");
        list.appendChild(li);

        var img = document.createElement('img');
        img.file = file;
        img.classList.add("obj");
        img.height = 60;
        li.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function(img) {
            return function (e) {
                img.src = e.target.result;
            };
        })(img);

        reader.readAsDataURL(file);     // 비동기적으로 실행된다.
    }
}


function sendFiles() {
    var imgs = document.querySelectorAll(".obj");

    for (var i = 0; i < imgs.length; i++) {
        fileUpload(imgs[i].file);
    }
}

function fileUpload(file) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("file", file);

    xhr.open("POST", "http://localhost/upload", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }

    xhr.upload.addEventListener('progress', function(e) {
        console.log("Upload process: " + Math.round((e.loaded * 100) / e.total) + "%");
    }, false);
    // xhr.onload = function() {
    //     console.log(xhr.responseText);
    // }
    xhr.send(formData);
}












