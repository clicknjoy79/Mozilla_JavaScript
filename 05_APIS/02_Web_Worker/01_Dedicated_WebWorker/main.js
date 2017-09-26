/**
 * 웹 워커는 오리진이 실행시키는 main 스크립트와 오리진에 동일해야 한다.
 * 동일 출처 정책이 적용된다. 위반시 에러 발생
 */

var first = document.querySelector("#number1");
var second = document.querySelector("#number2");

var result = document.querySelector(".result");

if (window.Worker) {    // Check if Browser supports the Worker api.
    // Requires script name as input
    var myWorker = new Worker("worker.js");

    first.onkeyup = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log("Message posted to worker");
    };

    second.onkeyup = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log("Message posted to worker");
    };

    myWorker.onmessage = function(e) {
        result.textContent = e.data;
        console.log("Message received from worker");
    }
}