/**
 * Arrow Function 도입 이유
 * 1. 함수의 간결함
 * 2. this 의 혼란스러움 해소(모든 함수는 자신만의 this를 생성한다)
 *    그러나 Arrow Function은 자신만의 this를 생성하지 않는다.
 * 3. 생성자로 사용 불가능 ==> prototype 도 없다...
 * 4. Generator로 사용 불가능하다.(yield 사용 불가능)
 */
window.age = 0;
var interval;
function Person() {
    this.age = 0;

    interval = setInterval(function() {
        this.age++;         // 여기의 this는 Global Object를 의미한다. 혼란 가중.......
    }, 1000);
}

var person = new Person();

setTimeout(function() {
    console.log('real person age: ' + person.age);        // log 0 ....
}, 3000);

setTimeout(function() {
    console.log('window.age: ' + window.age);        // log 3 ....
}, 3000);

// 아래처럼 하면 해결되기는 하나 깔끔하지 않아.....
function Man() {
    var that = this;
    that.age = 0;

    setInterval(function growUp() {
        // The callback refers to the `that` variable of which
        // the value is the expected object.
        that.age++;
    }, 1000);
}
var man = new Man();

setTimeout(function() {
    console.log('man.age: ' + man.age);        // log 3 ....
}, 3000);

// Arrow Function 으로 간단히 해결
function Human() {
    this.age = 0;

    setInterval(() => {
        this.age++;    // 위의 this를 의미한다.
    }, 1000);
}

var human = new Human();
setTimeout(() => console.log('human.age: ' + human.age), 3000);

/****************************************************************************/

var adder = {
    base: 1,

    add: function(a) {
        var f = v => v + this.base; // 여기서 this는 function(a) { ....} 에서의 this와 동일 따라서 객체를 의미
        return f(a);
    },

    addThruCall: function(a) {
        var f = v => v + this.base;
        var b = {
            base: 2
        };

        return f.call(b, a);    // b 객체가 this로 bouding 되지 않는다.
    }
};

console.log(adder.add(1));         // This would log to 2
console.log(adder.addThruCall(1)); // This would log to 2 still

/****************************************************************************/

var arguments = 42;
var arr = () => arguments;

console.log(arr()); // 42

function foo() {
    var f = (i) => arguments[0] + i; // foo's implicit arguments binding. 자체적인 arguments를 생성X
    return f(2);
}

console.log(foo(1)); // 3

// 자체적인 arguments 가 없기 때문에 파라미터에 접근하기 위해서는 ...args(rest parameters)를 사용해야 한다.
function foo() {
    var f = (...args) => args[2];
    return f(1, 2, 3, 4);
}

console.log('args[2]: ' + foo()); // 3

/****************************************************************************/

var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function() {
        console.log(this.i, this);
    }
}
obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}

var object = {
    a: 10
};

Object.defineProperty(object, 'b', {
    get: () => {
        console.log(this.a, typeof this.a, this);   // undefined, "undefined", Window{.....}
        return this.a + 10; // represents global object 'Window', therefore 'this.a' returns 'undefined'  ==> NaN
    }
});

console.log(object.b);  // NaN

var Foo = () => {};
console.log(Foo.prototype); // undefined

var func = x => x * x;
// concise syntax, implied "return"

var func = (x, y) => { return x + y; };
// with block body, explicit "return" needed

var func = () => { foo: 1 };
// Calling func() returns undefined!    오브젝트 리터럴은 반환할 수 없다.

// var func = () => { foo: function() {} };
// SyntaxError: function statement requires a name   위와 동일..

var func = () => ({foo: 1});    // 오브젝트 리터럴을 반환하려면 괄호로 wrapping 해야 한다.

// Arrow Function parsing order
let callback;

callback = callback || function() {}; // ok

// callback = callback || () => {};
// SyntaxError: invalid arrow-function arguments

callback = callback || (() => {});    // ok. 함수로 쓰려면 wrapping 이 필요하다

// An empty arrow function returns undefined
let empty = () => {};
console.log(empty()); // undefined

console.log((() => 'foobar')());
// Returns "foobar"
// (this is an Immediately Invoked Function Expression
// see 'IIFE' in glossary)

var simple = a => a > 15 ? 15 : a;
console.log(simple(16)); // 15
console.log(simple(10)); // 10

let max = (a, b) => a > b ? a : b;
console.log('max: ' + max(5, 10));   // 10
// Easy array filtering, mapping, ...

var arr = [5, 6, 13, 0, 1, 18, 23];

var sum = arr.reduce((a, b) => a + b);
console.log('sum: ' + sum);
// 66

var even = arr.filter(v => v % 2 == 0);
console.log(even);
// [6, 0, 18]

var double = arr.map(v => v * 2);
console.log(double);
// [10, 12, 26, 0, 2, 36, 46]

// Parameterless arrow functions that are visually easier to parse
setTimeout( () => {
    console.log('I happen sooner');
    setTimeout( () => {
        // deeper code
        console.log('I happen later');
    }, 1);
}, 1);

/**
 * A function defined by a function expression inherits the current scope.
 * That is, the function forms a closure.
 * On the other hand, a function defined by a Function constructor
 * does not inherit any scope other than the global scope
 *
 * Function constructor 사용은 되도록 피할 것
 * ==> 생성자가 호출될 때마다 function string 을 parsing 하는 작업을 함
 *
 */

var func_a = function() {
    console.log('this function has closure!!!!');
}

var foo_a = (new Function("var bar = \'FOO!\';\nreturn(function() {\n\talert(bar);\n});"))();
foo_a(); // The segment "function() {\n\talert(bar);\n}" of the function body string is not re-parsed.

// 이름이 있는 익명 함수(fac)는 함수 내부에서 다시 쓰일 수 있다.
var factorial = function fac(n) { return n < 2 ? 1 : n * fac(n - 1); };

console.log(factorial(4));







































