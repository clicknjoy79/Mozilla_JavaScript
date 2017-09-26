function QueryableWorker(url, defaultListener, onError) {
    var instance = this;
    worker = new Worker(url);   // like private property
    listeners = {};             // like private property

    this.defaultListener = defaultListener || function f(value) {alert(value); };

    if (onError) { worker.onerror = onError ;}

    this.postMessage = function(message) {
        worker.postMessage(message);
    }

    this.terminate = function() {
        worker.terminate();
    }

    this.addListener = function(name, listener) {
        listeners[name] = listener;
    }

    this.removeListener = function(name) {
        delete listeners[name];
    }

    this.sendQuery = function() {
        if (arguments.length < 1) {
            throw new TypeError('QueryableWorker.sendQuery takes at least one argument');
            return;
        }
        worker.postMessage({
            'queryMethod': arguments[0],
            'queryMethodArguments': Array.prototype.slice.call(arguments, 1)
        });
    }

    worker.onmessage = function(event) {
        if (event.data instanceof Object &&
                event.data.hasOwnProperty('queryMethodListener') &&
                event.data.hasOwnProperty('queryMethodArguments')) {
            listeners[event.data.queryMethodListener].apply(instance, event.data.queryMethodArguments); // instance가 필요하지는 않음 (null, undefined 가능)
        } else {
            instance.defaultListener.call(instance, event.data);    // 이 함수 내부에서 this는 worker를 의미한다. Mozilla의 예제가 문제가 있어서 수정함(맨 앞의 this = > instance로 바꿈)
        }
    }
}

var myTask = new QueryableWorker('my_task.js');

myTask.addListener('printStuff', function(result) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode('The difference is ' + result + '!'));
    document.getElementById('firstLink').parentNode.appendChild(li);
});

myTask.addListener('doAlert', function(time, unit) {
    alert('Worker waited for ' + time + ' ' + unit + ' :-)');
});















































































