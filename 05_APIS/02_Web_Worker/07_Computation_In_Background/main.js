var worker = new Worker('fibonacci.js');

function dump(value) { console.log(value); }

worker.onmessage = function(event) {
    document.getElementById('result').textContent = event.data;
    dump('Got: ' + event.data + '\n');
};

worker.onerror = function(error) {
    dump('Worker error: ' + error.message + '\n');
    throw error;
};

worker.postMessage('5');


