// Strict mode for functions
'use strict'
function strict() {
    // Function-level strict mode syntax
    'use strict';
    function nested() { return 'And so am I!'; }
    return "Hi!  I'm a strict mode function!  " + nested();
}
function notStrict() { return "I'm not strict."; }

// <<< Changes in strict mode >>>

// 1. Converting mistakes into errors
// strict mode makes it impossible to accidentally create global variables
// mistypeVariable = 17;        // mistypeVariable is not defined

// 2. strict mode makes assignments which would otherwise silently fail to throw an exception
// strict mode 를 사용하지 않으면 문제가 없는 것처럼 에러표시 없이 동작.
// 하지만 값이 할당 되지는 않는다.

// Assignment to a non-writable global
// var undefined = 5; // throws a TypeError
// var Infinity = 5; // throws a TypeError

// Assignment to a non-writable property
var obj1 = {};
Object.defineProperty(obj1, 'x', {value: 42, writable: false });
// obj1.x = 9;     // throws a TypeError

// Assignment to a getter-only property
var obj2 = { get x() { return 17; }};
// obj2.x = 5;

// Assignment to a new property on a non-extensible object
var fixed = {};
Object.preventExtensions(fixed);
// fixed.newProp = 'ohai';

// 3. strict mode makes attempts to delete undeletable properties throw
// (where before the attempt would simply have no effect):
// delete Object.prototype; // throws a TypeError

// 4. Duplicate property names are a syntax error in strict mode:
// 현재 동작함 버그인가?
var o = { p: 1, p: 2 };
console.log(o.p);       // 2

// 5. strict mode requires that function parameter names be unique.
// function sum(a, a, c) {
//     console.log(...arguments);
// }
// sum(1, 2, 3);       // 1, 2, 3 (non-strict mode)

// 6. strict mode in ECMAScript 5 forbids octal syntax.
// In ECMAScript 2015 Octal number is supported by prefixing a number with "0o".
var a = 0o10;
// var sum = 015 +     // !!! syntax error
//           197 +
//           142;
var sumWithOctal = 0o10 + 8;
console.log(sumWithOctal);   // 16

// 7. strict mode in ECMAScript 2015 forbids setting properties on primitive values
// false.true = '';         // TypeError
// (14).sailing = 'home';     // TypeError
// 'with'.you = 'far away'; // TypeError


// << Simplefying variable uses >>>
// compiler can better optimize strict mode code.
// eval: strict mode 에서는 내부에 변수 선언시 외부에 영향을 미치지 않는다.

var x = 17;
var evalX = eval("'use strict'; var x = 42; x; ");
console.assert(x === 17);
console.assert(evalX === 42);

function strict1(str) {
    'use strict';
    return eval(str); // str will be treated as strict mode code
}
function strict2(f, str) {
    'use strict';
    return f(str); // not eval(...): str is strict if and only
                   // if it invokes strict mode
}
function nonstrict(str) {
    return eval(str); // str is strict if and only
                      // if it invokes strict mode
}

strict1("'Strict mode code!'");
strict1("'use strict'; 'Strict mode code!'");   // 내부에 use strict 선언은 불필요
strict2(eval, "'Non-strict code.'");
strict2(eval, "'use strict'; 'Strict mode code!'");
nonstrict("'Non-strict code.'");
nonstrict("'use strict'; 'Strict mode code!'");

// strict mode forbids deleting plain names. delete name in strict mode is a syntax error:
// var x;
// delete x; // !!! syntax error

// eval("var y; delete y;"); // !!! syntax error

// the names eval and arguments can't be bound or assigned in language syntax
// eval = 17;
// arguments++;
// ++eval;
// var obj = { set p(arguments) { } };
// var eval;
// try { } catch (arguments) { }
// function x(eval) { }
// function arguments() { }
// var y = function eval() { };
// var f = new Function('arguments', "'use strict'; return 17;");

// strict mode code doesn't alias properties of arguments objects created within it
// In normal code within a function whose first argument is arg,
// setting arg also sets arguments[0], and vice versa
function f(a) {
    // 'use strict';   위에서 이미 선언해서 불필요...
    a = 42;
    return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);

// arguments.callee is no longer supported
// var f = function() { return arguments.callee; };
// console.log(f()); // throws a TypeError

// the value passed as this to a function in strict mode is not forced into being an object
// the specified this is not boxed into an object, and if unspecified, this will be undefined
function fun1() { return this; }
console.assert(fun1() === undefined);
console.assert(fun1.call(2) === 2);
console.assert(fun1.apply(null) === null);
console.assert(fun1.call(undefined) === undefined);
console.assert(fun1.bind(true)() === true);

// in strict mode, both fun.caller and fun.arguments are non-deletable properties which throw when set or retrieved:
// function restricted() {
//     'use strict';
//     restricted.caller;    // throws a TypeError
//     restricted.arguments; // throws a TypeError
// }
// function privilegedInvoker() {
//     return restricted();
// }
// privilegedInvoker();





























