/**
 * 변수를 선언했으나 값을 할당하지 않은 경우: undefined
 * 변수를 선언하지 않은 경우: ReferenceError
 */
var a;
console.log('The value of a is ' + a); // The value of a is undefined

console.log('The value of b is ' + b); // The value of b is undefined
var b;

// console.log('The value of c is ' + c); // Uncaught ReferenceError: c is not defined

let x;
console.log('The value of x is ' + x); // The value of x is undefined

// console.log('The value of y is ' + y); // Uncaught ReferenceError: y is not defined
let y;

/***********************************************************************************/

var input;
if (input === undefined) {
    console.log('input is undefined');
}

var myArr = [];
if(!myArr[0]) console.log('myArr[0] is undefined');  // undefined == false

var a;
console.log(a + 32); // NaN

var n = null
console.log(n * 32); // 0  --> null은 수식에서 0으로 취급된다.

/***********************************************************************************/

// Variable Hoisting
console.log(a === undefined); // true
var a = 3;


var myvar = 'my value';

(function() {
    console.log('myvar: ' + myvar); // undefined
    var myvar = 'local value';  // 함수의 최상단으로 Hoisting 된다.
})();

/* Function declaration */

foo(); // "bar"

function foo() {    // hoisted to top
    console.log('bar');
}


/* Function expression */

// baz(); // TypeError: baz is not a function

var baz = function() {
    console.log('bar2');
};

/***********************************************************************************/

const MY_OBJECT = {'key': 'value'};
MY_OBJECT.key = 'otherValue';   // 이건 가능하다.

console.log('37' - 7);  // 30
console.log('37' + 7 );     // "377"

/**
 * string 을 Number로 변경하는 방법
 * 1. parseInt(), parseFloat()
 * 2. 문자열 앞에 + 기호를 붙인다.
 */
console.log('1.1' + '1.1');     // '1.11.1'
console.log(+('1.1') + (+'1.1'));     //  2.2

console.log(0b111);     // 2진수 표현법

var sales = 'Toyota';

function carTypes(name) {
    if (name === 'Honda') {
        return name;
    } else {
        return "Sorry, we don't sell " + name + ".";
    }
}

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: sales };   // Object literal

console.log(car.myCar);   // Saturn
console.log(car.getCar);  // Honda
console.log(car.special); // Toyota

/**
 * Object의 property 가 식별자 규칙을 따른다면 .로 접근가능하지만 그렇지 않다면 [] 로만 접근가능
 */
var car = { manyCars: {a: 'Saab', 'b': 'Jeep'}, 7: 'Mazda' };

console.log(car.manyCars.b); // Jeep
// console.log(car.manyCars.'b');
console.log(car.manyCars['b'])  // Jeep
console.log(car.manyCars[b]);   // undefined
console.log(car[7]); // Mazda
// console.log(car.7); ==> 7이 정상적인 식별자가 아니므로 이렇게 쓰면 안됨...

var unusualPropertyNames = {
    '': 'An empty string',
    '!': 'Bang!'
}
// console.log(unusualPropertyNames.'');   // SyntaxError: Unexpected string
console.log(unusualPropertyNames['']);  // An empty string
// console.log(unusualPropertyNames.!);    // SyntaxError: Unexpected token !
console.log(unusualPropertyNames['!']); // Bang!

// ECMA 2015의 새로운 오브젝트 정의 방식
var theProtoObj = { name : 'Jone', age : 42 , toString : function () {
    console.log(this.name + '/' + this.age);
    return 'name is Jone and age is 42';
}};

var handler = function () {
    console.log('this is a handler');
}

var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
        // Super calls
        return 'd ' + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};
obj.handler();     // this is a handler
console.log(obj.toString());    // Jone/42   d name is Jone and age is 42
console.log(obj.prop_42);       // 42

// property 접근 방법
var foo = {a: 'alpha', 2: 'two'};
console.log(foo.a);    // alpha
console.log(foo['a']); // alpha
//console.log(foo[a]); // Error: a is not defined
console.log(foo['2']); // two
console.log(foo[2]);   // two
//console.log(foo.2);  // Error: missing ) after argument list

// RegExp Literal
var re = /ab+c/;

// "John's cat"으로 임시 string 객체를 만들고 메서드를 호출한 다음 임시객체를 discard(버린다.)
console.log("John's cat".length);

/**
 * String template `  `을 사용지원.(ECMA 2015)
 */
// Basic literal string creation
console.log(`In JavaScript '\n' is a line-feed.`);

// Multiline strings
console.log(`In JavaScript template strings can run
  over multiple lines, but double and single
    quoted strings cannot.`);

// String interpolation
var name = 'Bob', time = 'today';
console.log(`Hello ${name}, how are you ${time}?`);

var home = 'c:\\temp';
console.log(home);  // c:\temp  -->  파일 경로를 string 으로 만드는 경우에 사용

// line break 앞에 \ 사용하면 둘 다 무시된다. == > 문자열이 긴 경우에 사용
var str = 'this string \
is broken \
across multiple \
lines.';
console.log(str);   // this string is broken across multiplelines.

// String template 처럼 사용하기.....
var poem =
    'Roses are red,\n\
Violets are blue.\n\
    Sugar is sweet,\n\
and so is foo.';
console.log(poem);









