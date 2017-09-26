// for in loop 는 Array iteration에서는 사용하지 말 것
// 기본적으로 prototype에 있는 모든 enumerable property를 검색한다.
var arr = [1, 2, 3];
for (var key in arr) {
    console.log(key + ":" + arr[key]);
}

var obj = { a: 1, b: 2, c: 3 };
for (var prop in obj) {
    console.log(`obj.${prop} = ${obj[prop]}`);  // obj.a = 1
                                                // obj.b = 2
                                                // obj.c = 3
}

var triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
    this.color = 'red';
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
    console.log(`obj.${prop} = ${obj[prop]}`);  // obj.color = red
}                                               // obj.a = 1
                                                // obj.b = 2
                                                // obj.c = 3
for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
        console.log(`obj.${prop} = ${obj[prop]}`);  // obj.a = 1
    }                                               // obj.b = 2
}                                                   // obj.c = 3

// for... of statement
// Syntax: for (variable of iterable) { statement }
// iterable: Array, Map, Set, String, TypedArray, arguments ...

// Iterating over an Array
let iterable = [10, 20 , 30];

for (let value of iterable) {
    value += 1;
    console.log(value);     // 11
}                           // 21
                            // 31

// use const
for (const value of iterable) {
    console.log(value);     // 10
}                           // 20
                            // 30

// Iterating over a TypedArray
let iterable1 = new Uint8Array([0x00, 0xff]);

for (let value of iterable1) {
    console.log(value);      // 0
}                            // 255

// Iterating over a Map
let iterable2 = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (let entry of iterable2) {
    console.log(entry);     // ["a", 1]
}                           // ["b", 2]
                            // ["c", 3]

// Iterating over a Set
let iterable3 = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable3) {
    console.log(value);     // 1
}                           // 2
                            // 3

// Iterating over arguments object
(function() {
    for (let argument of arguments) {
        console.log(argument);
    }
})(1, 2, 3);
// 1
// 2
// 3

// Iterating over a 00_DOM collection

// Note: This will only work in platforms that have
// implemented NodeList.prototype[Symbol.iterator]
let articleParagraphs = document.querySelectorAll('article > p');

for (let paragraph of articleParagraphs) {
    paragraph.classList.add('read');
}

// Closing iterators
function* foo() {
    yield 1;
    yield 2;
    yield 3;
}

for (let o of foo()) {
    console.log(o);     // 1
    break;   // closes iterator, triggers return
}

// Iterating over generators
function* fibonacci() {     // a generator function
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fibonacci()) {
    console.log(n);
    if (n >= 1000) {
        break;
    }
}

// Do not reuse generators
var gen = (function* () {
    yield 1;
    yield 2;
    yield 3;
})();

for (let o of gen) {
    console.log(o);         // 1
    break;      // Closes iterator
}

for (let o of gen) {
    console.log(o);    // Never called.
}

// Iterating over other iterable objects
var iterable4 = {
    // 오브젝트가 iterable 이 되기 위해서는 Symbol.iterator를 정의되어 있어야 한다.
    // Symbol.iterator를 실행하면 generator가 반환된다.
    [Symbol.iterator]() {
        return {    // return generator
            i: 0,
            next() {
                if (this.i < 3) {
                    return { value: this.i++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

for (var value of iterable4) {  // iterable4 object의 Symbol.iterator를 실행해서 반환되는 generator로 next 작업을 한다.
    console.log(value); // 0  1  2
}

/**
 * for ... in 과 for ... of 의 차이점
 * The for...in statement iterates over the enumerable properties of an object, in original insertion order.
 * The for...of statement iterates over data that iterable object defines to be iterated over.
 */
// 차이를 설명하는 예
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable5 = [3, 5, 7];
iterable5.foo = 'hello';

for (let prop in iterable5) {
    console.log(prop);  // 0, 1, 2, foo, arrCustom, objCustom
}

for (let prop in iterable5) {
    if (iterable5.hasOwnProperty(prop)) {
        console.log(prop);      // 0, 1, 2, foo
    }
}

for (let prop of iterable5) {
    console.log(prop);      // 3  5  7
}

// try catch Example
/*
 * Creates a ZipCode object.
 *
 * Accepted formats for a zip code are:
 *      12345
 *      12345-6789
 *      123456789
 *      12345 6789
 *
 * If the argument passed to the ZipCode constructor does not
 * conform to one of these patterns, an exception is thrown.
 */
function ZipCode(zip) {
    zip = new String(zip);
    pattern = /[0-9]{5}([- ]?[0-9]{4})?/;
    if (pattern.test(zip)) {
        // zip code value will be the first match in the string
        this.value = zip.match(pattern)[0];
        this.valueOf = function () {
            return this.value;
        };
        this.toString = function () {
            return String(this.value);
        };
    } else {
        throw new ZipCodeFormatException(zip);
    }
}

function ZipCodeFormatException(value) {
    this.value = value;
    this.message = 'does not conform to the expected format for a zip code';
    this.toString = function () {
        return this.value + this.message;
    }
}

/*
 * This could be in a script that validates address data
 * for US addresses.
 */

const ZIPCODE_INVALID = -1;
const ZIPCODE_UNKOWN_ERROR = -2;

function verifyZipCode(z) {
    try {
        z = new ZipCode(z);
    } catch (e) {
        if (e instanceof ZipCodeFormatException) {
            return ZIPCODE_INVALID;
        } else {
            return ZIPCODE_UNKOWN_ERROR;
        }
    }
    return z;
}

a = verifyZipCode(95060);         // returns 95060
console.log(a.toString());

b = verifyZipCode(9560);          // returns -1
console.log(b);

c = verifyZipCode('a');           // returns -1
console.log(c);

d = verifyZipCode('95060');       // returns 95060
console.log(d.toString());

e = verifyZipCode('95060 1234');  // returns 95060 1234
console.log(e.toString());

















































