// closure is the combination of a function and the lexical environment within which that function was declared.
// 클로저는 이벤트 사용이 빈번한 front-end web 개발에서 유용하게 쓸 수 있다.
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px';
    }
}
var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

// Emulating private method with closures(module pattern)
// 1개의 closure(lexical environment)가 생성되며 3개의 함수(increment, decrement, value)
// 에 의해 공유된다.
var counter = (function() {
    var privateCounter = 0;     // private value
    function changeBy(val) {    // private method
        privateCounter += val;
    }
    return {
        increment: function () {      // public method
            changeBy(1);
        },
        decrement: function () {      // public method
            changeBy(-1);
        },
        value: function () {          // public method
            return privateCounter;
        }
    };
})();

console.log(counter.value());       // 0
counter.increment();
counter.increment();
console.log(counter.value());       // 2
counter.decrement();
console.log(counter.value());       // 1


// Creating closures in loops: A common mistake
function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your email address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        // document.getElementById(item.id).onfocus = function() {
        //     showHelp(item.help);
        // }
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
    }
}
setupHelp();
// 이 문제의 해결책 들
// 1. 새로운 클로저를 이용할 것
function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    }
}
// 2. 전에 정리한 것 처럼 for 문 내에서 익명함 수를 호출 시켜서 내부에서 핸들러를 세팅하는 방법
// for (var i = 0; i < helpText.length; i++) {
//     (function() {        // 익명 함수가 실행될 때마다 새로운 클로저들이 생성된다.
//         var item = helpText[i];
//         document.getElementById(item.id).onfocus = function() {
//             showHelp(item.help);
//         }
//     })(); // Immediate event listener attachment with the current value of item (preserved until iteration).
// }

// 3. let item 으로 선언할 것
// let 으로 선언된 변수의 경우에는 inner function에서 참조할 때 해당 값을
// 복사해서 지역 변수로 선언한 것처럼 사용된다고 생각할 것.







































