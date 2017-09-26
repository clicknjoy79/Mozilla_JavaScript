var queryableFunctions = {
    getDifference: function(nMinuend, nSubtrahend) {
        reply('printStuff', nMinuend - nSubtrahend);
    },
    waitSomeTime: function() {
        setTimeout(function() { reply('doAlert', 3, 'seconds');}, 3000);
    }
}

function defaultReply(message) {
    // your default PUBLIC function executed only when main page calls the queryableWorker.postMessage() method directly
    // do something
    postMessage(message);
}

function reply() {
    if (arguments.length < 1) { throw new TypeError('reply - not enough arguments'); return ;}
    postMessage({ 'queryMethodListener': arguments[0], 'queryMethodArguments': Array.prototype.slice.call(arguments, 1) });
}

onmessage = function(oEvent) {
    if (oEvent.data instanceof Object &&
            oEvent.data.hasOwnProperty('queryMethod') &&
            oEvent.data.hasOwnProperty('queryMethodArguments')) {
        queryableFunctions[oEvent.data.queryMethod].apply(self, oEvent.data.queryMethodArguments);  // self 는 Worker Thread의 GlobalScope(window 같은 것)을 의미한다.
    } else {
        defaultReply(oEvent.data);
    }
}
























