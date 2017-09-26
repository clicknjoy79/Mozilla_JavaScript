var first = document.querySelector("#number1");
var second = document.querySelector("#number2");

var result1 = document.querySelector(".result1");

if (!!window.SharedWorker) {
    var myWorker = new SharedWorker("worker.js");

    first.onkeyup = function() {
        myWorker.port.postMessage([first.value, second.value]);
        console.log("Message posted to worker");
    };

    second.onkeyup = function() {
        myWorker.port.postMessage([first.value, second.value]);
        console.log("Message posted to worker");
    };

    myWorker.port.onmessage = function(e) {
        result1.textContent = e.data;
        console.log("Message received from worker");
    }




}