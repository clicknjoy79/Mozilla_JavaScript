var a, b, rest;
[a, b] = [10, 20];
console.log(a, b);  // 10  20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a, b);      // 10 20
console.log(rest);      // [30, 40, 50]

({a, b} = {a: 10, b: 20});
console.log(a, b);  // 10  20
console.log(typeof a);      // number

// Stage 3 proposal
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a, b);      // 10  20
console.log(rest);      // {c: 30, d: 40}
console.log(typeof rest);   // object

// The destructuring assignment uses similar syntax,
// but on the left-hand side of the assignment to define what values to unpack from the sourced variable.
var x = [1, 2, 3, 4, 5,];
var [y, z] = x;
console.log(y, z);      // 1  2



// Array destructuring
var foo = ['one', 'two', 'three'];

var [one, two, three] = foo;
console.log(one, two, three);   // one two three

// Assignment separate from declaration
var a, b;
[a, b] = [1, 2];
console.log(a, b);  // 1  2

// Default values
var a, b;
[a = 5, b = 7] = [1];
console.log(a, b);      // 1  7

// Swapping variables
var a = 1;
var b = 3;
[a, b] = [b, a];
console.log(a, b);      // 3  1

// Parsing an array returned from a function
function f1() {
    return [1, 2];
}
var a, b;
[a, b] = f1();
console.log(a, b);      // 1  2

// Ignoring some returned values
function f2() {
    return [1, 2, 3];
}
var [a, , b] = f2();
console.log(a, b);      // 1  3

// Assigning the rest of an array to a variable
var [a, ...b] = [1, 2, 3, 4, 5];
console.log(a);     // 1
console.log(b);     // [2, 3, 4, 5]

// Unpacking values from a regular expression match
var url = 'https://developer.mozilla.org/en-US/Web/JavaScript';

var parsedURL = /^(\w+):\/\/([^\/]+)\/(.*)$/.exec(url);
console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

var [, protocol, fullhost, fullpath] = parsedURL;
console.log(protocol, fullhost, fullpath);  // https  developer.mozilla.org  en-US/Web/JavaScript

// Object destructuring
var o = {p: 42, q: true};
var {p, q} = o;
console.log(p, q);  // 42  true

// Assignment without declaration
var a, b;
({a, b} = {a: 1, b: 2});
console.log(a, b);      // 1  2

// Assigning to new variable names
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;
console.log(foo, bar);      // 42  true

// Default values
var {a = 10, b = 5} = {a: 3};
console.log(a, b);      // 3   5

// Assigning to new variables names and providing default values
var {a:aa = 10, b:bb = 5} = {a: 3};
console.log(aa, bb);        // 3    5

// Setting a function parameter's default value
// ES5 version
function drawES5Chart(options) {
    options = options === undefined ? {} : options;
    var size = options.size === undefined ? 'big' : options.size;
    var cords = options.cords === undefined ? {x: 0, y: 0} : options.cords;
    var radius = options.radius === undefined ? 25 : options.radius;
    console.log(size, cords, radius);
    // now finally do some chart drawing
}

drawES5Chart({
    cords: {x: 18, y: 30},
    radius: 30
});     // big  {x: 18, y: 30}  30

// ES2015 version
// 함수의 매개변수로 사용되는 경우에는 반드시 값이 전달 되어야 한다.
// 따라서 디폴트 값으로 {} 이 전달되도록 하는게 안전하다.
function drawES2015Chart({size = 'big', cords = {x: 0, y: 0}, radius = 25} = {}) {
    console.log(size, cords, radius);
}

drawES2015Chart({
    cords: {x: 18, y: 30},
    radius: 30
});     // big  {x: 18, y: 30}  30


drawES2015Chart();  // big  {x: 0, y: 0}  25
// 함수 매개변수 뒤의 {} 제거하고 실행하면 아래와 같은 에러가 발생한다.
// Cannot destructure property `size` of 'undefined' or 'null'.
// 위의 문제를 해결하기 위해서는 {}를 디폴트로 세팅해야 한다.

// Nested object and array destructuring
var metadata = {
    title: 'Scratchpad',
    translations: [
        {
            locale: 'de',
            localization_tags: [],
            last_edit: '2014-04-14T08:43:37',
            url: '/de/docs/Tools/Scratchpad',
            title: 'JavaScript-Umgebung'
        }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
};

var {title: englishTitle, translations: [{title: localeTitle}]} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"

// For of iteration and destructuring
var people = [
    {
        name: 'Mike Smith',
        family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
        },
        age: 35
    },
    {
        name: 'Tom Jones',
        family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
        },
        age: 25
    }
];

for (var {name: n, family: {father: f}} of people) {
    console.log('Name: ' + n + ', Father: ' + f);
}   // "Name: Mike Smith, Father: Harry Smith
    // "Name: Tom Jones, Father: Richard Jones

// Unpacking fields from objects passed as function parameter
function userId({id}) {
    return id;
}

function whois({displayName, fullName: {firstName: name}}) {
    console.log(displayName + ' is ' + name);
}

var user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
        firstName: 'Jone',
        lastName: 'Doe'
    }
};

console.log('UserId: ' + userId(user));  // UserId: 42
whois(user);        // jdoe is Jone

// Computed object property names and destructuring
let key = 'z';
let {[key]: zoo} = {z: 'bar'};
console.log(zoo);       // bar

// Destructuring can be used with property names that are not valid JavaScript identifiers
// by providing an alternative identifer that is valid.
const foo1 = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo1;
console.log(fizzBuzz);      // true









































