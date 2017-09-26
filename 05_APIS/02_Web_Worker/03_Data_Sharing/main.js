var myWorker = new Worker("worker.js");

myWorker.onmessage = function(e) {
    console.log("Worker said: " + e.data);
};
myWorker.postMessage("ali");