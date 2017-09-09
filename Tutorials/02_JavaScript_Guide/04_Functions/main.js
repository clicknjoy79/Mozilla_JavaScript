/**
 * Arrow Function 도입 이유
 * 1. 함수의 간결함
 * 2. this 의 혼란스러움 해소(모든 함수는 자신만의 this를 생성한다)
 *    그러나 Arrow Function은 자신만의 this를 생성하지 않는다.
 * 3. 생성자로 사용 불가능 ==> prototype 도 없다...
 * 4. Generator로 사용 불가능하다.(yield 사용 불가능)
 * Arrow functions do not have their own this value.
 * The value of this inside an arrow function is always inherited from the enclosing scope.
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
    var self = this;
    self.age = 0;

    setInterval(function growUp() {
        // The callback refers to the `that` variable of which
        // the value is the expected object.
        self.age++;
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

console.log(factorial(4));  // 24

/****************************************************************************/

function walkTree(node) {
    if (node == null) //
        return;
    // do something with node
    for (var i = 0; i < node.childNodes.length; i++) {
        walkTree(node.childNodes[i]);
    }
}

/****************************************************************************/
// 함수 내부에 선언된 함수는 클로저를 구성한다.
/**
 *Notice how x is preserved when inside is returned.
 * A closure must preserve the arguments and variables in all scopes it references.
 * Since each call provides potentially different arguments,
 * a new closure is created for each call to outside.
 * The memory can be freed only when the returned inside is no longer accessible.
 *
 * 내부 함수는 '선언 당시' 의 Context에 해당하는 변수들의 참조값들을 클로저에 저장한다.
 * x를 객체로 생각하고 x에 값이 전달되면 x는 주소값이므로 inside 클로저에 x의 주소값이 저장된다.
 * 외부 함수가 실행될 때마다 내부 함수에 각각의 클로저가 생성되는데 클로저에는 접근가능한 변수의
 * 주소값이 저장된다....(함수 내부에 property로 저장된다고 생각하면 될 듯)
 * 따라사 해당 함수가 사용가능하다면(외부로 함수가 리턴) 함수(클로저)에 저장된 변수에 접근할 수 있다.....
 */
function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}
fn_inside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5); // returns 8
console.log(result);

result1 = outside(3)(5); // returns 8
console.log(result1);

/****************************************************************************/

var pet = function(name) {   // The outer function defines a variable called "name"
    var getName = function() {
        return name;   // 외부 함수가 실행되면 내부 함수가 선언이 되는 데 이때 클로저를 구성한다.(그리고 내부에 name 참조 값을 저장한다.)
    }
    return getName;    // getName has closure and in the clousure there exists name reference
}
myPet = pet('Vivie');

console.log(myPet());                     // Returns "Vivie"

/****************************************************************************/

var createPet = function(name) {
    var sex;

    return {
        setName: function(newName) {
            name = newName;
        },

        getName: function() {
            return name;
        },

        getSex: function() {
            return sex;
        },

        setSex: function(newSex) {
            if(typeof newSex === 'string' && (newSex.toLowerCase() === 'male' || newSex.toLowerCase() === 'female')) {
                sex = newSex;
            }
        }
    }
}

// createPet 함수가 실행이 되면 return 구문의 내부 함수들이 선언되면서 각각 클로저가 구성된다.
// 각각의 클로저는 (name, sex reference를 공유한다)
var pet = createPet('Vivie');
pet.getName();                  // Vivie

pet.setName('Oliver');
pet.setSex('male');
console.log(pet.getSex());                   // male
console.log(pet.getName());                  // Oliver

/****************************************************************************/

var getCode = (function() {
    var secureCode = '0]Eal(eh&2';    // A code we do not want outsiders to be able to modify...

    return function() {     // 익명함수는 클로저를 구성(내부에 secureCode reference를 가지게 된다)
        return secureCode;
    };
}());

console.log(getCode());    // Returns the secureCode

/****************************************************************************/

// 외부 변수의 이름과 내부 변수의 이름이 같으면 안됨....주의할 것....
var createPet = function(name) {  // Outer function defines a variable called "name"
    return {
        setName: function(name) {    // Enclosed function also defines a variable called "name"
            name = name;               // ??? How do we access the "name" defined by the outer function ???
        }
    }
}

function myConcat(separator) {
    var result = '';

    var i;

    for (var i = 1; i < arguments.length; i++) {
        result += arguments[i] + separator;
    }
    return result;
}

console.log(myConcat(', ', 'red', 'orange', 'blue'));
console.log(myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah'));
console.log(myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley'));

/****************************************************************************/

function multiply(a, b) {
    b = typeof b !== 'undefined' ?  b : 1;  // 번거롭다....

    return a * b;
}
console.log(multiply(5)); // 5

// Default Parameters
function multiply(a, b = 1) {
    return a * b;
}

console.log(multiply(5)); // 5

// Rest Parameters
function multiply(multiplier, ...TheArgs) {
    return TheArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3, 4);
console.log(arr);























