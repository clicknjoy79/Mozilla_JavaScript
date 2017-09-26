/**
 * 어떤 객체가 Iterable 이 되기 위해서는
 * @@iterator 메서드를 구현해야 한다.
 * 즉 property로 [Symbol.iterator] 함수를 가지고 있어야 한다.
 * 이 함수는 실행시 iterator 를 반환하는데 iterator 객체는
 * next 메소드를 가지고 있다. next 메소드를 실행하면
 * { value: someValue, done: true || false} 객체를 반환 한다.
 * 여기서 value 값이 iteration 에서 반환되는 값이다.
 */

// The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array
var a = ['a', 'b', 'c'];
var iterator = a.entries();

console.log(iterator.next().value);     // [0, "a"]
console.log(iterator.next().value);     // [1, "b"]
console.log(iterator.next().value);     // [2, "c"]


var someArray = [1, 5, 7];
var someArrayEntries = someArray.entries();

console.log(someArrayEntries.toString());  // [object Array Iterator]
// Some iterators are in turn iterables:
console.log(someArrayEntries === someArrayEntries[Symbol.iterator]()); // true

// Examples using the iteration protocols
// A String is an example of a built-in iterable object:
var someString = 'hi';
console.log(typeof someString[Symbol.iterator]);       // function

// String's default iterator returns the string's code points one by one:
var iterator = someString[Symbol.iterator]();
console.log(iterator + '');         // [object String Iterator]

console.log(iterator.next());   // { value: 'h', done: false }
console.log(iterator.next());   // { value: 'i', done: false }
console.log(iterator.next());   // { value: undefined, done: true }

// Some built-in constructs, such as the spread operator,
// use the same iteration protocol under the hood:
console.log([...someString]);   // ["h", "i"]


// We can redefine the iteration behavior by supplying our own @@iterator:
var someString = new String('hi');  // need to construct a String object explicitly to avoid auto-boxing
someString[Symbol.iterator] = function() {
    return {
        next: function() {
            if (this._first) {
                this._first = false;
                return { value: 'bye', done: false };
            } else {
                return {done: true };
            }
        },
        _first: true
    };
}
console.log([...someString]);       // ['bye']
console.log(someString + '');       // hi

// Iterable Examples
// String, Array, TypedArray, Map, Set are all built-in iterables.

// User-defined iterables
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

console.log([...myIterable]);       // [1, 2, 3]

// gererator는 iterator이면서 iterable 이다.
var func = function* () {
    yield 1;
    yield 2;
    yield 3;
}
var gen = func();
console.log(gen === gen[Symbol.iterator]());        // true

// Built-in APIs accepting iterables(생성자 매개변수로 iterable를 받음)
// here are many APIs that accept iterables,
// for example: Map([iterable]), WeakMap([iterable]), Set([iterable]) and WeakSet([iterable]):
var myObj = {};
console.log(new Map([[1, 'a'], [2, 'b'], [3, 'c']]).get(2));     // b
console.log(new WeakMap([[{}, 'a'], [myObj, 'b'], [{}, 'c']]).get(myObj));  // b
console.log(new Set([1, 2, 3]).has(3));        // true
console.log(new Set('123').has('2'));   // true
console.log(new WeakSet(function* () {
    yield {};
    yield myObj;
    yield {};
}()).has(myObj));       // true

// Syntaxes expecting iterables
// for ... of, spread operator, yield*, destructuring assignment
for (let value of ['a', 'b', 'c']) {
    console.log(value);     // a  b  c
}

console.log([...'abc']);    // ["a", "b", "c"]

function* g() {
    yield* ['a', 'b', 'c'];
}
console.log(g().next());   // { value: 'a', done: false }

// Iterator Examples
// Simple iterator
function makeIterator(array) {
    var nextIndex = 0;

    return {
        next: function() {
            return nextIndex < array.length ?
                { value: array[nextIndex++], done: false } :
                { value: undefined, done: true};
        }
    };
}

var it = makeIterator(['yo', 'ya']);

console.log(it.next().value);   // yo
console.log(it.next().value);   // ya
console.log(it.next().done);    // true

// Infinite iterator
function idMaker() {
    var index = 0;

    return {
        next: function() {
            return { value: index++, done: false };
        }
    };
}

var it = idMaker();
console.log(it.next().value);   // 0
console.log(it.next().value);   // 1
console.log(it.next().value);   // 2
console.log(it.next().value);   // 3

// With a generator
function* makeSimpleGenerator(array) {
    var nextIndex = 0;

    while (nextIndex < array.length) {
        yield array[nextIndex++];
    }
}

var gen = makeSimpleGenerator(['yo', 'ya']);
console.log(gen.next());    // { value: "yo", done: false }
console.log(gen.next());    // { value: "ya", done: false }
console.log(gen.next());    // { value: undefined, done: true }

function* idMaker() {
    var index = 0;
    while (true) {
        yield index++;
    }
}
var gen = idMaker();
console.log(gen.next().value);        // 0
console.log(gen.next().value);        // 1
console.log(gen.next().value);        // 2

// With ECMAScript 6 class
class SimpleClass {
    constructor(data) {
        this.index = 0;
        this.data = data;
    }

    [Symbol.iterator]() {   // 메소드
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return { value: this.data[this.index++], done: false };
                } else {
                    this.index = 0;
                    return {value: undefined, done: true };
                }
            }
        };
    }
}

const simple = new SimpleClass([1, 2, 3, 4 , 5]);
for (const val of simple) {
    console.log(val);       // 1  2  3  4  5
}

// Is a generator object an iterator or an iterable?
// Answer: A generator object is both, iterator and iterable:

var aGeneratorObject = function* () {
    yield 1;
    yield 2;
    yield 3;
}();

console.log(typeof aGeneratorObject.next);      // function
// next 메소드를 가지고 있기 때문에 iterator 이다.

console.log(typeof aGeneratorObject[Symbol.iterator]);  // function
// Symbol.iterator method(= @@iterator method) 를 가지고 있기 때문에 iterable 이다.

console.log(aGeneratorObject === aGeneratorObject[Symbol.iterator]());  // true

console.log([...aGeneratorObject]);     // [1, 2 ,3]


















