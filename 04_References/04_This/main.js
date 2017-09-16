// A function's this keyword is determined by how a function is called.
// it may be different each time the function is called
// ES5 introduced the bind method to set the value of a function's this regardless of how it's called
// ES2015 introduced arrow functions which do provide their own this binding
// (it remains the this value of the enclosing lexical context).
// In the global execution context (outside of any function), this refers to the global object, whether in strict mode or not.
// 함수 밖에서의 this는 strict mode에 상관없이 window 객체를 의미한다.

/**
 * Global Context
 */
console.log(this === window);   // true

a = 37;
console.log(this.a === 37);     // true

this.b = "MDN";
console.log(window.b);                 // MDN


/**
 * Function Context
 */
// Inside a function, the value of this depends on how the function is called.
// 함수 내에서의 this는 함수가 어떻게 호출되는 가에 달려있다. 호출될 때마다 this 가 다를 수 있음
function f1() {
    return this;
}
// In a browser:
console.assert(f1() === window);

// In Node
// f1() === global;

// In strict mode, however, the value of this remains
// at whatever it was set to when entering the execution context,
// so, in the following case, this will default to undefined:
function f2() {
    'use strict'
    return this;
}
console.assert(f2() === undefined);
// 그러나 몇 몇 브라우저는 window를 return 할 수도 있다. 'use strict'의 사용을 제한
// 익스에서 제대로 동작하는 것 같다....

// pass the value of this from one context to another, use call, or apply:
var obj = { a: 'Custom' };
var a = 'Global'; // This property is set on the global object

function whatsThis(arg) {
    return this.a;  // The value of this is dependent on how the function is called
}

console.log(whatsThis());           // Global
console.log(whatsThis.call(obj));   // Custom
console.log(whatsThis.apply(obj));  // Custom

function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };
console.log(add.call(o, 5, 7));     // 16
console.log(add.apply(o, [10, 20]));        // 34

// call과 apply 호출시 this 값으로 객체를 넘겨야 하나 객체를 넘기지 않고
// primitive value를 넘긴 경우(ex> 2, 'foo')에는 internal ToObject operation을
// 통해서 Object로 변환한다. ex> new Number(2), new String('foo') 정확하진 않은듯.....
function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7);        // [object Number]
bar.call('foo');    // [object String]

// The bind method(ECMAScript 5)
// f.bind(someObject)는 someObject를 this로 해서 함수를 만든다.
function f() {
    return this.a;
}
var g = f.bind({a: 'azerty'});
console.log(g());       // azerty

var h = g.bind({a: 'yoo'});     // bind only work once !!!
console.log(h());       // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.f(), o.g(), o.h());       // 37  azerty  azerty

// Arrow Functions
// In arrow functions, this retains the value of the enclosing lexical context's this.
// In global code, it will be set to the global object:
// 애로우 펑션에서 this는 애로우 펑션 선언 당시의 this 를 의미한다.
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject);  // true

// Array function 의 경우 call, apply, bind로 호출이 되면
// Arrow function 안의 this가 함수 선언시의 context 상의 this를 의미하는 지
// 아니면 call, apply, bind 인자로 넘겨진 this로 할 건지 충돌이 생기게 된다.
// 여기서 인자로 넘겨진 thisArg 무시되므로(정책상) first argument를 null, undefined로 세팅하는게 좋다.
// 다른 값을 넘겨도 어차피 무시됨....

// Call as a method of an object
var obj = { foo: foo };
console.log(obj.foo() === window);      // true

// No matter what, foo's this is set to what it was when it was created
// (in the example above, the global object).
// The same applies for arrow functions created inside other functions: their this remains that of the enclosing lexical context.
var obj = {
    bar: function() {   // method (here this means calling object)
        var x = (() => this);   // in arrow function this is permanently bound to the this of its enclosing function(calling object)
        return x;
    }
};
var fn = obj.bar();
console.log(fn() === obj);      // true

// But caution if you reference the method of obj without calling it
var fn2 = obj.bar;
console.log(fn2()() === window);      // true

















































