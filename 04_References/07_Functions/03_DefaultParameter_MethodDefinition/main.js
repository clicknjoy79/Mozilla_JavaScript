function test(num = 1) {
    console.log(typeof num);
}
test();     // "number"
test(undefined);        // 'number': num is set to 1

// test with other falsy values:
test('');       // 'string' : num is set to ''
test(null);     // object : num is set to null

// Evaluated at call time
function append(value, array = []) {
    array.push(value);
    return array;
}

console.log(append(1));      // [1]
console.log(append(2));      // [2], not [1, 2]

function callSomething(thing = something()) {
    return thing;
}

function something() {
    return 'sth';
}

console.log(callSomething());       // sth


// Default parameters are available to later default parameters
function singularAutoPlural(singular, plural= singular + 's',
                            rallyingCry = plural + ' Attack!!!') {
    return [singular, plural, rallyingCry];
}

console.log(singularAutoPlural('Gecko'));   // ["Gecko", "Geckos", "Geckos Attack!!!"]
console.log(singularAutoPlural('Fox', 'Foxes'));    // ["Fox", "Foxes", "Foxes Attack!!!"]
console.log(singularAutoPlural('Deer', 'Deer', 'Deer peaceably and respectfully \
petition the government for positive change.'));
// ["Deer", "Deer", "Deer ... change."]

function go() {
    return ':P';
}

function withDefaults(a, b = 5, c = b, d = go(), e = this,
                      f = arguments, g = this.value) {
    return [a, b, c, d, e, f, g];
}
console.log(withDefaults.call({value: '=^_^='}));  // [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

function withoutDefault(a, b, c, d, e, f, g) {
    switch (arguments.length) {
        case 0:
            a;
        case 1:
            b = 5;
        case 2:
            c = b;
        case 3:
            d = go();
        case 4:
            e = this;
        case 5:
            f = arguments;
        case 6:
            g = this.value;
        default:
    }
    return [a, b, c, d, e, f, g];
}

console.log(withoutDefault.call({ value: '=^_^=' }));  // [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

function f(x = 1, y) {
    return [x, y];
}
console.log(f());       // [1, undefined]
console.log(f(2));      // [2, undefined]

// Destructured parameter with default value assignment
function f1([x, y] = [1, 2], {z: z} = {z: 3}) {
    return x + y + z;
}
console.log(f1());      // 6


/**
 * Method Definition
 */
// he shorthand syntax is similar to the getter and setter syntax introduced in ECMAScript 2015.
var obj = {
    foo: function() {
        /* code */
    },
    bar: function() {
        /* code */
    }
};
// You are now able to shorten this to: (ECMAScript 2015)
var obj = {
    foo() {
        /* code */
    },
    bar() {
        /* code */
    }
}

// Generator methods
// Using a named property
var obj2 = {
    g: function* () {
        var index = 0;
        while (true) {
            yield index++;
        }
    }
};
// The same object using shorthand syntax
var obj2 = {
    * g() {
        var index = 0;
        while (true) {
            yield index++;
        }
    }
};

var it = obj2.g();
console.log(it.next()); // { value: 0, done: false }
console.log(it.next()); // { value: 1, done: false }

// Async methods
var obj3 = {
    f: async function() {
        await some_promise;
    }
};

// The same object using shorthand syntax
var obj3 = {
    async function() {
        await some_promise;
    }
};

// Method definitions are not constructable
// All method definitions are not constructors and will throw a TypeError if you try to instantiate them.
var obj = {
    method() {}
};
// new obj.method();   // Uncaught TypeError: obj.method is not a constructor

// simpleTest
var obj = {
    a: 'foo',
    b() { return this.a; }
};
console.log(obj.b());   // foo

// Computed property names
var bar = {
    foo0: function () { return 0; },
    foo1() { return 1; },
    ['foo' + 2]() { return 2; }
};
console.log(bar.foo0());    // 0
console.log(bar.foo1());    // 1
console.log(bar.foo2());    // 2

// Difference between rest parameters and the arguments object
// rest parameters는 real Array이지만 arguments는 array-like object이다
// arguments는 특별한 property(callee) 가 존재한다.

// Rest Parameters를 사용하면 arguments(array-like)의 불편함을 해결할 수 있다.
// Before rest parameters, the following could be found:
function f(a, b) {
    var args = Array.prototype.slice.call(arguments, f.length);

    // ....
}

// to be equivalent of
function f1(a, b, ...args) {

}
// Destructuring rest parameters
function f2(...[a, b, c]) {
    return a + b + c;
}
console.log(f2(1));           // NaN
console.log(f2(1, 2, 3));     // 6
console.log(f2(1, 2, 3, 4));  // 6   (the fourth parameter is not destructured)

function multiply(multiplier, ...args) {
    return args.map((elm) => multiplier * elm );
}
var arr = multiply(2, 1, 2, 3);
console.log(arr);       // [2, 4, 6]

// example
function sortRestArgs(...theArgs) {
    var sortedArgs = theArgs.sort();
    return sortedArgs;
}

console.log(sortRestArgs(5, 3, 7, 1));

function sortArguments() {
    var sortedArgs = arguments.sort();
    return sortedArgs;  // // this will never happen
}

// throws a TypeError: arguments.sort is not a function
// console.log(sortArguments(5, 3, 7, 1));
















