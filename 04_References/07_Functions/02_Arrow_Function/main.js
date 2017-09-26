function Person() {
    // The Person() constructor defines `this` as an instance of itself.
    this.age = 0;

    setInterval(function growUp() {
        // In non-strict mode, the growUp() function defines `this`
        // as the global object, which is different from the `this`
        // defined by the Person() constructor.
        // 즉 자신만의 this를 정의한다.
        this.age++;     // window
    }, 1000);
}
var p = new Person();

// An arrow function does not create its own this
function Person1() {
    this.age = 0;

    setInterval(() => this.age++, 1000);    // this| properly refers to the person object
}
var p1 = new Person1();
setTimeout(() => console.log(p1.age), 3000);        // 3

// Invoked through call or apply.   this is ignored.
var adder = {
    base: 1,

    add: function(a) {
        var f = v => v + this.base;
        return f(a);
    },

    addThruCall: function(a) {
        var f = v => v + this.base;
        var b = {
            base: 2
        };

        return f.call(b, a);    // b는 무시된다.
    }
};

console.log(adder.add(1));         // This would log to 2
console.log(adder.addThruCall(1)); // This would log to 2 still

// No binding of arguments
var arguments = 42;
var arr = () => arguments;

console.log(arr());     // 42

function foo() {
    var f = (i) => arguments[0] + i;
    return f(2);
}
console.log(foo(1));     // 3

// In most cases, using rest parameters is a good alternative to using an arguments object.
function foo1() {
    var f = (...args) => args[0];
    return f(2);
}
console.log(foo1());        // 2


// Arrow functions used as methods
// 애로우 펑션을 메소드로 사용하지 말 것
'use strict'
var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function() {
        console.log(this.i, this)
    }
};
obj.b();        // undefined , Window Object
obj.c();        // 10, obj

var obj = {
    a: 10
};

Object.defineProperty(obj, 'b', {
    get: () => {
        console.log(this.a, typeof this.a, this);
        return this.a + 10;
    }
});
console.log(obj.b); // undefined, "undefined", Window
                    // NaN

// Use of the new operator
// Arrow functions cannot be used as constructors and will throw an error when used with new.
var Foo = () => {};
// var foo = new Foo();    // Uncaught TypeError: Foo is not a constructor

// Use of prototype property
// Arrow functions do not have a prototype property.
var Foo = () => {};
console.log(Foo.prototype); // undefined














































