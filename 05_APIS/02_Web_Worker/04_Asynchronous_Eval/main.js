/**
 * 워커는 다른 스레드에서 실행되며 메인 스레드와 워커 스레드 각각 스택과 메세지 큐 모델이 적용된다.
 * 이벤트는 발생한 순서대로 큐에 들어가서 차례대로 실행되는 것이 원칙이나
 * 이벤트 디버깅시 브레이크 포인트를 걸면 해당 이벤트만 중단되고 뒤에 대기중인 이벤트들은
 * 차례대로 실행된다.
 */

var asyncEval = (function () {
    var aListeners = [], oParser = new Worker("worker.js");

    oParser.onmessage = function(oEvent) {
        if (aListeners[oEvent.data.id]) { aListeners[oEvent.data.id](oEvent.data.evaluated); }
        delete aListeners[oEvent.data.id];
    };

    return function(sCode, fListener) {
        aListeners.push(fListener || null);
        oParser.postMessage({
            'id': aListeners.length - 1,
            'code': sCode
        });
    };
})();

asyncEval('3 + 2', function(sMessage) {
    alert('3 + 2 = ' + sMessage);
});

asyncEval("\"Hello World!!!\"", function(sHTML) {
    document.body.appendChild(document.createTextNode(sHTML));
});

asyncEval("3", function(val) {
    document.body.appendChild(document.createTextNode(val));
})











































































