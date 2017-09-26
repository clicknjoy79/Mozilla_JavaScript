// 파일 컨트롤은 input 태그나 drag and drop 으로 가능하다.
// 함수가 event handler로 사용되는 경우 함수 내의 this는 이벤트가 발생한 원조 엘리먼트가 아닌
// 현재 이벤트가 발생 중인 엘리먼트를 의미한다.(this === event.currentTarget)
// 이벤트 버블링의 경우 inner most 엘리먼트가 event.target이 된다.
// 나머지는 event.currentTarget이 된다.
function updateSize() {
    var nBytes = 0,
        oFiles = document.getElementById("uploadInput").files,
        nFiles = oFiles.length;

    for (var i = 0; i < nFiles; i++) {
        nBytes += oFiles[i].size;
    }

    var sOutput = nBytes + " bytes";
    for (var aMultiples = ["KB", "MB", "GB", "TB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
    }

    document.getElementById("fileNum").innerHTML = nFiles;
    document.getElementById("fileSize").innerHTML = sOutput;
}























































