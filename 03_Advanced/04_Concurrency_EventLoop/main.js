// 이벤트 실행과 setTimeout은 메세지 큐에 넣는다.
(function() {       // 메세지가 실행됨

    console.log('this is the start');

    setTimeout(function cb() {      // 메세지 큐에 넣음, 현재 메세지(자바스크립트) 종료 후 실행
        console.log('this is a msg from call back');
    });

    console.log('this is just a message');

    setTimeout(function cb1() {     // 메세지 큐에 넣음
        console.log('this is a msg from call back1');
    }, 0);

    console.log('this is the end');

})();
console.log("after calling function...1");
console.log("after calling function...2");
setTimeout(function cb() {      // 메세지 큐에 넣음, 메세지 종료 후 실행
    console.log('this is a msg from call back2');
});
console.log("after calling function...3");
setTimeout(function cb() {      // 메세지 큐에 넣음, 메세지 종료 후 실행
    console.log('this is a msg from call back3');
});
console.log("after calling function...4");
console.log("after calling function...5");
// this is the start
// this is just a message
// this is the end
// after calling function...1
// after calling function...2
// after calling function...3
// after calling function...4
// after calling function...5
// this is a msg from call back
// this is a msg from call back1
// this is a msg from call back2
// this is a msg from call back3

// A web worker or a cross-origin iframe has its own stack, heap, and message queue.
// Two distinct runtimes can only communicate through sending messages via the postMessage method.
// This method adds a message to the other runtime if the latter listens to message events.




























